import React from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { Star, GitFork, Terminal, LayoutDashboard } from "lucide-react";
import RepoBarChart from "../RepoBarChart";

interface Repo { name: string; stars: number; forks: number; }
interface RepositoryRegistryProps {
  repos: Repo[];
  topLanguage: string | null;
  username: string;
}

export const RepositoryRegistry: React.FC<RepositoryRegistryProps> = ({ repos, topLanguage, username }) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card className="flex flex-col p-6">
        <div className="mb-6 flex items-center gap-3 border-b border-white/[0.04] pb-4">
          <LayoutDashboard size={14} className="text-[#39d353]" />
          <span className="font-mono text-xs font-bold tracking-wider text-gray-400">TRACTION_SPECTRUM_ALLOCATION</span>
        </div>
        <div className="flex min-h-[280px] flex-1 items-center justify-center">
          <RepoBarChart repos={repos} topLanguage={topLanguage} />
        </div>
      </Card>

      <Card className="p-6">
        <div className="mb-6 flex items-center gap-3 border-b border-white/[0.04] pb-4">
          <Terminal size={14} className="text-[#58a6ff]" />
          <span className="font-mono text-xs font-bold tracking-wider text-gray-400">ARCHIVE_LEADERBOARD_REGISTRY</span>
        </div>

        <div className="flex flex-col gap-2.5">
          {repos.map((repo, i) => (
            <a
              key={repo.name}
              href={`https://github.com/${username}/${repo.name}`}
              target="_blank" rel="noreferrer"
              className="group flex items-center justify-between rounded-xl border border-white/[0.02] bg-white/[0.01] p-4 transition-all duration-300 hover:border-[#39d353]/20 hover:bg-[#39d353]/[0.02] hover:translate-x-1"
            >
              <div className="flex items-center gap-4 font-mono">
                <span className="text-xs text-gray-600 font-bold w-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-bold text-[#58a6ff] group-hover:text-white transition-colors duration-200">
                  {repo.name}
                </span>
              </div>

              <div className="flex items-center gap-4 font-mono text-xs text-gray-500">
                <span className="flex items-center gap-1.5 text-[#d29922]">
                  <Star size={13} fill="#d29922" opacity={0.6} />
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1.5">
                  <GitFork size={13} />
                  {repo.forks}
                </span>
              </div>
            </a>
          ))}
        </div>
      </Card>
    </div>
  );
};