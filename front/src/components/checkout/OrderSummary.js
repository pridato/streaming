const OrderSummary = ({ plan }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-lg font-medium text-white mb-6">
        Resumen del Pedido
      </h2>

      <div className="space-y-4">
        {/* Detalles del plan */}
        <div className="flex justify-between">
          <span className="text-gray-400">Plan</span>
          <span className="text-white font-medium">
            {plan?.name || "Plan Premium"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Periodo</span>
          <span className="text-white">Mensual</span>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-700 my-4"></div>

        {/* Total */}
        <div className="flex justify-between text-lg">
          <span className="text-gray-400">Total</span>
          <span className="text-white font-bold">
            ${plan?.price || "19.99"}/mes
          </span>
        </div>

        {/* Información adicional */}
        <div className="mt-6 text-sm text-gray-400">
          <p>• Facturación mensual</p>
          <p>• Cancela en cualquier momento</p>
          <p>• 14 días de prueba gratis</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
