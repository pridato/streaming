const statsList = [
  { number: "99%", label: "Satisfacción" },
  { number: "24/7", label: "Disponibilidad" },
  { number: "+500", label: "Clientes Activos" },
];

const StatCard = ({ number, label }) => (
  <div className="p-8">
    <div className="text-4xl font-bold text-white mb-2">{number}</div>
    <div className="text-slate-400">{label}</div>
  </div>
);

const Stats = () => {
  return (
    <section className="py-20 px-6 bg-slate-900/50">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {statsList.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
