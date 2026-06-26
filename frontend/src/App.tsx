import { useState, useEffect } from "react";
import {
  Star,
  GitFork,
  Search,
  Activity,
  Flame,
  CalendarDays,
  Code2,
  Sparkles,
  Radar,
} from "lucide-react";
import RepoBarChart from "./RepoBarChart";

interface Repo {
  name: string;
  stars: number;
  forks: number;
}

interface Snapshot {
  username: string;
  total_repos: number;
  total_commits: number;
  top_language: string | null;
  most_active_day: string | null;
  longest_streak: number;
  current_streak: number;
  consistency_score: number;
  boost_message: string;
  roast_message: string;
  top_repos: Repo[];
  active_days_last_90: number;
}

const API_BASE = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:5000";

const litColors = ["#0d1117", "#0e4429", "#006d32", "#26a641", "#39d353"];

function AmbientGridBackground() {
  const cols = 28;
  const rows = 16;
  const [pulseMap, setPulseMap] = useState<Record<number, number>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const index = Math.floor(Math.random() * cols * rows);
      const level = 1 + Math.floor(Math.random() * 4);

      setPulseMap((prev) => ({ ...prev, [index]: level }));

      setTimeout(() => {
        setPulseMap((prev) => {
          const next = { ...prev };
          delete next[index];
          return next;
        });
      }, 1800);
    }, 550);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 -z-20 bg-[#0b1016]"
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 -z-10 grid gap-[3px] p-4 opacity-25"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        aria-hidden="true"
      >
        {Array.from({ length: cols * rows }, (_, i) => {
          const level = pulseMap[i] ?? 0;
          return (
            <div
              key={i}
              className="rounded-[2px] transition-colors duration-700"
              style={{ backgroundColor: litColors[level] }}
            />
          );
        })}
      </div>

      {/* soft radial glows */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-140px] left-[-120px] h-[380px] w-[380px] rounded-full bg-[#39d353]/10 blur-3xl" />
        <div className="absolute right-[-120px] top-[180px] h-[340px] w-[340px] rounded-full bg-[#58a6ff]/10 blur-3xl" />
        <div className="absolute bottom-[-100px] left-[35%] h-[280px] w-[280px] rounded-full bg-[#a371f7]/10 blur-3xl" />
      </div>
    </>
  );
}

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/8 bg-[#11161d]/85 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_rgba(0,0,0,0.35)] ${className}`}
    >
      {children}
    </div>
  );
}

function StatTile({
  icon,
  label,
  value,
  accent = "default",
  helper,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: "default" | "green" | "amber" | "blue";
  helper?: string;
}) {
  const accentMap = {
    default: "text-[#f0f6fc]",
    green: "text-[#39d353]",
    amber: "text-[#d29922]",
    blue: "text-[#58a6ff]",
  };

  return (
    <SectionCard className="p-4 hover:-translate-y-[2px] hover:border-[#39d353]/40 transition-all duration-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#8b949e] font-mono">
            {label}
          </p>
          <div className={`mt-2 text-2xl font-semibold ${accentMap[accent]}`}>
            {value}
          </div>
          {helper && (
            <p className="mt-1 text-xs font-mono text-[#6e7681]">{helper}</p>
          )}
        </div>
        <div className="rounded-xl border border-white/8 bg-white/[0.03] p-2 text-[#8b949e]">
          {icon}
        </div>
      </div>
    </SectionCard>
  );
}

