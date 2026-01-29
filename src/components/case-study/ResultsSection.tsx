import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface ResultsSectionProps {
  operationalResults: string[];
  organizationalResults: string[];
}

const ResultsSection = ({ operationalResults, organizationalResults }: ResultsSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Results & <span className="text-primary">Impact</span>
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Operational Outcomes */}
        <div>
          <h3 className="font-semibold text-foreground mb-4">Operational Outcomes</h3>
          <ul className="space-y-3">
            {operationalResults.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <Trophy className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Organizational Outcomes */}
        <div>
          <h3 className="font-semibold text-foreground mb-4">Organizational Outcomes</h3>
          <ul className="space-y-3">
            {organizationalResults.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <Trophy className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsSection;
