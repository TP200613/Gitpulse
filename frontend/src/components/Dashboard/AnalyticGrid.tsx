import React from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { Flame, Zap, Calendar, Activity } from "lucide-react";

interface AnalyticsGridProps {
  data: {
    current_streak: number;
    longest_streak: number;
    most_active_day: string | null;
    active_days_last_90: number;
  };
}

export const AnalyticsGrid: React.FC<AnalyticsGridProps> = ({ data }) => {
  const containers = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
  };

  const metrics = [
    { icon: <Flame size={16} />, label: "CURRENT_BURST", value: `${data.current_streak} Days`, desc: "Continuous Execution Track", hex: "#f78166" },
    { icon: <Zap size={16} />, label: "ALL_TIME_APEX", value: `${data.longest_streak} Days`, desc: "Peak Continuous Milestone", hex: "#39d353" },
    { icon: <Calendar size={16} />, label: "HIGH_VOLUME_DAY", value: data.most_active_day ?? "UNMAPPED", desc: "Max Traffic Concentration", hex: "#d2a8ff" },
    { icon: <Activity size={16} />, label: "90D_VERIFICATION", value: `${data.active_days_last_90} Days`, desc: "Active Matrix Window", hex: "#58a6ff" }
  ];

  return (
    <motion.div 
      variants={containers} 
      initial="hidden" 
      animate="show" 
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {metrics.map((m, index) => (
        <motion.div variants={item} key={index}>
          <Card className="flex flex-col justify-between h-full p-5">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="flex h-8 w-8 items-center justify-center rounded-lg border"
                  style={{ backgroundColor: `${m.hex}08`, borderColor: `${m.hex}20`, color: m.hex }}
                >
                  {m.icon}
                </div>
                <span className="font-mono text-[10px] font-bold tracking-wider text-gray-500">{m.label}</span>
              </div>
              <div className="font-mono text-2xl font-black text-white tracking-tight">{m.value}</div>
            </div>
            <div className="mt-4 font-mono text-xs text-gray-400 border-t border-white/[0.03] pt-3">{m.desc}</div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};