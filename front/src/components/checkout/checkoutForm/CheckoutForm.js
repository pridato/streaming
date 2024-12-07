import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useToast } from "@chakra-ui/react";
import { showToast } from "../../../services/toastService";

const CheckoutForm = ({
  name,
  setName,
  email,
  setEmail,
  amount,
  setError,
  error,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      // Crear PaymentMethod
      const { paymentMethod, error: stripeError } =
        await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
          billing_details: {
            name,
            email,
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        return;
      }

      // Enviar al backend
      const response = await fetch("/api/stripe/process-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          amount,
          email,
          name,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      // Confirmar el pago si es necesario
      if (result.client_secret) {
        const { error: confirmError } = await stripe.confirmCardPayment(
          result.client_secret
        );
        if (confirmError) {
          throw new Error(confirmError.message);
        }
      }

      showToast({
        title: "¡Éxito!",
        description: "Pago procesado correctamente",
        status: "success",
        duration: 5000,
        isClosable: true,
        toast,
      });
    } catch (error) {
      console.error(error);
      showToast({
        title: "Error",
        description: error.message || "Ocurrió un error al procesar el pago",
        status: "error",
        duration: 9000,
        isClosable: true,
        toast,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label>Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Datos de la tarjeta</label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded"
      >
        Pagar
      </button>
    </form>
  );
};

export default CheckoutForm;
