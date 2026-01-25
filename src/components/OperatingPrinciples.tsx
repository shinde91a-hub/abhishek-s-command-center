import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Eye, 
  BarChart3, 
  Shield, 
  Lightbulb, 
  GitBranch, 
  FileText, 
  Layers, 
  Users 
} from 'lucide-react';

const principles = [
  {
    id: 1,
    title: 'Reality Over Documentation',
    description: 'I trust what the system is doing, not what the process document says it should do.',
    inPractice: 'Before optimizing any process, I watch how work actually moves—not how it\'s supposed to move.',
    icon: Eye,
  },
  {
    id: 2,
    title: 'Evidence Beats Opinion',
    description: 'I don\'t optimize based on narratives. I look for proof in backlogs, missed emails, repeat escalations.',
    inPractice: 'I start with metrics that reveal patterns, not stories that justify positions.',
    icon: BarChart3,
  },
  {
    id: 3,
    title: 'Ownership Precedes Authority',
    description: 'When ownership is unclear, I take it. I don\'t wait for formal mandates to start tracking work.',
    inPractice: 'I act as the owner before being named the owner—responsibility creates legitimacy.',
    icon: Shield,
  },
  {
    id: 4,
    title: 'Visibility Creates Accountability',
    description: 'Before changing systems or people, I make work visible. What comes in, what goes out.',
    inPractice: 'I build lightweight tracking that makes status undeniable—transparency drives behavior change.',
    icon: Lightbulb,
  },
  {
    id: 5,
    title: 'Flow Before Performance Judgment',
    description: 'I fix bottlenecks, handoffs, prioritization, and waiting time before evaluating individuals.',
    inPractice: 'Bad systems hide good performers and expose weak ones unfairly—fix the system first.',
    icon: GitBranch,
  },
  {
    id: 6,
    title: 'Decisions Should Leave a Trail',
    description: 'I make decisions explicit. What was decided, why, with what information, and under what risk.',
    inPractice: 'I document the "why" behind decisions to prevent context loss and decision churn.',
    icon: FileText,
  },
  {
    id: 7,
    title: 'Stability Before Sophistication',
    description: 'I don\'t introduce automation or tooling into unstable systems. First the process has to hold.',
    inPractice: 'Fix the workflow before adding tools—technology amplifies existing patterns, good or bad.',
    icon: Layers,
  },
  {
    id: 8,
    title: 'Systems Should Survive the Operator',
    description: 'I don\'t build processes that rely on heroics. I aim to leave behind clear ownership.',
    inPractice: 'Sustainability beats short-term heroics—good systems outlast their creators.',
    icon: Users,
  },
];

const OperatingPrinciples = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="principles" className="relative py-12 lg:py-16">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Operating Principles
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Guiding decisions in ambiguous, high-pressure environments.
          </p>
        </motion.div>

        {/* Principles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            const isHovered = hoveredId === principle.id;

            return (
              <motion.div
                key={principle.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredId(principle.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative glass-card-hover p-4 rounded-xl cursor-pointer overflow-hidden ${
                  isHovered ? 'scale-[1.02] z-10' : ''
                }`}
              >
                {/* Orange Glow on Hover */}
                <motion.div
                  initial={false}
                  animate={{ 
                    opacity: isHovered ? 0.1 : 0,
                    scale: isHovered ? 1 : 0.8 
                  }}
                  className="absolute inset-0 bg-primary rounded-xl"
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-colors duration-300 ${
                    isHovered ? 'bg-primary text-primary-foreground' : 'bg-accent text-primary'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {principle.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>

                  {/* In Practice Tooltip */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      opacity: isHovered ? 1 : 0,
                      height: isHovered ? 'auto' : 0,
                      marginTop: isHovered ? 12 : 0 
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 border-t border-border">
                      <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                        In Practice
                      </span>
                      <p className="text-xs text-foreground mt-1 italic">
                        "{principle.inPractice}"
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Philosophy Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center glass-card p-5 rounded-xl max-w-2xl mx-auto"
        >
          <p className="text-sm text-muted-foreground italic">
            "Create clarity, build accountability, optimize flow—then add leverage."
          </p>
          <p className="text-sm text-foreground font-medium mt-1">
            Systems that work, scale, and survive leadership transitions.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OperatingPrinciples;