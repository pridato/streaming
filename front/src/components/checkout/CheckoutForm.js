import PaymentForm from "./Payment/PaymentForm";
import OrderSummary from "./OrderSummary";

const CheckoutForm = ({ setCurrentStep }) => {
  return (
    <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12">
      {/* Formulario de pago */}
      <div className="lg:col-span-7">
        <PaymentForm
          onSuccess={() => {
            setCurrentStep(3);
          }}
        />
      </div>

      {/* Resumen del pedido */}
      <div className="lg:col-span-5 mt-10 lg:mt-0">
        <OrderSummary />
      </div>
    </div>
  );
};

export default CheckoutForm;
