import ChatButton from "../common/buttons/chatButton";

const CTA = () => {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="relative rounded-3xl bg-gradient-to-b from-indigo-500/20 to-slate-900/20 border border-slate-800 p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Comienza Hoy Mismo
          </h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Únete a cientos de empresas que ya están revolucionando su atención
            al cliente con nuestros chatbots inteligentes.
          </p>
          <ChatButton />
        </div>
      </div>
    </section>
  );
};

export default CTA;
