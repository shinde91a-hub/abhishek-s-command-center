import NetworkBackground from '@/components/NetworkBackground';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import OperatingPrinciples from '@/components/OperatingPrinciples';
import DecisionLogs from '@/components/DecisionLogs';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Interactive Network Background */}
      <NetworkBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <OperatingPrinciples />
        <DecisionLogs />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;