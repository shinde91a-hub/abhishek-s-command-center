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
    <section id="principles" className="relative py-24 lg:py-32">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Operating Principles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These principles guide my decisions in ambiguous, high-pressure environments 
            where structure is weak and outcomes still matter.
          </p>
        </motion.div>

        {/* Principles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            const isHovered = hoveredId === principle.id;

            return (
              <motion.div
                key={principle.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(principle.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative glass-card-hover p-6 rounded-2xl cursor-pointer overflow-hidden ${
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
                  className="absolute inset-0 bg-primary rounded-2xl"
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${
                    isHovered ? 'bg-primary text-primary-foreground' : 'bg-accent text-primary'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {principle.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>

                  {/* In Practice Tooltip */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      opacity: isHovered ? 1 : 0,
                      height: isHovered ? 'auto' : 0,
                      marginTop: isHovered ? 16 : 0 
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-border">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        In Practice
                      </span>
                      <p className="text-sm text-foreground mt-2 italic">
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
          className="mt-16 text-center glass-card p-8 rounded-2xl max-w-3xl mx-auto"
        >
          <p className="text-muted-foreground italic">
            "The through-line: Create clarity, build accountability, optimize flow—then add leverage."
          </p>
          <p className="text-foreground font-medium mt-2">
            The result: Systems that work, scale, and survive leadership transitions.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OperatingPrinciples;