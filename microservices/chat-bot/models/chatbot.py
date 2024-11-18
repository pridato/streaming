from globals import KNOWLEDGE_BASE
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from sentence_transformers import SentenceTransformer
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import os
import logging

os.environ["TOKENIZERS_PARALLELISM"] = "false"

logger = logging.getLogger(__name__)


class Chatbot:
    def __init__(self):
        # Cargar modelo de clasificación de texto
        self.tokenizer = AutoTokenizer.from_pretrained(
            "PlanTL-GOB-ES/roberta-base-bne")
        self.model = AutoModelForSequenceClassification.from_pretrained(
            "PlanTL-GOB-ES/roberta-base-bne",
            num_labels=2
        )

        # Modelo para embeddings en español
        self.sentence_model = SentenceTransformer(
            'hiiamsid/sentence_similarity_spanish_es')
        logger.info('Modelo de embeddings cargado')

        # Base de conocimiento por temas
        self.knowledge_base = KNOWLEDGE_BASE
        # Precomputar embeddings de preguntas ejemplo
        self.precomputed_embeddings = self._compute_knowledge_embeddings()
        logger.info('Temas y embeddings precomputados')

    def _compute_knowledge_embeddings(self):
        """
        Precomputa los embeddings de las preguntas ejemplo para cada tema en la base de conocimiento.
        Vuelve vectores los datos precargados, los "prepara" para compararse

        Convierte las preguntas ejemplo en embeddings para cada tema. 
        Embeddings son vectores numéricos que representan las preguntas en un espacio vectorial.

        Returns:
            dict: Diccionario donde las claves son los temas y los valores son los embeddings 
                 de las preguntas ejemplo correspondientes a cada tema.
        """
        embeddings = {}
        for tema, data in self.knowledge_base.items():
            embeddings[tema] = self.sentence_model.encode(
                data["preguntas_ejemplo"])
            logger.debug(f'Embeddings computados para tema: {tema}')
        return embeddings

    def understand_message(self, message: str) -> dict:
        """
        Analiza un mensaje para determinar su tema y subtema más relevante.

        Utiliza embeddings y similitud coseno para encontrar el tema más similar
        entre los precomputados en la base de conocimiento.

        Args:
            message (str): El mensaje del usuario a analizar

        Returns:
            temas del mensaje por confianza
            dict: Diccionario con la siguiente estructura:
                {
                    "topic": str,           # Tema identificado 
                    "confidence": float,     # Nivel de confianza (0-1)
                    "subtopic_index": int,   # Índice del subtema más similar
                    "raw_message": str       # Mensaje original
                }
        """
        # Obtener embedding del mensaje actual, el vector representa el mensaje en un espacio vectorial
        message_embedding = self.sentence_model.encode([message])[0]

        # Encontrar el tema más similar
        best_topic = None
        best_similarity = -1
        best_subtopic = None

        for topic, embeddings in self.precomputed_embeddings.items():
            # Calcular la similitud coseno entre el mensaje y los embeddings de las preguntas ejemplo
            similarities = cosine_similarity(
                message_embedding.reshape(1, -1), embeddings)[0]

            # Encontrar el índice del subtema más similar (el tema más similar)
            max_similarity = np.max(similarities)

            # si max similarity tiene valor, actualizar el mejor tema y subtema
            if max_similarity > best_similarity:
                best_similarity = max_similarity
                best_topic = topic
                best_subtopic = np.argmax(similarities)
                logger.debug(
                    f'Nuevo mejor tema encontrado: {topic} con confianza: {max_similarity}')

        result = {
            "topic": best_topic,
            "confidence": float(best_similarity),
            "subtopic_index": int(best_subtopic if best_subtopic is not None else 0),
            "raw_message": message
        }
        logger.info(f'Análisis completado: {result}')
        return result

    def process_message(self, message: str) -> str:
        """
        Procesa un mensaje del usuario y genera una respuesta apropiada.

        Utiliza el método understand_message para analizar el mensaje y determinar
        el tema más relevante. Luego selecciona una respuesta apropiada de la base
        de conocimiento.

        Args:
            message (str): El mensaje del usuario a procesar

        Returns:
            str: La respuesta generada por el chatbot

        Notas:
            - Si el tema existe en la base de conocimiento, intenta retornar la respuesta
              general o la primera respuesta disponible
            - Si no encuentra el tema, retorna un mensaje indicando que no tiene información
        """
        logger.info(f'Procesando mensaje: {message}')

        # Analizar el mensaje para determinar el tema más relevante
        understanding = self.understand_message(message)

        # Si la confianza es menor a 0.6, retorna un mensaje pidiendo aclaración
        if understanding["confidence"] < 0.6:
            logger.warning(
                f'Confianza baja ({understanding["confidence"]}) para el mensaje: {message}')
            return "Lo siento, no estoy seguro de entender tu pregunta. ¿Podrías reformularla?"

        # Obtenemos el tema si existe
        topic = understanding["topic"]

        # Seleccionar la respuesta más apropiada
        if topic in self.knowledge_base:
            topic_data = self.knowledge_base[topic]

            # la respuesta específica basada en el subtopic_index
            if "general" in topic_data["respuestas"]:
                response = topic_data["respuestas"]["general"]
                return response

            # Fallback a la primera respuesta disponible
            response = list(topic_data["respuestas"].values())[0]
            logger.info(f'Respuesta fallback encontrada para tema: {topic}')
            return response

        logger.warning(f'No se encontró información para el tema: {topic}')
        return "No tengo información específica sobre ese tema."
