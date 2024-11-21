import { motion } from "framer-motion";

const Plan = ({ plan, onSubscribe }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex flex-col bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden 
          hover:border-purple-500/30 transition-all duration-300
          shadow-lg shadow-purple-500/5 hover:shadow-purple-500/10"
    >
      {/* Cabecera del plan */}
      <div className="p-8 border-b border-gray-800">
        <h3 className="text-xl font-medium bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-2">
          {plan.name}
        </h3>
        <div className="flex items-baseline mb-4">
          <span className="text-4xl font-bold text-white">{plan.price} €</span>
          <span className="ml-2 text-gray-400">/{plan.interval} </span>
        </div>
        <p className="text-sm text-gray-400">
          Todo lo que necesitas para empezar
        </p>
      </div>

      {/* Características */}
      <div className="flex-1 p-8">
        <ul className="space-y-4">
          {plan.features.map((feature, index) => (
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="flex items-start"
            >
              <svg
                className="h-5 w-5 text-purple-400 mt-0.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="ml-3 text-gray-300">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Pie con botón */}
      <div className="p-8 border-t border-gray-800">
        <a
          onClick={() => {
            onSubscribe(plan);
            console.log("ea?");
          }}
          href="/checkout"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 
            bg-[#1a1a1a] border border-gray-800 rounded-lg text-gray-300
            hover:bg-[#222] hover:border-purple-500/30 
            transition-all duration-300"
        >
          <span>Suscribirse</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>

      {/* Indicador de plan más popular (opcional) */}
      {plan.popular && (
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <span className="px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
            Más Popular
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default Plan;
