import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = "", onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={onClick ? { translateY: -2, scale: 1.005 } : { translateY: -1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`relative overflow-hidden rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(10,12,18,0.45)] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-[rgba(57,211,83,0.15)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
      {children}
    </motion.div>
  );
};