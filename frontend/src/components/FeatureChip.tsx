import { motion } from "framer-motion";

interface FeatureChipProps {
  text: string;
}

export default function FeatureChip({ text }: FeatureChipProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.05,
      }}
      transition={{
        duration: 0.2,
      }}
      className="px-5 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-lg text-slate-300 text-sm font-medium hover:border-green-400/40 hover:text-white cursor-default"
    >
      {text}
    </motion.div>
  );
}