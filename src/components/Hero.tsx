import { motion } from 'framer-motion';
import { ArrowDown, Zap } from 'lucide-react';

const Hero = () => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent/30 z-10" />
      
      {/* Orange Glow Accents */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl z-0" />

      <div className="relative z-20 section-container text-center lg:text-left lg:max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="space-y-8"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Currently at Persistent Systems
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
            I own decisions{' '}
            <span className="relative inline-block">
              <span className="text-gradient-orange">when systems break.</span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-2 left-0 h-1 bg-primary rounded-full"
              />
            </span>
          </h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed"
          >
            Senior execution leader turning unclear, high-volume operational problems 
            into stable systems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
          >
            <a
              href="#decisions"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold transition-all duration-300 hover:shadow-orange hover:scale-105"
            >
              <Zap className="w-5 h-5" />
              View Decision Logs
            </a>
            <a
              href="#principles"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 glass-card-hover rounded-xl font-semibold text-foreground"
            >
              Operating Principles
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-6 pt-12 max-w-xl mx-auto lg:mx-0"
          >
            {[
              { value: '10+', label: 'Years Experience' },
              { value: '5', label: 'Key Roles' },
              { value: '37%', label: 'Productivity Gains' },
            ].map((stat, index) => (
              <div key={index} className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 1.2 },
            y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:bottom-16 p-3 rounded-full glass-card hover:bg-accent transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;