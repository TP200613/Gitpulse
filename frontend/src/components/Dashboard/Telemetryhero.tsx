import React from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { Cpu, ExternalLink, GitBranch } from "lucide-react";

interface TelemetryHeroProps {
  data: {
    username: string;
    consistency_score: number;
    total_repos: number;
    total_commits: number;
    top_language: string | null;
  };
}

export const TelemetryHero: React.FC<TelemetryHeroProps> = ({ data }) => {
  const isHighPerformance = data.consistency_score >= 70;
  const statusColor = isHighPerformance ? "#39d353" : data.consistency_score >= 40 ? "#d29922" : "#f85149";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="p-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative h-20 w-20 flex-shrink-0">
              <div 
                className="absolute inset-0 rounded-full animate-pulse opacity-40" 
                style={{ border: `2px solid ${statusColor}`, boxShadow: `0 0 20px ${statusColor}` }} 
              />
              <img
                src={`https://github.com/${data.username}.png`}
                alt={data.username}
                className="relative z-10 h-full w-full rounded-full border-4 border-[#0a0c12] object-cover"
              />
            </div>
            
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-extrabold tracking-tight text-white">@{data.username}</h2>
                <a 
                  href={`https://github.com/${data.username}`} 
                  target="_blank" rel="noreferrer"
                  className="text-gray-500 hover:text-[#58a6ff] transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
              <div className="mt-2 flex items-center gap-2 font-mono text-xs text-gray-400">
                <Cpu size={14} style={{ color: statusColor }} />
                <span className="tracking-wide">TELEMETRY_STATUS //</span>
                <span style={{ color: statusColor, fontWeight: 700 }}>
                  {isHighPerformance ? "OPTIMAL_FLOW" : "DEGRADED_DELTA"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 ml-auto flex-wrap">
            <div className="text-right font-mono hidden sm:block">
              <span className="text-[10px] text-gray-500 tracking-wider">CONSISTENCY OVERVIEW</span>
              <div className="text-sm font-bold text-white mt-0.5">
                {isHighPerformance ? "CLASS_A OPERATOR" : "VARIABLE_STREAM"}
              </div>
            </div>

            <div className="relative flex h-20 w-20 items-center justify-center">
              <svg width="80" height="80" className="-rotate-95">
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="4" />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke={statusColor}
                  strokeWidth="4"
                  strokeDasharray={2 * Math.PI * 34}
                  initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - data.consistency_score / 100) }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center font-mono">
                <span className="text-xl font-black text-white leading-none">{data.consistency_score}</span>
                <span className="text-[9px] text-gray-500 mt-0.5">/100</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/[0.05] pt-6 md:grid-cols-4">
          {[
            { label: "ASSETS_REGISTERED", value: data.total_repos, desc: "Public Repositories" },
            { label: "COMMITS_AGGREGATED", value: data.total_commits, desc: "Historical Push Units" },
            { label: "PRIMARY_STACK", value: data.top_language ?? "N/A", desc: "Dominant Language" },
            { label: "DELTA_SCORE", value: `${data.consistency_score}%`, desc: "Operational Density" }
          ].map((stat, i) => (
            <div key={i} className="font-mono">
              <span className="text-[10px] text-gray-500 tracking-wider block">{stat.label}</span>
              <span className="text-xl font-bold text-white block mt-1">{stat.value}</span>
              <span className="text-[11px] text-gray-400 block mt-0.5">{stat.desc}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};