import { motion } from "framer-motion";
import { Search, Sparkles, Code2 } from "lucide-react";

interface SearchPanelProps {
  username: string;
  setUsername: (value: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export default function SearchPanel({
  username,
  setUsername,
  onSearch,
  loading,
}: SearchPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="max-w-5xl mx-auto"
    >
      <div className="glass-strong rounded-3xl p-6 shadow-2xl">

        <div className="flex flex-col lg:flex-row gap-5">

          {/* Input */}

          <div className="relative flex-1">

            <Code2
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
              size={22}
            />

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
              placeholder="Enter GitHub username..."
              className="input pl-14 text-lg"
            />

          </div>

          {/* Analyze */}

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: .97 }}
            disabled={loading}
            onClick={onSearch}
            className="btn-primary flex items-center justify-center gap-3 text-lg"
          >
            <Search size={20} />

            {loading ? "Analyzing..." : "Analyze Profile"}
          </motion.button>

          {/* Demo */}

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: .97 }}
            className="btn-secondary flex items-center justify-center gap-3 text-lg"
          >
            <Sparkles size={20} />

            Try Demo
          </motion.button>

        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-slate-500">

          <span>⚡ Live GitHub Data</span>

          <span>•</span>

          <span>AI Insights</span>

          <span>•</span>

          <span>Repository Analytics</span>

          <span>•</span>

          <span>Developer Score</span>

        </div>

      </div>
    </motion.div>
  );
}