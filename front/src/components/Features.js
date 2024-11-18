const featuresList = [
  {
    icon: "🤖",
    title: "IA Avanzada",
    description:
      "Procesamiento de lenguaje natural para conversaciones fluidas y naturales",
  },
  {
    icon: "⚡️",
    title: "Ultra Rápido",
    description: "Respuestas instantáneas y procesamiento en tiempo real",
  },
  {
    icon: "🎯",
    title: "Personalizable",
    description: "Adapta el chatbot a tu marca y necesidades específicas",
  },
];

const FeatureCard = ({ icon, title, description }) => (
  <button className="group relative rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-800/80 to-slate-900/80 p-8 hover:border-slate-700 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300">
    <div className="mb-5 text-4xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-400 transition-colors">
      {title}
    </h3>
    <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
      {description}
    </p>
  </button>
);

const Features = () => {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresList.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
