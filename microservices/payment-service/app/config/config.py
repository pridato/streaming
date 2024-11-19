import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    """
    Clase de configuración base que contiene todas las variables de entorno necesarias
    para el funcionamiento del servicio de pagos.

    """
    SECRET_KEY = os.getenv('SECRET_KEY', 'tu-clave-secreta-default')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'tu-jwt-secret-default')

    # Configuración Stripe
    STRIPE_SECRET_KEY = os.getenv('STRIPE_SECRET_KEY')
    STRIPE_PUBLIC_KEY = os.getenv('STRIPE_PUBLIC_KEY')

    # Configuración PayPal
    PAYPAL_CLIENT_ID = os.getenv('PAYPAL_CLIENT_ID')
    PAYPAL_CLIENT_SECRET = os.getenv('PAYPAL_CLIENT_SECRET')
    PAYPAL_MODE = os.getenv('PAYPAL_MODE', 'sandbox')

    # URLs de PayPal
    PAYPAL_RETURN_URL = os.getenv('PAYPAL_RETURN_URL')
    PAYPAL_CANCEL_URL = os.getenv('PAYPAL_CANCEL_URL')


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
