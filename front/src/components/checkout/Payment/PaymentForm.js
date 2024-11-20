import { motion } from "framer-motion";
import {
  validateCardExpiry,
  validateCardNumber,
  validateCvc,
  validateEmail,
} from "../../../utils/validators";
import { useState } from "react";

const PaymentForm = ({
  onSubmit,
  onPayment,
  setName,
  setEmail,
  setCardNumber,
  setCardExpiry,
  setCardCvc,
  setError,
  error,
}) => {
  const [result, setResult] = useState(null);
  const inputClasses =
    "w-full px-2 py-1 bg-slate-900 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent";
  const labelClasses = "block text-xs font-medium text-gray-400 mb-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 rounded-lg p-3 border border-gray-700"
    >
      {/* Mensajes de error */}
      {error && (
        <div className="bg-slate-900 border border-red-500 text-red-400 text-sm p-4 rounded-lg mb-4 flex items-center gap-3">
          <svg
            className="w-5 h-5 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="flex-1">{error}</span>
          <button
            onClick={() => {
              setError(null);
            }}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
      {/* Título del formulario de pago */}
      <h2 className="text-sm font-medium text-white mb-3">
        Información de Pago
      </h2>

      <form onSubmit={onSubmit} className="space-y-2">
        {/* Campo para el nombre del titular de la tarjeta */}
        <div>
          <label htmlFor="name" className={labelClasses}>
            Nombre del titular
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            name="name"
            className={inputClasses}
            placeholder="John Doe"
            required
          />
        </div>

        {/* Campo para el email */}
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
              setError(validateEmail(e.target.value));
            }}
            type="email"
            id="email"
            name="email"
            className={inputClasses}
            placeholder="john@example.com"
            required
          />
        </div>

        {/* Campo para el número de tarjeta */}
        <div className="relative">
          <label htmlFor="cardNumber" className={labelClasses}>
            Número de tarjeta
          </label>
          <input
            onChange={(e) => {
              setResult(validateCardNumber(e.target.value));
              setCardNumber(e.target.value);
              if (typeof result === "string") {
                setError(result);
              } else {
                setError(null);
              }
            }}
            type="text"
            id="cardNumber"
            name="cardNumber"
            className={`${inputClasses} ${result?.icon ? "pr-10" : ""}`}
            placeholder="4242 4242 4242 4242"
            maxLength="19"
            required
          />
          {result?.icon && (
            <div className="absolute right-2 top-[24px] bg-white rounded shadow-sm border border-gray-200">
              <div className="w-8 h-5 flex items-center justify-center">
                {result.icon}
              </div>
            </div>
          )}
        </div>

        {/* Contenedor para fecha de expiración y CVC */}
        <div className="grid grid-cols-2 gap-2">
          {/* Campo para la fecha de expiración */}
          <div>
            <label htmlFor="cardExpiry" className={labelClasses}>
              Fecha de expiración
            </label>
            <input
              onChange={(e) => {
                setCardExpiry(e.target.value);
                setError(validateCardExpiry(e.target.value));
              }}
              type="text"
              id="cardExpiry"
              name="cardExpiry"
              className={inputClasses}
              placeholder="MM/YY"
              maxLength="5"
              required
            />
          </div>
          {/* Campo para el código CVC */}
          <div>
            <label htmlFor="cardCvc" className={labelClasses}>
              CVC
            </label>
            <input
              onChange={(e) => {
                setCardCvc(e.target.value);
                setError(validateCvc(e.target.value));
              }}
              type="text"
              id="cardCvc"
              name="cardCvc"
              className={inputClasses}
              placeholder="123"
              maxLength="3"
              required
            />
          </div>
        </div>

        {/* Botón de pago */}
        <button
          onClick={(e) => {
            onPayment(e);
            e.preventDefault();
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 mt-2 bg-purple-600 rounded-lg text-white text-sm font-medium hover:bg-purple-700 transition-colors duration-200"
        >
          Pagar ahora
        </button>
      </form>
    </motion.div>
  );
};

export default PaymentForm;
