import { motion } from 'framer-motion';
import type { ApproachItem } from '@/data/caseStudies';

interface StrategicApproachProps {
  approach: ApproachItem[];
}

const StrategicApproach = ({ approach }: StrategicApproachProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Strategic <span className="text-primary">Approach</span>
      </h2>
      
      <div className="space-y-4">
        {approach.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="border-l-4 border-primary/30 pl-4 py-2"
          >
            <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
            <div className="text-sm">
              <span className="text-primary font-medium">Impact:</span>{' '}
              <span className="text-muted-foreground">{item.impact}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StrategicApproach;
