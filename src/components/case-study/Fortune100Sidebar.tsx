import { motion } from 'framer-motion';
import { Building2, CheckCircle2 } from 'lucide-react';

interface Fortune100SidebarProps {
  relevance: string;
  points: string[];
  patternText?: string;
}

const Fortune100Sidebar = ({ relevance, points, patternText }: Fortune100SidebarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="glass-card p-6 rounded-2xl h-fit"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Building2 className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">Fortune 100 Relevance</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">{relevance}</p>
      
      <ul className="space-y-3">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            {point}
          </li>
        ))}
      </ul>
      
      {patternText && (
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground italic">{patternText}</p>
        </div>
      )}
    </motion.div>
  );
};

export default Fortune100Sidebar;
