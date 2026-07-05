import { motion } from "framer-motion";
import SearchPanel from "./SearchPanel";
import FeatureChip from "./FeatureChip";

interface HeroProps {
  username: string;
  setUsername: (value: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export default function Hero({
  username,
  setUsername,
  onSearch,
  loading,
}: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
        >

          <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-5 py-2 text-sm text-green-400">

            🚀 AI Powered GitHub Analytics

          </span>

          <h1 className="mt-8 text-6xl md:text-8xl font-black leading-tight">

            Your

            <span className="gradient-text block">

              GitHub Journey

            </span>

            <span className="block">

              Visualized.

            </span>

          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-xl leading-9 text-slate-400">

            Track your coding consistency, repository quality,
            contribution history, developer growth and AI-powered
            insights from any public GitHub profile.

          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .25 }}
          className="mt-16"
        >

          <SearchPanel
            username={username}
            setUsername={setUsername}
            onSearch={onSearch}
            loading={loading}
          />

        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .6 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >

          <FeatureChip text="AI Insights" />

          <FeatureChip text="Contribution Analytics" />

          <FeatureChip text="Repository Ranking" />

          <FeatureChip text="Developer Score" />

          <FeatureChip text="Open Source Growth" />

        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20"
        >

          <div className="mx-auto h-16 w-[1px] bg-gradient-to-b from-green-500 to-transparent" />

          <p className="mt-3 text-sm text-slate-500">

            Scroll to explore

          </p>

        </motion.div>

      </div>

    </section>
  );
}