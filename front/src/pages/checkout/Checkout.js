import { useState } from "react";
import CheckoutSteps from "../../components/checkout/CheckoutSteps";
import CheckoutForm from "../../components/checkout/checkoutForm/CheckoutForm";
import CheckoutHeader from "../../components/checkout/CheckoutHeader";

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // creamos los setters que se pasan a childs para guardar los datos del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const [error, setError] = useState(null);

  const paymentFormData = {
    name,
    email,
    cardNumber,
    cardExpiry,
    cardCvc,
  };

  const handlePayment = () => {
    console.log(error);
    if (error) {
      console.log("Error en el pago" + JSON.stringify(paymentFormData));
      return;
    }
    console.log("Pago exitoso" + JSON.stringify(paymentFormData));
  };

  return (
    <div className="min-h-screen bg-slate-900 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <CheckoutHeader />
        <CheckoutSteps currentStep={currentStep} />
        <CheckoutForm
          error={error}
          setError={setError}
          setName={setName}
          setEmail={setEmail}
          setCardNumber={setCardNumber}
          setCardExpiry={setCardExpiry}
          setCardCvc={setCardCvc}
          setCurrentStep={setCurrentStep}
          onPayment={handlePayment}
        />
      </div>
    </div>
  );
};

export default Checkout;
