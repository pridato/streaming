import Hero from "../../components/Hero";
import Features from "../../components/Features";
import Stats from "../../components/Stats";
import CTA from "../../components/CTA";
import Header from "../../components/Header";
import Pricing from "../../components/Pricing";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />
      <Hero />
      <Features id="caracteristicas" />
      <Stats />
      <CTA />
      <Pricing />
    </div>
  );
};

export default Index;
