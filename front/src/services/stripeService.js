import { STRIPE_URL } from "../globals/globals";

/**
 * Crea una intención de pago utilizando la API de Stripe
 * @param {number} amount - Cantidad a cobrar en centavos (ej: 1000 = 10€)
 * @returns {Promise<string>} Client secret necesario para completar el pago
 * @throws {Error} Si ocurre un error en la petición o la respuesta no es válida
 * @description
 * Esta función se comunica con el servidor de pagos para iniciar una nueva
 * transacción en Stripe. Envía la cantidad a cobrar y devuelve un client secret
 * que se utilizará para completar el pago de forma segura en el frontend.
 */
export const createPaymentIntent = async (amount) => {
  try {
    const response = await fetch(STRIPE_URL + "/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        currency: "eur",
      }),
    });

    if (!response.ok) {
      throw new Error("Error al crear el payment intent");
    }

    const data = await response.json();
    return data.clientSecret;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