function ConsistencyCard({ score }: { score: number }) {
  const color =
    score >= 70 ? "#39d353" : score >= 40 ? "#d29922" : "#f85149";
  const label =
    score >= 70 ? "Strong" : score >= 40 ? "Building" : "Needs work";
  const insight =
    score >= 70
      ? "You’re maintaining a fairly steady coding rhythm."
      : score >= 40
      ? "You’ve got momentum — consistency is the next lever."
      : "Low activity spread. More active days will lift this quickly.";

  return (
    <SectionCard className="p-5 lg:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#8b949e] font-mono">
            consistency score
          </p>
          <div className="mt-2 flex items-center gap-3">
            <span
              className="rounded-full px-2.5 py-1 text-[11px] font-mono"
              style={{ backgroundColor: `${color}22`, color }}
            >
              {label}
            </span>
            <span className="text-3xl font-semibold" style={{ color }}>
              {score}/100
            </span>
          </div>
        </div>

        <div className="w-full max-w-sm">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#1d2430]">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${score}%`, backgroundColor: color }}
            />
          </div>
          <p className="mt-3 text-xs font-mono leading-relaxed text-[#6e7681]">
            {insight}
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

function RoastBoostCard({ boost, roast }: { boost: string; roast: string }) {
  const [mode, setMode] = useState<"boost" | "roast">("boost");

  return (
    <SectionCard className="p-5 lg:p-6 h-full">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#8b949e] font-mono">
            motivation engine
          </p>
          <h3 className="mt-1 text-lg font-semibold text-[#f0f6fc]">
            {mode === "boost" ? "Boost mode" : "Reality check"}
          </h3>
        </div>
        <Sparkles className="text-[#8b949e]" size={18} />
      </div>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setMode("boost")}
          className={`rounded-xl px-3 py-2 text-xs font-mono transition-colors ${
            mode === "boost"
              ? "bg-[#238636] text-white"
              : "bg-[#1a2028] text-[#8b949e] hover:text-[#e6edf3]"
          }`}
        >
          boost me
        </button>
        <button
          onClick={() => setMode("roast")}
          className={`rounded-xl px-3 py-2 text-xs font-mono transition-colors ${
            mode === "roast"
              ? "bg-[#f85149] text-white"
              : "bg-[#1a2028] text-[#8b949e] hover:text-[#e6edf3]"
          }`}
        >
          roast me
        </button>
      </div>

      <div className="rounded-xl border border-white/6 bg-[#0f141b] p-4">
        <p className="text-sm leading-relaxed text-[#e6edf3]">
          {mode === "boost" ? boost : roast}
        </p>
      </div>
    </SectionCard>
  );
}

function InsightCard({
  topLanguage,
  mostActiveDay,
  activeDays,
}: {
  topLanguage: string | null;
  mostActiveDay: string | null;
  activeDays: number;
}) {
  return (
    <SectionCard className="p-5 lg:p-6 h-full">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#8b949e] font-mono">
            activity insight
          </p>
          <h3 className="mt-1 text-lg font-semibold text-[#f0f6fc]">
            Coding profile
          </h3>
        </div>
        <Radar className="text-[#8b949e]" size={18} />
      </div>

      <div className="space-y-3">
        <div className="rounded-xl border border-white/6 bg-[#0f141b] p-4">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#6e7681] font-mono">
            dominant language
          </p>
          <p className="mt-2 text-lg font-semibold text-[#39d353]">
            {topLanguage ?? "Not enough data"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/6 bg-[#0f141b] p-4">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#6e7681] font-mono">
              most active day
            </p>
            <p className="mt-2 text-base font-semibold text-[#f0f6fc]">
              {mostActiveDay ?? "N/A"}
            </p>
          </div>

          <div className="rounded-xl border border-white/6 bg-[#0f141b] p-4">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#6e7681] font-mono">
              active days / 90d
            </p>
            <p className="mt-2 text-base font-semibold text-[#f0f6fc]">
              {activeDays}
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function OverviewCard({ data }: { data: Snapshot }) {
  return (
    <SectionCard className="p-5 lg:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#39d353]/20 bg-[#39d353]/10 text-[#39d353]">
              <Code2 size={22} />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#8b949e] font-mono">
                github snapshot
              </p>
              <h2 className="text-2xl font-semibold text-[#f0f6fc]">
                @{data.username}
              </h2>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#8b949e]">
            A quick view of repository traction, coding consistency, streaks and
            recent activity signals for this GitHub profile.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[520px]">
          <div className="rounded-xl border border-white/6 bg-[#0f141b] p-4">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#6e7681] font-mono">
              repos
            </p>
            <p className="mt-2 text-xl font-semibold text-[#f0f6fc]">
              {data.total_repos}
            </p>
          </div>

          <div className="rounded-xl border border-white/6 bg-[#0f141b] p-4">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#6e7681] font-mono">
              commits
            </p>
            <p className="mt-2 text-xl font-semibold text-[#f0f6fc]">
              {data.total_commits}
            </p>
          </div>

          <div className="rounded-xl border border-white/6 bg-[#0f141b] p-4">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#6e7681] font-mono">
              active / 90d
            </p>
            <p className="mt-2 text-xl font-semibold text-[#f0f6fc]">
              {data.active_days_last_90}
            </p>
          </div>

          <div className="rounded-xl border border-white/6 bg-[#0f141b] p-4">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#6e7681] font-mono">
              top language
            </p>
            <p className="mt-2 text-xl font-semibold text-[#39d353]">
              {data.top_language ?? "N/A"}
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

export default function App() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState<Snapshot | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchSnapshot() {
    if (!username.trim()) {
      setError("Please enter a username.");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch(
        `${API_BASE}/api/snapshot/${username.trim()}`
      );
      if (!response.ok) throw new Error("User not found or an error occurred.");
      const json: Snapshot = await response.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden px-5 py-10 text-[#e6edf3] sm:px-6 lg:px-8">
      <AmbientGridBackground />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HERO */}
        <section className="mb-8">
          <SectionCard className="overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.95fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#39d353]/20 bg-[#39d353]/10 px-3 py-1 text-[11px] font-mono text-[#39d353]">
                  <Activity size={13} />
                  github activity intelligence
                </div>

                <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-[#f0f6fc] sm:text-5xl">
                  GitPulse
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#8b949e] sm:text-base">
                  Track GitHub consistency, streaks, repository traction and
                  coding momentum in a single snapshot. Search a profile and get
                  a clean analytics dashboard instantly.
                </p>

                <div className="mt-6 flex flex-wrap gap-3 text-xs font-mono text-[#8b949e]">
                  <span className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5">
                    streak tracking
                  </span>
                  <span className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5">
                    repo leaderboard
                  </span>
                  <span className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5">
                    3D repo view
                  </span>
                </div>
              </div>

              {/* Search panel */}
              <div className="rounded-2xl border border-white/8 bg-[#0f141b]/90 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#8b949e] font-mono">
                  search profile
                </p>
                <h2 className="mt-2 text-xl font-semibold text-[#f0f6fc]">
                  Generate a GitHub snapshot
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#8b949e]">
                  Enter any GitHub username to pull streaks, consistency,
                  activity and repository stats.
                </p>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && fetchSnapshot()}
                    placeholder="e.g. TP200613"
                    className="flex-1 rounded-xl border border-[#30363d] bg-[#11161d] px-4 py-3 font-mono text-sm text-[#e6edf3] outline-none transition-colors placeholder:text-[#484f58] focus:border-[#39d353]"
                  />
                  <button
                    onClick={fetchSnapshot}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#2ea043] bg-[#238636] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2ea043] disabled:border-[#30363d] disabled:bg-[#21262d] disabled:text-[#8b949e]"
                  >
                    <Search size={15} />
                    {loading ? "fetching..." : "Get snapshot"}
                  </button>
                </div>

                {loading && (
                  <p className="mt-3 text-xs font-mono text-[#8b949e] animate-pulse">
                    pulling live data from github — this can take a few seconds...
                  </p>
                )}

                {error && (
                  <p className="mt-3 text-sm font-mono text-[#f85149]">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </SectionCard>
        </section>

        {data && (
          <div className="space-y-8">
            {/* OVERVIEW */}
            <OverviewCard data={data} />

            {/* CONSISTENCY + STATS */}
            <section className="grid gap-4 xl:grid-cols-[1.15fr_1fr]">
              <ConsistencyCard score={data.consistency_score} />

              <div className="grid gap-4 sm:grid-cols-2">
                <StatTile
                  icon={<Flame size={18} />}
                  label="current streak"
                  value={`${data.current_streak}d`}
                  accent="green"
                  helper="active streak"
                />
                <StatTile
                  icon={<Activity size={18} />}
                  label="longest streak"
                  value={`${data.longest_streak}d`}
                  accent="green"
                  helper="all time"
                />
                <StatTile
                  icon={<CalendarDays size={18} />}
                  label="most active day"
                  value={data.most_active_day ?? "N/A"}
                  accent="blue"
                />
                <StatTile
                  icon={<Code2 size={18} />}
                  label="top language"
                  value={data.top_language ?? "N/A"}
                  accent="default"
                />
              </div>
            </section>

            {/* INSIGHTS */}
            <section className="grid gap-4 lg:grid-cols-2">
              <RoastBoostCard
                boost={data.boost_message}
                roast={data.roast_message}
              />
              <InsightCard
                topLanguage={data.top_language}
                mostActiveDay={data.most_active_day}
                activeDays={data.active_days_last_90}
              />
            </section>

            {/* REPO SECTION */}
            <section className="grid gap-4 xl:grid-cols-[1.25fr_0.9fr]">
              <SectionCard className="p-5 lg:p-6">
                <div className="mb-4">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#8b949e] font-mono">
                    top repos — 3d view
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-[#f0f6fc]">
                    Repository traction
                  </h3>
                </div>
                <RepoBarChart
                  repos={data.top_repos}
                  topLanguage={data.top_language}
                />
              </SectionCard>

              <SectionCard className="p-5 lg:p-6">
                <div className="mb-4">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#8b949e] font-mono">
                    leaderboard
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-[#f0f6fc]">
                    Top repositories
                  </h3>
                </div>

                <div className="space-y-3">
                  {data.top_repos.map((repo, index) => (
                    <div
                      key={repo.name}
                      className="flex items-center justify-between rounded-2xl border border-white/6 bg-[#0f141b] px-4 py-3 transition-colors hover:border-[#39d353]/40 hover:bg-[#141b24]"
                    >
                      <div className="min-w-0 flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/6 bg-white/[0.03] text-xs font-mono text-[#8b949e]">
                          #{index + 1}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-mono text-sm text-[#58a6ff]">
                            {repo.name}
                          </p>
                          <p className="mt-1 text-[11px] font-mono text-[#6e7681]">
                            repo traction score: {repo.stars + repo.forks}
                          </p>
                        </div>
                      </div>

                      <div className="ml-4 flex shrink-0 items-center gap-4 text-xs font-mono text-[#8b949e]">
                        <span className="flex items-center gap-1">
                          <Star size={12} /> {repo.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork size={12} /> {repo.forks}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}