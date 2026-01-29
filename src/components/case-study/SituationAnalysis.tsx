import { motion } from 'framer-motion';

interface SituationAnalysisProps {
  situation: string[];
}

const SituationAnalysis = ({ situation }: SituationAnalysisProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Situation <span className="text-primary">Analysis</span>
      </h2>
      
      <ul className="space-y-3">
        {situation.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SituationAnalysis;
