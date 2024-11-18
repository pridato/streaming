import { motion } from "framer-motion";
import ChatButton from "./buttons/chatButton";

const Hero = () => {
  return (
    <section className="flex items-center justify-center overflow-hidden px-6 pt-24 pb-20 h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-slate-900/0 to-transparent"></div>
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent text-5xl md:text-7xl font-bold tracking-tight"
          >
            Chatbots Inteligentes
            <span className="block text-white">para el Futuro</span>
          </motion.h1>
          <p className="mt-6 text-lg text-slate-400 max-w-3xl mx-auto">
            Potencia tu negocio con IA avanzada. Automatiza tu atención al
            cliente y escala tus operaciones con chatbots que entienden a tus
            usuarios.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <ChatButton />
            <button className="rounded-full px-6 py-3 border border-slate-700 text-slate-300 hover:border-slate-600 transition-colors">
              Ver Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
