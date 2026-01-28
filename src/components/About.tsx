import { motion } from 'framer-motion';
import { MapPin, Briefcase, Calendar, ExternalLink } from 'lucide-react';

const timeline = [
  { year: 'Feb 2025', role: 'Persistent Systems', description: 'Cybersecurity project lifecycle coordination, establishing ownership & frameworks' },
  { year: 'Feb 2020', role: 'ID Medical', description: 'Healthcare workforce operations for NHS clients, 99.8% compliance, 2 promotions in 1 year' },
  { year: 'Feb 2019', role: 'Fareportal', description: 'Travel technology platform operations' },
  { year: 'June 2018', role: 'Tech Mahindra', description: 'L2 escalations team, 1000+ calls, top performer' },
  { year: 'June 2014', role: 'IDeaS - A SAS Company', description: 'Technical Support to Product Engineer, 2 promotions in 2 years' },
];

const About = () => {
  return (
    <section id="about" className="relative py-6 lg:py-8">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - About Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div>
              <span className="text-primary font-semibold text-xs uppercase tracking-wider">
                About Me
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                Abhishek Shinde
              </h2>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed">
              Most situations arrive without clean data or obvious answers. I focus on 
              identifying what matters, making decisions that hold under pressure, and 
              owning the consequences. I operate comfortably in the gap between stakeholder 
              expectations and system reality.
            </p>

            <p className="text-sm text-muted-foreground leading-relaxed">
              My background spans <span className="text-foreground font-medium">cybersecurity operations</span>, 
              <span className="text-foreground font-medium"> technical infrastructure</span>, and 
              <span className="text-foreground font-medium"> revenue-critical systems</span> where 
              hesitation costs money.
            </p>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card text-xs">
                <MapPin className="w-3 h-3 text-primary" />
                <span className="text-muted-foreground">India</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card text-xs">
                <Briefcase className="w-3 h-3 text-primary" />
                <span className="text-muted-foreground">Persistent Systems</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card text-xs">
                <Calendar className="w-3 h-3 text-primary" />
                <span className="text-muted-foreground">10+ Years</span>
              </div>
            </div>

            {/* Core Competencies */}
            <div className="pt-3 space-y-2">
              <h4 className="font-semibold text-foreground text-sm">Core Competencies</h4>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Ownership in Ambiguous Environments',
                  'System Stabilization Under Pressure',
                  'Data-Driven Visibility & Accountability',
                  'High-Stakes Decision Making',
                  'Workflow Transformation',
                ].map((competency) => (
                  <span
                    key={competency}
                    className="px-2 py-0.5 rounded-md bg-accent text-accent-foreground text-xs"
                  >
                    {competency}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card p-5 rounded-xl">
              <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-3 h-3 text-primary" />
                </span>
                Professional Journey
              </h3>

              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-2.5 top-2 bottom-2 w-px bg-border" />

                <div className="space-y-3">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="relative pl-8"
                    >
                      {/* Dot */}
                      <div className={`absolute left-0 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        index === 0 
                          ? 'bg-primary border-primary' 
                          : 'bg-background border-border'
                      }`}>
                        {index === 0 && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                        )}
                      </div>

                      <div>
                        <span className="text-xs font-medium text-primary">{item.year}</span>
                        <h4 className="font-semibold text-foreground text-sm">{item.role}</h4>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;