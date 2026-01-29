import { motion } from 'framer-motion';

interface KeyTakeawayProps {
  takeaway: string;
}

const KeyTakeaway = ({ takeaway }: KeyTakeawayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-primary rounded-2xl p-8 text-primary-foreground"
    >
      <h2 className="text-xl font-bold mb-4">Key Takeaway</h2>
      <p className="text-lg italic opacity-90">{takeaway}</p>
    </motion.div>
  );
};

export default KeyTakeaway;
