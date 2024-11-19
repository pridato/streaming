import Hero from "../../components/home/Hero";
import Features from "../../components/home/Features";
import Stats from "../../components/home/Stats";
import CTA from "../../components/home/CTA";
import Header from "../../components/layout/Header";
import Pricing from "../../components/home/Pricing";
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
