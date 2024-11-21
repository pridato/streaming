import os
import redis
import logging
from typing import Optional

logger = logging.getLogger(__name__)


def get_redis_info() -> dict[str, str | int]:
    return {
        'host': os.getenv('REDIS_HOST') or '',
        'port': int(os.getenv('REDIS_PORT') or 0)
    }


class RedisClient:
    """ Funcionamiento de la clase RedisClient
    Obtienes el user_access_token requerido para hacer operaciones a través del broswer_id
    """

    def __init__(self):
        try:
            host, port = get_redis_info().values()
            self.redis_client = redis.Redis(
                host=str(host),
                port=int(port),
                db=0,
                decode_responses=True
            )

        except Exception as e:
            logger.error(f'Error importando configuración de redis: {e}')
            self.redis_client = None

    def get_user_token(self, browser_id: str) -> str | None:
        """
        Obtiene el token de usuario almacenado en Redis asociado a un ID de navegador.

        Args:
            browser_id (str): El identificador único del navegador del usuario.

        Returns:
            str | None: El token de usuario si existe y se puede recuperar correctamente,
                       None si hay algún error o el cliente Redis no está disponible.

        Raises:
            redis.RedisError: Si ocurre un error al acceder a Redis.
        """
        try:
            if not self.redis_client:
                return None
            user_access_token = self.redis_client.get(browser_id)
            return str(user_access_token)
        except redis.RedisError as e:
            logger.error(f"Error accessing Redis: {e}")
            return None

    def validate_tokens(self, browser_id: str, user_access_token: str) -> bool:
        """
        Valida que el token de acceso proporcionado coincida con el almacenado en Redis.

        Args:
            browser_id (str): El identificador único del navegador del usuario.
            user_access_token (str): El token de acceso a validar.

        Returns:
            bool: True si el token es válido y coincide con el almacenado,
                 False si hay algún error o los tokens no coinciden.

        Raises:
            redis.RedisError: Si ocurre un error al acceder a Redis.
        """
        try:
            if not self.redis_client:
                return False
            stored_token = self.get_user_token(browser_id)
            return stored_token == user_access_token
        except redis.RedisError as e:
            print(f"Error validating tokens: {e}")
            return False
