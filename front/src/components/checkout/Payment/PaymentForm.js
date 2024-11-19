import { motion } from "framer-motion";
import { useState } from "react";

const PaymentForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Formateo específico para cada campo
    let formattedValue = value;
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
    } else if (name === "cardExpiry") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5);
    } else if (name === "cardCvc") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 rounded-lg p-6 border border-gray-700"
    >
      <h2 className="text-lg font-medium text-white mb-6">
        Información de Pago
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre del titular */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Nombre del titular
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg 
              text-white placeholder-gray-500 focus:outline-none focus:ring-2 
              focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="John Doe"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg 
              text-white placeholder-gray-500 focus:outline-none focus:ring-2 
              focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="john@example.com"
            required
          />
        </div>

        {/* Número de tarjeta */}
        <div>
          <label
            htmlFor="cardNumber"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Número de tarjeta
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg 
              text-white placeholder-gray-500 focus:outline-none focus:ring-2 
              focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="4242 4242 4242 4242"
            maxLength="19"
            required
          />
        </div>

        {/* Fecha y CVC */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="cardExpiry"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Fecha de expiración
            </label>
            <input
              type="text"
              id="cardExpiry"
              name="cardExpiry"
              value={formData.cardExpiry}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg 
                text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="MM/YY"
              maxLength="5"
              required
            />
          </div>
          <div>
            <label
              htmlFor="cardCvc"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              CVC
            </label>
            <input
              type="text"
              id="cardCvc"
              name="cardCvc"
              value={formData.cardCvc}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg 
                text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="123"
              maxLength="3"
              required
            />
          </div>
        </div>

        {/* Botón de pago */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 
            bg-purple-600 rounded-lg text-white font-medium
            hover:bg-purple-700 transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Procesando...
            </>
          ) : (
            "Pagar ahora"
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default PaymentForm;
