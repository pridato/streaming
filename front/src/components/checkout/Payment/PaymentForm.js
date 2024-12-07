import { motion } from "framer-motion";
import { validateEmail } from "../../../utils/validators";
import { useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";

const PaymentForm = ({ onSubmit, setName, setEmail, setError, error }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 rounded-lg p-6 border border-gray-700"
    >
      {/* Manejo de errores */}
      {error && (
        <div className="bg-red-600 text-white text-sm p-3 rounded-lg mb-4 flex items-center gap-3">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
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
            className="text-red-200 hover:text-red-100"
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
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

      <h2 className="text-xl font-semibold text-white mb-4">
        Información de Pago
      </h2>

      <form className="space-y-4" onSubmit={onSubmit}>
        {/* Nombre del titular */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Nombre del titular
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 bg-slate-900 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="John Doe"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
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
            className="w-full px-4 py-2 bg-slate-900 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="john@example.com"
            required
          />
        </div>

        {/* Card Element */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Datos de la tarjeta
          </label>
          <div className="p-2 bg-slate-900 border border-gray-600 rounded-md">
            <CardElement />
          </div>
        </div>

        {/* Botón de pago */}
        <button
          type="submit"
          className="w-full py-2 bg-purple-600 text-white rounded-md text-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Pagar ahora
        </button>
      </form>
    </motion.div>
  );
};

export default PaymentForm;
