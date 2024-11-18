import { useState } from "react";
import Plan from "./Plan";
const Pricing = () => {
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      name: "Plan Básico",
      price: "9.99",
      interval: "mes",
      features: ["Característica 1", "Característica 2", "Característica 3"],
      priceId: "price_basic_monthly_id", // ID de Stripe
    },
    {
      name: "Plan Premium",
      price: "19.99",
      interval: "mes",
      features: [
        "Todo del plan básico",
        "Característica 4",
        "Característica 5",
      ],
      priceId: "price_premium_monthly_id", // ID de Stripe
    },
  ];

  /**
   * Maneja el proceso de suscripción a un plan
   * @param {string} priceId - El ID del precio de Stripe para el plan seleccionado
   * @returns {Promise<void>}
   * @throws {Error} Si hay un error durante el proceso de suscripción
   * @description Este método maneja la lógica de suscripción cuando un usuario selecciona un plan.
   * Actualmente está vacío y necesita implementación.
   */
  const handleSubscription = async (priceId) => {
    try {
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4" id="precios">
      {/* Contenedor principal con padding vertical y horizontal */}
      <div className="max-w-7xl mx-auto">
        {/* Título de la sección de precios */}
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Planes de Suscripción
        </h2>

        {/* Grid de 2 columnas en pantallas medianas */}
        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <Plan
              key={plan.priceId}
              plan={plan}
              onSubscribe={handleSubscription}
              loading={loading}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
