import { motion } from "framer-motion";
import { Code2, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-green-500 to-cyan-500 shadow-lg">

            <Code2 className="h-6 w-6 text-white" />

          </div>

          <div>

            <h1 className="text-xl font-bold tracking-tight">
              Git<span className="text-green-400">Pulse</span>
            </h1>

            <p className="text-xs text-slate-400">
              Developer Analytics Platform
            </p>

          </div>

        </div>

        <nav className="hidden items-center gap-8 md:flex">

          <button className="text-slate-300 transition hover:text-white">
            Features
          </button>

          <button className="text-slate-300 transition hover:text-white">
            Dashboard
          </button>

          <button className="text-slate-300 transition hover:text-white">
            Docs
          </button>

        </nav>

        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 px-5 py-3 font-semibold text-white transition hover:scale-105">

          <Sparkles size={18} />

          Get Started

        </button>

      </div>
    </motion.header>
  );
}