const CheckoutSteps = ({ currentStep }) => {
  const steps = [
    { id: 1, name: "Resumen" },
    { id: 2, name: "Pago" },
    { id: 3, name: "Confirmación" },
  ];

  return (
    <nav aria-label="Progress">
      <ol className="flex items-center justify-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={`relative ${
              stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : ""
            }`}
          >
            <div className="flex items-center">
              <div
                className={`${
                  currentStep >= step.id
                    ? "bg-purple-600 border-purple-600"
                    : "bg-slate-800 border-gray-700"
                } rounded-full transition-colors duration-200 h-8 w-8 border flex items-center justify-center`}
              >
                <span className="text-white text-sm">{step.id}</span>
              </div>
              {stepIdx !== steps.length - 1 && (
                <div
                  className={`${
                    currentStep > step.id
                      ? "border-purple-600"
                      : "border-gray-700"
                  } absolute top-4 h-0.5 w-full border-t transition-colors duration-200`}
                />
              )}
            </div>
            <span className="absolute -bottom-6 w-max text-sm text-gray-400">
              {step.name}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CheckoutSteps;
