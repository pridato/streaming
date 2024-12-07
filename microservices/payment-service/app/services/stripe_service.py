import stripe
from app.config.config import Config
import logging

logger = logging.getLogger(__name__)

stripe.api_key = Config.STRIPE_SECRET_KEY


def create_payment_intent(amount, currency="eur", payment_method_types=["card"]):
    """
    Crea una intención de pago en Stripe.

    Args:
        amount (int): Dinero a cobrar en centimos 
        currency (str, opcional): Código de moneda ISO (ej: "eur", "usd"). Por defecto "eur"
        payment_method_types (list, opcional): Lista de métodos de pago aceptados. Por defecto ["card"]

    Returns:
        PaymentIntent: Objeto PaymentIntent de Stripe con los detalles de la intención de pago

    Raises:
        stripe.error.StripeError: Si ocurre un error al crear la intención de pago
    """
    try:
        intent = stripe.PaymentIntent.create(
            amount=amount,  # El monto debe estar en centavos
            currency=currency,
            payment_method_types=payment_method_types,
        )
        return intent
    except stripe.StripeError as e:
        logger.error(f"Error creando PaymentIntent: {str(e)}")
        raise e


def create_payment_method(card_data):
    """
    Crea un método de pago en Stripe a partir de los detalles de una tarjeta.

    Args:
        card_data (dict): Diccionario con los detalles de la tarjeta
            - cardNumber (str): Número de la tarjeta
            - cardExpiry (str): Fecha de expiración en formato "MM/YY" 
            - cardCvc (str): Código de seguridad CVC

    Returns:
        PaymentMethod: Objeto PaymentMethod de Stripe con los detalles del método de pago

    Raises:
        stripe.error.StripeError: Si ocurre un error al crear el método de pago
    """
    try:
        # Formatear la fecha de expiración
        exp_month, exp_year = card_data["cardExpiry"].split('/')

        payment_method = stripe.PaymentMethod.create(
            type='card',
            card={
                'number': card_data["cardNumber"].replace(' ', ''),
                'exp_month': int(exp_month),
                'exp_year': int('20' + exp_year),  # Convertir '24' a '2024'
                'cvc': card_data["cardCvc"],
            }
        )
        return payment_method
    except stripe.StripeError as e:
        logger.error(f"Error creando PaymentMethod: {str(e)}")
        raise e


def confirm_payment(payment_intent_id, payment_method_id):
    """
    Confirma un pago usando la intención de pago y el método de pago.

    Args:
        payment_intent_id (str): ID de la intención de pago
        payment_method_id (str): ID del método de pago

    Returns:
        PaymentIntent: Objeto PaymentIntent actualizado

    Raises:
        stripe.StripeError: Si ocurre un error al confirmar el pago
    """
    try:
        intent = stripe.PaymentIntent.confirm(
            payment_intent_id,
            payment_method=payment_method_id
        )
        return intent
    except stripe.StripeError as e:
        logger.error(f"Error confirmando pago: {str(e)}")
        raise e
