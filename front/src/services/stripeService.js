import { STRIPE_URL } from "../globals/globals";
import axios from "axios";

/**
 * Procesa un pago con Stripe usando los datos de tarjeta proporcionados
 *
 * @param {Object} params - Parámetros del pago
 * @param {number} params.amount - Monto a cobrar en centavos
 * @param {string} params.cardNumber - Número de la tarjeta de crédito
 * @param {string} params.cardExpiry - Fecha de expiración en formato MM/YY
 * @param {string} params.cardCvc - Código de seguridad de la tarjeta
 * @returns {Promise} Promesa que resuelve con la respuesta del servidor de Stripe
 * @throws {Error} Si ocurre un error al procesar el pago
 */
export function process_payment({ amount, cardNumber, cardExpiry, cardCvc }) {
  return axios.post(STRIPE_URL + "stripe/process-payment", {
    amount: amount,
    cardNumber: cardNumber,
    cardExpiry: cardExpiry,
    cardCvc: cardCvc,
  });
}
