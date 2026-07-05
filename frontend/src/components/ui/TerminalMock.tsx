import React, { useState, useEffect } from "react";
import { Terminal } from "lucide-react";

interface TerminalMockProps {
  boost: string;
  roast: string;
}

export const TerminalMock: React.FC<TerminalMockProps> = ({ boost, roast }) => {
  const [tab, setTab] = useState<"boost" | "roast">("boost");
  const [output, setOutput] = useState("");
  const activeStream = tab === "boost" ? boost : roast;

  useEffect(() => {
    setOutput("");
    let cursor = 0;
    const streamTimer = setInterval(() => {
      setOutput((prev) => prev + activeStream.charAt(cursor));
      cursor++;
      if (cursor >= activeStream.length) clearInterval(streamTimer);
    }, 6);

    return () => clearInterval(streamTimer);
  }, [tab, activeStream]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(10,12,18,0.45)] backdrop-blur-xl p-0 border-white/[0.05] bg-black/20 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between bg-black/40 border-b border-white/[0.04] px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-3 font-mono text-[10px] font-bold tracking-wider text-gray-500 uppercase">
            BEHAVIORAL_DIAGNOSTIC_SHELL
          </span>
        </div>

        <div className="flex border border-white/[0.04] bg-white/[0.01] p-0.5 rounded-lg font-mono">
          <button
            onClick={() => setTab("boost")}
            className={`rounded-md px-3 py-1 text-[10px] font-bold transition-all ${tab === "boost" ? "bg-[#238636] text-white" : "text-gray-500 hover:text-gray-300"}`}
          >
            STIMULATE
          </button>
          <button
            onClick={() => setTab("roast")}
            className={`rounded-md px-3 py-1 text-[10px] font-bold transition-all ${tab === "roast" ? "bg-[#f85149] text-white" : "text-gray-500 hover:text-gray-300"}`}
          >
            CRITIQUE
          </button>
        </div>
      </div>

      <div className="p-6 font-mono text-sm leading-relaxed text-gray-300 min-h-[140px]">
        <div className={`flex items-center gap-2 text-xs mb-3 font-bold ${tab === "boost" ? "text-[#39d353]" : "text-[#f85149]"}`}>
          <Terminal size={14} />
          <span>gitpulse@intelligence:~$ ./analyze_momentum.sh --eval={tab}</span>
        </div>
        <p className="font-sans text-sm tracking-wide text-slate-200">
          {output}
          <span className="inline-block h-3.5 w-2 ml-1 align-middle animate-ping" style={{ backgroundColor: tab === "boost" ? "#39d353" : "#f85149" }} />
        </p>
      </div>
    </div>
  );
};