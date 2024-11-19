const OrderSummary = ({ plan }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-gray-700">
      <h2 className="text-base font-medium text-white mb-4">
        Resumen del Pedido
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Plan</span>
          <span className="text-white font-medium">
            {plan?.name || "Plan Premium"}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Periodo</span>
          <span className="text-white">Mensual</span>
        </div>

        <div className="border-t border-gray-700 my-3"></div>

        <div className="flex justify-between">
          <span className="text-gray-400">Total</span>
          <span className="text-white font-bold">
            ${plan?.price || "19.99"}/mes
          </span>
        </div>

        <div className="mt-4 text-xs text-gray-400 space-y-1">
          <p>• Facturación mensual</p>
          <p>• Cancela en cualquier momento</p>
          <p>• 14 días de prueba gratis</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
