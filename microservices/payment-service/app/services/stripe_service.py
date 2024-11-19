import stripe
from app.config.config import Config

stripe.api_key = Config.STRIPE_SECRET_KEY


class StripeService:
    @staticmethod
    def create_payment_intent(amount, currency='eur'):
        """
        Crea una intención de pago en Stripe.

        Args:
            amount (float): Monto a cobrar en la moneda especificada
            currency (str, opcional): Código de moneda ISO (default: 'eur')

        Returns:
            PaymentIntent: Objeto PaymentIntent de Stripe con los detalles del pago

        Raises:
            Exception: Si ocurre un error al crear el pago en Stripe
        """
        try:
            payment_intent = stripe.PaymentIntent.create(
                amount=int(amount * 100),
                currency=currency
            )
            return payment_intent
        except Exception as e:
            raise Exception(f"Error creando el pago en Stripe: {str(e)}")

    @staticmethod
    def confirm_payment(payment_intent_id):
        """
        Confirma y recupera los detalles de una intención de pago en Stripe.

        Args:
            payment_intent_id (str): ID de la intención de pago a confirmar

        Returns:
            PaymentIntent: Objeto PaymentIntent de Stripe con los detalles del pago confirmado

        Raises:
            Exception: Si ocurre un error al confirmar el pago en Stripe
        """
        try:
            payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)
            return payment_intent
        except Exception as e:
            raise Exception(f"Error al confirmar el pago en Stripe: {str(e)}")
