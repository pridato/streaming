from flask_cors import CORS
from flask import Flask, request, jsonify
from models.chatbot import Chatbot
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
chatbot = Chatbot()

CORS(app)


@app.route('/chat', methods=['GET'])
def chat():
    """
    Procesa un mensaje del chat y retorna una respuesta.

    Args:
        request (Request): Objeto request de Flask con el mensaje en el parámetro 'prompt'

    Returns:
        Response: Respuesta JSON con el mensaje del chatbot

    Raises:
        400: Si el mensaje está vacío o falta en el request
        500: Si ocurre un error al procesar el mensaje
    """
    try:
        message = request.args.get('prompt')
        if not message:
            logger.warning('Intento de request sin prompt')
            raise ValueError('El parámetro "prompt" es requerido')

        response = chatbot.process_message(message)
        logger.info(f'Respuesta del chatbot: {response}')
        return jsonify({'response': response})

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
    except Exception as e:
        return jsonify({'error': f'Error al procesar el mensaje: {str(e)}'}), 500


if __name__ == '__main__':
    app.run(debug=True)
