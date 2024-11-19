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
    let formattedValue = value;

    switch (name) {
      case "cardNumber":
        formattedValue = value
          .replace(/\s/g, "")
          .replace(/(\d{4})/g, "$1 ")
          .trim();
        break;
      case "cardExpiry":
        formattedValue = value
          .replace(/\D/g, "")
          .replace(/(\d{2})(\d)/, "$1/$2")
          .slice(0, 5);
        break;
      case "cardCvc":
        formattedValue = value.replace(/\D/g, "").slice(0, 3);
        break;
      default:
        break;
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const inputClasses =
    "w-full px-2 py-1 bg-slate-900 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent";
  const labelClasses = "block text-xs font-medium text-gray-400 mb-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 rounded-lg p-3 border border-gray-700"
    >
      <h2 className="text-sm font-medium text-white mb-3">
        Información de Pago
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}
        className="space-y-2"
      >
        <div>
          <label htmlFor="name" className={labelClasses}>
            Nombre del titular
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClasses}
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
            placeholder="john@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="cardNumber" className={labelClasses}>
            Número de tarjeta
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className={inputClasses}
            placeholder="4242 4242 4242 4242"
            maxLength="19"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="cardExpiry" className={labelClasses}>
              Fecha de expiración
            </label>
            <input
              type="text"
              id="cardExpiry"
              name="cardExpiry"
              value={formData.cardExpiry}
              onChange={handleChange}
              className={inputClasses}
              placeholder="MM/YY"
              maxLength="5"
              required
            />
          </div>
          <div>
            <label htmlFor="cardCvc" className={labelClasses}>
              CVC
            </label>
            <input
              type="text"
              id="cardCvc"
              name="cardCvc"
              value={formData.cardCvc}
              onChange={handleChange}
              className={inputClasses}
              placeholder="123"
              maxLength="3"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 mt-2 bg-purple-600 rounded-lg text-white text-sm font-medium hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
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
