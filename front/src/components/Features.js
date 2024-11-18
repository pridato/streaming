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
  <div className="group relative rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-800/80 to-slate-900/80 p-8 hover:border-slate-700 transition-colors">
    <div className="mb-5 text-4xl">{icon}</div>
    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </div>
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
