import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutSteps from "../../components/checkout/CheckoutSteps";
import CheckoutForm from "../../components/checkout/checkoutForm/CheckoutForm";
import CheckoutHeader from "../../components/checkout/CheckoutHeader";
import { useCheckoutStore } from "../../context/checkoutStore";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const { cart } = useCheckoutStore();

  const amount = cart.reduce((acc, product) => acc + product.price, 0) * 100;

  return (
    <div className="min-h-screen bg-slate-900 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <CheckoutHeader />
        <CheckoutSteps currentStep={currentStep} />
        <Elements stripe={stripePromise}>
          <CheckoutForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            amount={amount}
            setError={setError}
            error={error}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;
