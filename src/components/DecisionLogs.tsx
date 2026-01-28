import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Zap, AlertTriangle, Award, Users } from 'lucide-react';

const decisionLogs = [
  {
    id: 1,
    phase: '01',
    title: 'Process Recovery & Ownership',
    company: 'ID Medical',
    year: '2020',
    summary: 'Proactively assumed ownership of a critical but ownerless approvals process following organizational downsizing. Independently audited historical work, implemented daily productivity tracking, and systematically cleared multi-month backlog while maintaining current workload.',
    impact: '37% productivity increase',
    icon: TrendingUp,
    slug: 'process-recovery',
  },
  {
    id: 2,
    phase: '02',
    title: 'Productivity Optimization',
    company: 'ID Medical',
    year: '2020-2021',
    summary: 'Identified that productivity bottlenecks stemmed from inefficient work patterns across legacy tools. Implemented behavioral solution by training team on parallel processing techniques and workflow shortcuts—increased throughput significantly without automation.',
    impact: '22 → 35+ requests/day',
    icon: Zap,
    slug: 'productivity-optimization',
  },
  {
    id: 3,
    phase: '03',
    title: 'Incident Response & Crisis Management',
    company: 'IDeaS - A SAS Company',
    year: '2014-2018',
    summary: 'Supported revenue-critical systems during high-stakes product migrations and major client incidents. Focused on incident documentation, cross-team coordination, and clear communication to prevent information loss. Developed disciplined approach prioritizing system stability.',
    impact: '2 promotions in 2 years',
    icon: AlertTriangle,
    slug: 'incident-response',
  },
  {
    id: 4,
    phase: '04',
    title: 'Operational Excellence & Career Re-entry',
    company: 'Tech Mahindra / Fareportal',
    year: '2018-2020',
    summary: 'Re-entered workforce through execution-focused roles following career gap. Treated training and operations with production-level rigor, prioritizing consistency and reliability. Achieved top performer status, establishing credibility foundation for ownership-driven roles.',
    impact: 'Top performer status',
    icon: Award,
    slug: 'operational-excellence',
  },
  {
    id: 5,
    phase: '05',
    title: 'Leadership Without Authority',
    company: 'ID Medical - Compliance Team',
    year: '2021-2022',
    summary: 'Assumed responsibility for legacy compliance team with month-long backlogs and low stakeholder confidence. Navigated initial resistance without formal authority by rebalancing workload, implementing transparent tracking, and establishing objective accountability through data.',
    impact: 'First team to clear backlog',
    icon: Users,
    slug: 'leadership-without-authority',
  },
];

const DecisionLogs = () => {
  return (
    <section id="decisions" className="relative py-6 lg:py-8 bg-gradient-to-b from-accent/30 to-background">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="text-primary font-semibold text-xs uppercase tracking-wider">
            Career Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-2">
            Decision Logs
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            High-impact decisions and the systems I built.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-3 lg:left-1/2 top-0 bottom-0 w-px bg-border lg:-translate-x-1/2" />

          <div className="space-y-6">
            {decisionLogs.map((log, index) => {
              const Icon = log.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`relative flex flex-col lg:flex-row gap-4 ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-3 lg:left-1/2 -translate-x-1/2 w-6 h-6 bg-background border-2 border-primary rounded-full z-10 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-primary">{log.phase}</span>
                  </div>

                  {/* Spacer for Desktop */}
                  <div className="hidden lg:block lg:w-1/2" />

                  {/* Card */}
                  <div className="ml-10 lg:ml-0 lg:w-1/2 lg:px-6">
                    <Link
                      to={`/case-study/${log.slug}`}
                      className="block group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="glass-card-hover p-4 lg:p-5 rounded-xl"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                                {log.title}
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                {log.company} • {log.year}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Summary */}
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed line-clamp-2">
                          {log.summary}
                        </p>

                        {/* Impact Badge */}
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                            <TrendingUp className="w-3 h-3" />
                            {log.impact}
                          </span>
                          <span className="inline-flex items-center gap-1 text-primary font-medium text-xs group-hover:gap-1.5 transition-all">
                            View Case Study
                            <ArrowRight className="w-3 h-3" />
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