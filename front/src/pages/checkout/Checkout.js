import { useState } from "react";
import CheckoutSteps from "../../components/checkout/CheckoutSteps";
import CheckoutForm from "../../components/checkout/checkoutForm/CheckoutForm";
import CheckoutHeader from "../../components/checkout/CheckoutHeader";

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen bg-slate-900 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <CheckoutHeader />
        <CheckoutSteps currentStep={currentStep} />
        <CheckoutForm setCurrentStep={setCurrentStep} />
      </div>
    </div>
  );
};

export default Checkout;
