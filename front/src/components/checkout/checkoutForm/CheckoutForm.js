import PaymentForm from "../Payment/PaymentForm";
import OrderSummary from "./OrderSummary";

const CheckoutForm = ({
  onSubmit,
  setName,
  setEmail,
  setCardNumber,
  setCardExpiry,
  setCardCvc,
  setError,
  error,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {/* Columna izquierda con el formulario de pago */}
      <div className="md:col-span-2">
        <div className="space-y-4">
          {/* Sección de métodos de pago */}
          <div className="bg-slate-800 rounded-lg p-3 border border-gray-700">
            <h2 className="text-sm font-medium text-white mb-3">
              Método de pago
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {/* Botón de pago con tarjeta */}
              <button className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-900 border border-purple-500 rounded-lg text-white text-sm hover:bg-slate-800 transition-colors">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M2.5 19h19A1.5 1.5 0 0023 17.5v-11A1.5 1.5 0 0021.5 5h-19A1.5 1.5 0 001 6.5v11A1.5 1.5 0 002.5 19zm1.5-11a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1zm5 0a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1z" />
                </svg>
                Tarjeta
              </button>
              {/* Botón de pago con PayPal */}
              <button className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white text-sm hover:bg-slate-800 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#00457C">
                  <path d="M20.1 6.8h-16c-1.1 0-2 .9-2 2v6.5c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8.8c0-1.1-.9-2-2-2zm-14 8.2c-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2 2.2 1 2.2 2.2-1 2.2-2.2 2.2zm12.5 0h-8.2v-1.5h8.2v1.5zm0-3h-8.2V10h8.2v2z" />
                </svg>
                PayPal
              </button>
            </div>
          </div>

          {/* Formulario de pago que avanza al paso 3 cuando es exitoso */}
          <PaymentForm
            onSubmit={onSubmit}
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
      {/* Columna derecha con el resumen de la orden */}
      <div>
        <OrderSummary />
      </div>
    </div>
  );
};

export default CheckoutForm;
