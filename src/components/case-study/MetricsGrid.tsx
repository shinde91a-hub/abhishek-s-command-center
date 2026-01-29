import { motion } from 'framer-motion';
import { Timer, Zap, TrendingUp, CheckCircle2, Shield, Users, FileText, Phone, Award, Target, TrendingDown } from 'lucide-react';
import type { MetricCard } from '@/data/caseStudies';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  timer: Timer,
  zap: Zap,
  'trending-up': TrendingUp,
  'trending-down': TrendingDown,
  'check-circle': CheckCircle2,
  shield: Shield,
  users: Users,
  'file-text': FileText,
  phone: Phone,
  award: Award,
  target: Target,
};

interface MetricsGridProps {
  metrics: MetricCard[];
}

const MetricsGrid = ({ metrics }: MetricsGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {metrics.map((metric, index) => {
        const IconComponent = iconMap[metric.icon] || CheckCircle2;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-4 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <IconComponent className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">{metric.label}</span>
            </div>
            <div className="text-xl font-bold text-foreground">{metric.value}</div>
            {metric.subtext && (
              <div className="text-xs text-muted-foreground">{metric.subtext}</div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default MetricsGrid;
