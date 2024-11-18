import Hero from "../../components/Hero";
import Features from "../../components/Features";
import Stats from "../../components/Stats";
import CTA from "../../components/CTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Hero />
      <Features />
      <Stats />
      <CTA />
    </div>
  );
};

export default Index;
