import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Zap, AlertTriangle, Award, Users } from 'lucide-react';

const decisionLogs = [
  {
    id: 1,
    phase: '01',
    title: 'Process Recovery',
    company: 'ID Medical',
    year: '2020',
    summary: 'Inherited a failing pilot approvals process with no documentation. Independently restructured operations, established performance visibility, and scaled into a single-owner model—eliminating backlogs without additional headcount.',
    impact: '37% productivity increase',
    icon: TrendingUp,
    slug: 'process-recovery',
  },
  {
    id: 2,
    phase: '02',
    title: 'Productivity Optimization',
    company: 'Behavioral Change Initiative',
    year: '2020-2021',
    summary: 'Identified silent productivity loss from sequential tool usage. Increased throughput 37% and reduced backlog time by 20-30% without automation—purely through habit conditioning and workflow redesign.',
    impact: '22 → 35+ requests/day',
    icon: Zap,
    slug: 'productivity-optimization',
  },
  {
    id: 3,
    phase: '03',
    title: 'Incident Response',
    company: 'IDeaS - A SAS Company',
    year: '2014-2018',
    summary: 'Supported high-stakes product migrations and incident response for client-critical systems. Advanced from entry-level to trusted escalation point through documentation, coordination, and calm execution under pressure.',
    impact: '2 promotions in 2 years',
    icon: AlertTriangle,
    slug: 'incident-response',
  },
  {
    id: 4,
    phase: '04',
    title: 'Operational Excellence',
    company: 'Tech Mahindra / Fareportal',
    year: '2018-2020',
    summary: 'Re-entered workforce post-gap through execution-focused roles. Prioritized consistent performance over title, using positions as deliberate stepping stones to rebuild market credibility.',
    impact: 'Top performer status',
    icon: Award,
    slug: 'operational-excellence',
  },
  {
    id: 5,
    phase: '05',
    title: 'Leadership Without Authority',
    company: 'Compliance Team Turnaround',
    year: '2021-2022',
    summary: 'Assumed responsibility for a legacy compliance team with month-long backlogs. Rebuilt delivery through capacity reallocation and visibility-driven accountability—earning de facto leadership through results.',
    impact: 'First team to clear backlog',
    icon: Users,
    slug: 'leadership-without-authority',
  },
];

const DecisionLogs = () => {
  return (
    <section id="decisions" className="relative py-24 lg:py-32 bg-gradient-to-b from-accent/30 to-background">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Career Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Decision Logs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A chronological record of high-impact decisions and the systems I built. 
            Each entry represents a chapter in operational transformation.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-border lg:-translate-x-1/2" />

          <div className="space-y-12">
            {decisionLogs.map((log, index) => {
              const Icon = log.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col lg:flex-row gap-8 ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-8 h-8 bg-background border-4 border-primary rounded-full z-10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{log.phase}</span>
                  </div>

                  {/* Spacer for Desktop */}
                  <div className="hidden lg:block lg:w-1/2" />

                  {/* Card */}
                  <div className="ml-12 lg:ml-0 lg:w-1/2 lg:px-8">
                    <Link
                      to={`/case-study/${log.slug}`}
                      className="block group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="glass-card-hover p-6 lg:p-8 rounded-2xl"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                {log.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {log.company} • {log.year}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Summary */}
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {log.summary}
                        </p>

                        {/* Impact Badge */}
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                            <TrendingUp className="w-4 h-4" />
                            {log.impact}
                          </span>
                          <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                            View Case Study
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DecisionLogs;