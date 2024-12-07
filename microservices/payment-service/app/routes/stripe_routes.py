from flask import Blueprint, jsonify, request
from app.services.stripe_service import create_payment_intent, create_payment_method, confirm_payment
from app.services.client_service import RedisClient
import logging

logger = logging.getLogger(__name__)

stripe_service = Blueprint('stripe_service', __name__)


@stripe_service.route('/stripe/process-payment', methods=['POST'])
def process_payment():
    """
    Procesa un pago con Stripe usando los datos de tarjeta proporcionados.

    Args:
        request (Request): Objeto request de Flask con los siguientes datos en el JSON:
            - amount (int): Monto a cobrar en centavos
            - cardNumber (str): Número de la tarjeta de crédito
            - cardExpiry (str): Fecha de expiración en formato MM/YY
            - cardCvc (str): Código de seguridad de la tarjeta

    Returns:
        Response: Respuesta JSON con:
            - paymentMethodId (str): ID del método de pago creado

    Raises:
        400: Si ocurre un error al procesar el pago o crear el método de pago
    """
    try:
        data = request.json
        logger.info(f"Procesando pago con datos: {data}")

        if not data or not data.get('cardNumber') or not data.get('cardExpiry') or not data.get('cardCvc'):
            logger.error("Datos de tarjeta incompletos")
            raise ValueError("Datos de tarjeta incompletos")

        # Validar el token de usuario
        # browser_id = data.get('browser_id')
        # user_access_token = RedisClient().get_user_token(browser_id)

        # Crear el método de pago
        payment_method = create_payment_method({
            "cardNumber": data["cardNumber"],
            "cardExpiry": data["cardExpiry"],
            "cardCvc": data["cardCvc"]
        })

        # Crear el PaymentIntent (asumimos un monto fijo por ahora)
        amount = data["amount"]  # 10.00 EUR en centavos
        payment_intent = create_payment_intent(amount)

        logger.info(f"PaymentIntent creado: {payment_intent}")

        payment_intent = confirm_payment(payment_intent.id, payment_method.id)
        logger.info(f"PaymentIntent confirmado: {payment_intent}")

        return jsonify({'paymentMethodId': payment_method.id}), 200

    except Exception as e:
        logger.error(f"Error procesando el pago: {str(e)}")
        return jsonify({'error': str(e)}), 400
