from flask import request, jsonify
from models.GPTModel import load_model
import logging

logger = logging.getLogger(__name__)

def init_routes(app):
    @app.route('/chat-bot', methods=['GET'])
    def chat_bot():
        # Obtener el parámetro 'prompt' de la URL
        prompt = request.args.get('prompt')
        logger.info("Solicitud recibida con el parámetro 'prompt': %s", prompt)


        if not prompt:
            logger.error("Error, falta el parámetro 'prompt'.")
            return jsonify({"error": "El parámetro 'prompt' es necesario"}), 400

        # Generar la respuesta con Hugging Face
        response = load_model(prompt)

        return jsonify({"response": response})