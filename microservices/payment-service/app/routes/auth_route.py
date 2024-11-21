from flask import Blueprint, jsonify, request
from services.client_service import RedisClient
import logging

logger = logging.getLogger(__name__)
paypal_routes = Blueprint('auth_routes', __name__, url_prefix='/auth')


@paypal_routes.route('/get_user_access_token', methods=['GET'])
def get_user_access_token():
    # leemos el atributo browser_id del request
    try:
        browser_id = str(request.args.get('browser_id'))
        user_access_token = RedisClient().get_user_token(browser_id)
        logger.info(
            f'User access token for browser_id {browser_id}: {user_access_token}')
        return jsonify({'user_access_token': user_access_token})
    except Exception as e:
        logger.error(f'Error al obtener el token de usuario: {e}')
        return jsonify({'error': str(e)}), 500
