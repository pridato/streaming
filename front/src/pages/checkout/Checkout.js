import { useState } from "react";
import CheckoutSteps from "../../components/checkout/CheckoutSteps";
import CheckoutForm from "../../components/checkout/checkoutForm/CheckoutForm";
import CheckoutHeader from "../../components/checkout/CheckoutHeader";
import { showToast } from "../../services/toastService";
import { useToast } from "@chakra-ui/react";
import { getUserAccessToken } from "../../services/oauthService";

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // creamos los setters que se pasan a childs para guardar los datos del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const [error, setError] = useState(null);

  const toast = useToast();

  const paymentFormData = {
    name,
    email,
    cardNumber,
    cardExpiry,
    cardCvc,
  };

  const handlePayment = async (e) => {
    console.log(paymentFormData);
    if (error) {
      return;
    }
    e.preventDefault();

    try {
      // await createPaymentIntent();
      const user_access_token = await getUserAccessToken();
      console.log(user_access_token);
    } catch (error) {
      console.log(error);
      showToast({
        title: "Error",
        description: "Ocurrió un error al procesar el pago",
        status: "error",
        duration: 9000,
        isClosable: true,
        toast,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <CheckoutHeader />
        <CheckoutSteps currentStep={currentStep} />
        <CheckoutForm
          onSubmit={handlePayment}
          setName={setName}
          setEmail={setEmail}
          setCardNumber={setCardNumber}
          setCardExpiry={setCardExpiry}
          setCardCvc={setCardCvc}
          setError={setError}
          error={error}
        />
      </div>
    </div>
  );
};

export default Checkout;
