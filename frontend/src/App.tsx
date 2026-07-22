import React, { useState, useEffect, useRef } from "react";
import {
  Star, GitFork, Search, Flame, Zap, Terminal, Shield,
  Calendar, Code2, GitCommit, BookMarked, Activity, ExternalLink, 
  RefreshCw, Cpu, Globe, Columns3, Award, Command
} from "lucide-react";
import RepoBarChart from "./RepoBarChart";

// ─── Interfaces ──────────────────────────────────────────────────────────────
interface Repo { name: string; stars: number; forks: number; }

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

// ─── CSS Keyframe & Global Interactive Sheet Injector ───────────────────────
const INTENSE_PREMIUM_CSS = `
  @keyframes cyberScan {
    0% { top: 0%; opacity: 0.8; }
    50% { opacity: 0.3; }
    100% { top: 100%; opacity: 0.8; }
  }
  @keyframes subtleGlowPulse {
    0% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.45; transform: scale(1.05); }
    100% { opacity: 0.3; transform: scale(1); }
  }
  @keyframes floatElement {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  @keyframes spinSlow {
    to { transform: rotate(360deg); }
  }
  @keyframes coreGlitch {
    0% { clip-path: inset(40% 0 61% 0); transform: skew(0.3deg); }
    20% { clip-path: inset(92% 0 1% 0); transform: skew(-0.5deg); }
    40% { clip-path: inset(15% 0 80% 0); transform: skew(0.5deg); }
    60% { clip-path: inset(80% 0 5% 0); transform: skew(-0.3deg); }
    80% { clip-path: inset(3% 0 92% 0); transform: skew(0.8deg); }
    100% { clip-path: inset(40% 0 61% 0); transform: skew(0deg); }
  }

  /* Structural Ultra Glass Cards */
  .ultra-glass {
    background: rgba(10, 14, 22, 0.4) !important;
    backdrop-filter: blur(24px) saturate(160%);
    -webkit-backdrop-filter: blur(24px) saturate(160%);
    border: 1px solid rgba(255, 255, 255, 0.04) !important;
    box-shadow: 0 30px 70px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    transform-style: preserve-3d;
    perspective: 1000px;
    transition: transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.4s ease, box-shadow 0.4s ease;
  }
  .ultra-glass:hover {
    border-color: rgba(57, 211, 83, 0.3) !important;
    box-shadow: 0 40px 90px rgba(57, 211, 83, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  /* Interactive Elements */
  .input-matrix-field {
    background: rgba(5, 7, 12, 0.6) !important;
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05) !important;
    box-shadow: inset 0 2px 8px rgba(0,0,0,0.8);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .input-matrix-field:focus {
    border-color: #39d353 !important;
    background: rgba(5, 7, 12, 0.85) !important;
    box-shadow: 0 0 30px rgba(57, 211, 83, 0.15), inset 0 1px 0 rgba(57, 211, 83, 0.2);
  }
  .btn-neon-action {
    background: linear-gradient(135deg, #238636, #2ea043) !important;
    border: 1px solid rgba(57, 211, 83, 0.4) !important;
    box-shadow: 0 4px 20px rgba(46, 160, 67, 0.3);
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }
  .btn-neon-action:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(46, 160, 67, 0.5), 0 0 15px rgba(57, 211, 83, 0.3);
    border-color: #39d353 !important;
  }
  .btn-neon-action:active:not(:disabled) {
    transform: translateY(0px);
  }

  /* Custom Clean Scrollbars */
  ::-webkit-scrollbar { width: 8px; height: 8px; }
  ::-webkit-scrollbar-track { background: #04060a; }
  ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.08); borderRadius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(57, 211, 83, 0.3); }
`;

// ─── Advanced Interactive Geometric Fluid-Node Field Background ──────────────
function InteractiveFluidMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Array<{
      x: number; y: number; vx: number; vy: number;
      radius: number; color: string; alpha: number; phase: number; speed: number;
    }> = [];
    
    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const createParticles = () => {
      particles = [];
      const density = Math.floor((canvas.width * canvas.height) / 14000);
      const cappedDensity = Math.min(density, 90);

      for (let i = 0; i < cappedDensity; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          color: Math.random() > 0.75 ? "88, 166, 255" : "57, 211, 83",
          alpha: Math.random() * 0.4 + 0.1,
          phase: Math.random() * Math.PI,
          speed: 0.01 + Math.random() * 0.02
        });
      }
    };
    createParticles();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      ctx.fillStyle = "#04060a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.strokeStyle = "rgba(255, 255, 255, 0.008)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      ctx.fillStyle = "rgba(57, 211, 83, 0.03)";
      ctx.beginPath();
      ctx.arc(canvas.width * 0.25, canvas.height * 0.3, 300, 0, Math.PI * 2);
      ctx.fill();

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.speed;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const currentAlpha = p.alpha + Math.sin(p.phase) * 0.08;
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0.05, currentAlpha)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const proximityAlpha = (1 - dist / 180) * 0.15;
          ctx.strokeStyle = `rgba(${p.color}, ${proximityAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });

      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i]; const p2 = particles[j];
          const distx = p1.x - p2.x; const disty = p1.y - p2.y;
          const dist = Math.sqrt(distx * distx + disty * disty);
          
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.04;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}

// ─── Direct 3D Rotation Calculation Hook ──────────────────────────────────────
function use3DTilt() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const tiltX = (yc - y) / 12;
    const tiltY = (x - xc) / 12;

    card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-2px)`;
    
    const shineLayer = card.querySelector(".glare-layer") as HTMLDivElement;
    if (shineLayer) {
      const percentageX = (x / rect.width) * 100;
      const percentageY = (y / rect.height) * 100;
      shineLayer.style.background = `radial-gradient(circle at ${percentageX}% ${percentageY}%, rgba(255,255,255,0.06) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0px)";
    const shineLayer = card.querySelector(".glare-layer") as HTMLDivElement;
    if (shineLayer) shineLayer.style.background = "transparent";
  };

  return { cardRef, handleMouseMove, handleMouseLeave };
}

// ─── 3D Core Profile Card ───────────────────────────────
function Interactive3DHero({ data }: { data: Snapshot }) {
  const tilt = use3DTilt();
  const score = data.consistency_score;
  const isHealthy = score >= 70;
  const themeHex = isHealthy ? "#39d353" : score >= 40 ? "#d29922" : "#f85149";

  return (
    <div 
      ref={tilt.cardRef}
      onMouseMove={tilt.handleMouseMove}
      onMouseLeave={tilt.handleMouseLeave}
      className="ultra-glass"
      style={{
        borderRadius: 28, padding: "36px 40px", marginBottom: 32, position: "relative", overflow: "hidden"
      }}
    >
      <div className="glare-layer" style={{ position: "absolute", inset: 0, pointerEvents: "none", transition: "background 0.1s ease", zIndex: 3 }} />
      
      <div style={{
        position: "absolute", left: 0, width: "100%", height: "2px",
        background: `linear-gradient(90deg, transparent, ${themeHex}, transparent)`,
        animation: "cyberScan 4s linear infinite", pointerEvents: "none", zIndex: 2
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 32, position: "relative", zIndex: 4 }}>
        
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ position: "relative", width: 90, height: 90, flexShrink: 0 }}>
            <div style={{
              position: "absolute", inset: -4, borderRadius: "50%",
              background: `conic-gradient(from 180deg, ${themeHex}, transparent, ${themeHex})`,
              animation: "spinSlow 10s linear infinite"
            }} />
            <img 
              src={`https://github.com/${data.username}.png`} 
              alt={data.username} 
              style={{
                width: "100%", height: "100%", borderRadius: "50%",
                border: "4px solid #070a0f", position: "relative", zIndex: 1, objectFit: "cover"
              }}
            />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
              <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "-0.5px" }}>
                @{data.username}
              </h2>
              <a 
                href={`https://github.com/${data.username}`} 
                target="_blank" rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontFamily: "monospace",
                  color: "#58a6ff", background: "rgba(88, 166, 255, 0.08)", border: "1px solid rgba(88, 166, 255, 0.15)",
                  padding: "4px 12px", borderRadius: 8, textDecoration: "none", fontWeight: 600
                }}
              >
                VIEW ON GITHUB <ExternalLink size={12} />
              </a>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "monospace", fontSize: 12, color: "#8b949e" }}>
              <Cpu size={14} color={themeHex} />
              <span style={{ letterSpacing: "1px" }}>CONSISTENCY STATUS //</span>
              <span style={{ color: themeHex, fontWeight: 800 }}>{isHealthy ? "STRONG" : "NEEDS_WORK"}</span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24, marginLeft: "auto" }}>
          <div style={{ textAlign: "right", fontFamily: "monospace" }}>
            <span style={{ fontSize: 10, color: "#6e7681", letterSpacing: "1.5px" }}>SCORE TIER</span>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginTop: 2 }}>
              {score >= 70 ? "TOP TIER" : "BUILDING"}
            </div>
          </div>
          
          <div style={{ position: "relative", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={80} height={80} viewBox="0 0 80 80" style={{ transform: "rotate(-90deg)" }}>
              <circle cx={40} cy={40} r={35} fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth={5} />
              <circle 
                cx={40} cy={40} r={35} fill="none" 
                stroke={themeHex} strokeWidth={5}
                strokeDasharray={`${2 * Math.PI * 35}`}
                strokeDashoffset={`${2 * Math.PI * 35 * (1 - score / 100)}`}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)" }}
              />
            </svg>
            <div style={{ position: "absolute", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 18, fontWeight: 900, color: "#fff", fontFamily: "monospace", lineHeight: 1 }}>{score}</span>
              <span style={{ fontSize: 9, color: "#6e7681", fontFamily: "monospace", marginTop: 1 }}>/100</span>
            </div>
          </div>
        </div>

      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24,
        marginTop: 36, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 28
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(88, 166, 255, 0.05)", border: "1px solid rgba(88, 166, 255, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#58a6ff" }}>
            <BookMarked size={18} />
          </div>
          <div>
            <div style={{ fontSize: 11, fontFamily: "monospace", color: "#6e7681", letterSpacing: "0.5px" }}>REPOSITORIES</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", fontFamily: "monospace", marginTop: 2 }}>{data.total_repos}</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(57, 211, 83, 0.05)", border: "1px solid rgba(57, 211, 83, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#39d353" }}>
            <GitCommit size={18} />
          </div>
          <div>
            <div style={{ fontSize: 11, fontFamily: "monospace", color: "#6e7681", letterSpacing: "0.5px" }}>TOTAL COMMITS</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#39d353", fontFamily: "monospace", marginTop: 2 }}>{data.total_commits}</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(210, 168, 255, 0.05)", border: "1px solid rgba(210, 168, 255, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#d2a8ff" }}>
            <Globe size={18} />
          </div>
          <div>
            <div style={{ fontSize: 11, fontFamily: "monospace", color: "#6e7681", letterSpacing: "0.5px" }}>ACTIVE DAYS (90D)</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#d2a8ff", fontFamily: "monospace", marginTop: 2 }}>
              {data.active_days_last_90} <span style={{ fontSize: 12, color: "#6e7681", fontWeight: 500 }}>DAYS</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// ─── Interactive 3D Telemetry Grid Block Component ──────────────────────────
function TelemetryMetricCard({ icon, label, value, sub, hex }: { icon: React.ReactNode; label: string; value: string; sub: string; hex: string }) {
  const tilt = use3DTilt();
  
  return (
    <div
      ref={tilt.cardRef}
      onMouseMove={tilt.handleMouseMove}
      onMouseLeave={tilt.handleMouseLeave}
      className="ultra-glass"
      style={{
        borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between",
        height: "100%", position: "relative", overflow: "hidden"
      }}
    >
      <div className="glare-layer" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }} />
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10, background: `${hex}10`,
            border: `1px solid ${hex}20`, display: "flex", alignItems: "center", justifyContent: "center", color: hex
          }}>
            {icon}
          </div>
          <span style={{ fontSize: 11, fontFamily: "monospace", color: "#8b949e", fontWeight: 700, letterSpacing: "0.5px" }}>
            {label}
          </span>
        </div>
        
        <div style={{ fontSize: 32, fontWeight: 900, color: "#fff", fontFamily: "monospace", letterSpacing: "-0.5px" }}>
          {value}
        </div>
      </div>

      <div style={{ fontSize: 12, color: "#6e7681", fontFamily: "monospace", marginTop: 16, borderTop: "1px solid rgba(255,255,255,0.03)", paddingTop: 12 }}>
        {sub}
      </div>
    </div>
  );
}

// ─── High Fidelity Terminal Interface Mockup Component ───────────────────────
function InteractiveDiagnosticTerminal({ boost, roast }: { boost: string; roast: string }) {
  const [terminalTab, setTerminalTab] = useState<"boost" | "roast">("boost");
  const isBoost = terminalTab === "boost";
  const [displayedText, setDisplayedText] = useState("");
  const fullText = isBoost ? boost : roast;

  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      i++;
      setDisplayedText(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(interval);
    }, 8);

    return () => clearInterval(interval);
  }, [terminalTab, boost, roast, fullText]);
  
  return (
    <div className="ultra-glass" style={{ borderRadius: 24, overflow: "hidden" }}>
      <div style={{
        background: "rgba(5, 7, 12, 0.5)", borderBottom: "1px solid rgba(255,255,255,0.04)",
        padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }} />
          <span style={{ fontSize: 11, fontFamily: "monospace", color: "#6e7681", marginLeft: 12, letterSpacing: "0.5px" }}>
            gitpulse_verdict.sh
          </span>
        </div>
        
        <div style={{ display: "flex", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", padding: 2, borderRadius: 10 }}>
          <button 
            onClick={() => setTerminalTab("boost")}
            style={{
              fontFamily: "monospace", fontSize: 11, fontWeight: 700, padding: "5px 16px", borderRadius: 8,
              border: "none", cursor: "pointer", background: isBoost ? "#238636" : "transparent",
              color: isBoost ? "#fff" : "#8b949e", transition: "all 0.2s"
            }}
          >
            &gt; BOOST_MODE
          </button>
          <button 
            onClick={() => setTerminalTab("roast")}
            style={{
              fontFamily: "monospace", fontSize: 11, fontWeight: 700, padding: "5px 16px", borderRadius: 8,
              border: "none", cursor: "pointer", background: !isBoost ? "#f85149" : "transparent",
              color: !isBoost ? "#fff" : "#8b949e", transition: "all 0.2s"
            }}
          >
            &gt; ROAST_MODE
          </button>
        </div>
      </div>

      <div style={{ padding: 28, background: "rgba(3, 5, 8, 0.3)", minHeight: 130, fontFamily: "monospace", fontSize: 14, color: "#e6edf3", lineHeight: 1.7 }}>
        <div style={{ color: isBoost ? "#39d353" : "#f85149", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
          <Terminal size={14} />
          <span>gitpulse@verdict:~# {isBoost ? "boost" : "roast"} --user</span>
        </div>
        
        <p style={{ margin: 0, color: "#cbd5e1" }}>
          {displayedText}
          <span style={{
            display: "inline-block", width: 8, height: 15, background: isBoost ? "#39d353" : "#f85149",
            marginLeft: 4, verticalAlign: "middle", animation: "subtleGlowPulse 0.8s infinite"
          }} />
        </p>
      </div>
    </div>
  );
}

// ─── Custom Modular Layout Section Divider Line ──────────────────────────────
function DesignSectionLabel({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <div style={{ margin: "56px 0 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ color: "#39d353", display: "flex", alignItems: "center" }}>{icon}</div>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: "#fff", letterSpacing: "2px", textTransform: "uppercase", margin: 0, fontFamily: "monospace" }}>
          {title}
        </h3>
        <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, rgba(57,211,83,0.15), rgba(255,255,255,0.01), transparent)", marginLeft: 12 }} />
      </div>
    </div>
  );
}

// ─── Compact Comparison Card ──────────────────────────────────────
interface CompareResult {
  username: string;
  data: Snapshot | null;
  error: string | null;
}

function CompareSnapshotCard({ result, rank }: { result: CompareResult; rank: number | null }) {
  if (result.error) {
    return (
      <div className="ultra-glass" style={{ borderRadius: 20, padding: 24, borderLeft: "4px solid #f85149" }}>
        <div style={{ fontFamily: "monospace", fontSize: 13, color: "#f85149", fontWeight: 700, marginBottom: 4 }}>
          @{result.username}
        </div>
        <div style={{ fontFamily: "monospace", fontSize: 12, color: "#8b949e" }}>
          {result.error}
        </div>
      </div>
    );
  }

  const data = result.data;
  if (!data) return null;

  const score = data.consistency_score;
  const themeHex = score >= 70 ? "#39d353" : score >= 40 ? "#d29922" : "#f85149";
  const isTop = rank === 1;

  const rows: Array<[string, string, string]> = [
    ["Current streak", `${data.current_streak} days`, "#f78166"],
    ["Longest streak", `${data.longest_streak} days`, "#39d353"],
    ["Top language", data.top_language ?? "N/A", "#58a6ff"],
    ["Most active day", data.most_active_day ?? "N/A", "#d2a8ff"],
    ["Total commits", `${data.total_commits}`, "#e6edf3"],
  ];

  return (
    <div
      className="ultra-glass"
      style={{
        borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", gap: 18,
        position: "relative",
        border: isTop ? "1px solid rgba(255, 215, 0, 0.4)" : undefined,
        boxShadow: isTop ? "0 0 30px rgba(255, 215, 0, 0.08)" : undefined
      }}
    >
      {rank && (
        <div style={{
          position: "absolute", top: -10, left: 20, fontFamily: "monospace", fontSize: 11, fontWeight: 800,
          padding: "3px 10px", borderRadius: 8, color: isTop ? "#0a0e0a" : "#fff",
          background: isTop ? "#ffd700" : "rgba(255,255,255,0.08)",
          border: isTop ? "none" : "1px solid rgba(255,255,255,0.1)"
        }}>
          {isTop ? "🏆 #1" : `#${rank}`}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img
          src={`https://github.com/${data.username}.png`}
          alt={data.username}
          style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid #070a0f" }}
        />
        <div>
          <div style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 15, color: "#fff" }}>@{data.username}</div>
          <a href={`https://github.com/${data.username}`} target="_blank" rel="noreferrer"
            style={{ fontSize: 11, fontFamily: "monospace", color: "#58a6ff", textDecoration: "none" }}>
            View on GitHub
          </a>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ position: "relative", width: 56, height: 56 }}>
          <svg width={56} height={56} viewBox="0 0 56 56" style={{ transform: "rotate(-90deg)" }}>
            <circle cx={28} cy={28} r={24} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={4} />
            <circle cx={28} cy={28} r={24} fill="none" stroke={themeHex} strokeWidth={4}
              strokeDasharray={`${2 * Math.PI * 24}`}
              strokeDashoffset={`${2 * Math.PI * 24 * (1 - score / 100)}`}
              strokeLinecap="round" />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontWeight: 800, fontSize: 13, color: "#fff" }}>
            {score}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontFamily: "monospace", color: "#6e7681", letterSpacing: "0.5px" }}>CONSISTENCY SCORE</div>
          <div style={{ fontSize: 13, fontFamily: "monospace", color: themeHex, fontWeight: 700 }}>
            {score >= 70 ? "TOP TIER" : score >= 40 ? "BUILDING" : "NEEDS WORK"}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 14 }}>
        {rows.map(([label, value, hex]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 12 }}>
            <span style={{ color: "#6e7681" }}>{label}</span>
            <span style={{ color: hex, fontWeight: 700 }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Multi-Metric Comparison Chart ──────────────────────────────────────
function CompareMetricsChart({ results }: { results: CompareResult[] }) {
  const valid = results.filter(r => r.data !== null) as Array<CompareResult & { data: Snapshot }>;
  if (valid.length === 0) return null;

  const metrics: Array<{ key: keyof Snapshot; label: string; hex: string; suffix: string }> = [
    { key: "consistency_score", label: "CONSISTENCY SCORE", hex: "#ffbd2e", suffix: "" },
    { key: "current_streak", label: "CURRENT STREAK", hex: "#f78166", suffix: " days" },
    { key: "total_commits", label: "TOTAL COMMITS", hex: "#39d353", suffix: "" },
  ];

  return (
    <div className="ultra-glass" style={{ borderRadius: 22, padding: 28, marginBottom: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      {metrics.map((metric) => {
        const maxVal = Math.max(...valid.map(r => Number(r.data[metric.key]) || 0), 1);
        return (
          <div key={metric.key}>
            <div style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 700, color: "#8b949e", letterSpacing: "0.5px", marginBottom: 12 }}>
              {metric.label}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {valid.map((r) => {
                const value = Number(r.data[metric.key]) || 0;
                const widthPct = Math.max((value / maxVal) * 100, 3);
                return (
                  <div key={r.username} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 90, fontSize: 12, fontFamily: "monospace", color: "#e6edf3", flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      @{r.username}
                    </div>
                    <div style={{ flex: 1, background: "rgba(255,255,255,0.03)", borderRadius: 6, height: 20, position: "relative", overflow: "hidden" }}>
                      <div style={{
                        width: `${widthPct}%`, height: "100%", background: metric.hex, borderRadius: 6,
                        transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                      }} />
                    </div>
                    <div style={{ width: 60, textAlign: "right", fontSize: 12, fontFamily: "monospace", color: metric.hex, fontWeight: 700, flexShrink: 0 }}>
                      {value}{metric.suffix}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Comparison Panel ──────────────────────────────────────
const BULK_PASTE_CAP = 10;

function ComparePanel() {
  const [usernames, setUsernames] = useState(["", ""]);
  const [bulkText, setBulkText] = useState("");
  const [results, setResults] = useState<CompareResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [cappedNotice, setCappedNotice] = useState("");

  function addField() {
    setUsernames([...usernames, ""]);
  }

  function removeField(index: number) {
    if (usernames.length <= 1) return;
    setUsernames(usernames.filter((_, i) => i !== index));
  }

  async function runComparison(list: string[]) {
    if (list.length === 0) return;

    setLoading(true);
    setResults([]);

    const fetched = await Promise.all(
      list.map(async (username): Promise<CompareResult> => {
        try {
          const response = await fetch(`${API_BASE}/api/snapshot/${username}`);
          if (!response.ok) throw new Error("User not found");
          const data = await response.json();
          return { username, data, error: null };
        } catch {
          return { username, data: null, error: "Couldn't find this GitHub user." };
        }
      })
    );

    // Rank successful results by consistency score, descending. Failed lookups go last, unranked.
    const succeeded = fetched.filter(r => r.data !== null).sort(
      (a, b) => (b.data!.consistency_score) - (a.data!.consistency_score)
    );
    const failed = fetched.filter(r => r.data === null);

    setResults([...succeeded, ...failed]);
    setLoading(false);
  }

  function handleFieldCompare() {
    const activeUsernames = usernames.map(u => u.trim()).filter(Boolean);
    setCappedNotice("");
    runComparison(activeUsernames);
  }

  function handleBulkCompare() {
    const parsed = Array.from(
      new Set(
        bulkText
          .split(/[,\n]+/)
          .map(u => u.trim())
          .filter(Boolean)
      )
    );

    if (parsed.length > BULK_PASTE_CAP) {
      setCappedNotice(`You entered ${parsed.length} usernames — only comparing the first ${BULK_PASTE_CAP} to keep things fast.`);
    } else {
      setCappedNotice("");
    }

    runComparison(parsed.slice(0, BULK_PASTE_CAP));
  }

  return (
    <div>
      <div className="ultra-glass" style={{ padding: 20, borderRadius: 22, marginBottom: 32 }}>
        <div style={{ fontSize: 12, fontFamily: "monospace", color: "#8b949e", marginBottom: 14 }}>
          Enter GitHub usernames to compare — ranked by consistency score
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 16 }}>
          {usernames.map((val, i) => (
            <div key={i} style={{ position: "relative", display: "flex" }}>
              <input
                type="text"
                value={val}
                onChange={(e) => {
                  const next = [...usernames];
                  next[i] = e.target.value;
                  setUsernames(next);
                }}
                placeholder={i === 0 ? "Username (required)" : "Username (optional)"}
                className="input-matrix-field"
                style={{ flex: 1, padding: "12px 16px", borderRadius: 12, fontSize: 14, color: "#fff", fontFamily: "monospace", border: "none", outline: "none" }}
              />
              {usernames.length > 1 && (
                <button
                  onClick={() => removeField(i)}
                  aria-label="Remove"
                  style={{
                    position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                    background: "transparent", border: "none", color: "#6e7681", cursor: "pointer",
                    fontSize: 16, fontFamily: "monospace", lineHeight: 1, padding: 4
                  }}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
          <button
            onClick={handleFieldCompare}
            disabled={loading || !usernames[0].trim()}
            className="btn-neon-action"
            style={{
              border: "none", outline: "none", color: "#fff", padding: "12px 28px",
              borderRadius: 14, fontSize: 13, fontWeight: 700, fontFamily: "monospace",
              cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 8
            }}
          >
            {loading ? <RefreshCw size={14} style={{ animation: "spinSlow 1s linear infinite" }} /> : <Columns3 size={14} />}
            {loading ? "Loading..." : "Compare"}
          </button>

          <button
            onClick={addField}
            style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              color: "#8b949e", padding: "12px 20px", borderRadius: 14, fontSize: 13,
              fontWeight: 700, fontFamily: "monospace", cursor: "pointer"
            }}
          >
            + Add another
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "8px 0 16px" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
          <span style={{ fontSize: 11, fontFamily: "monospace", color: "#6e7681" }}>OR PASTE A LIST</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
        </div>

        <textarea
          value={bulkText}
          onChange={(e) => setBulkText(e.target.value)}
          placeholder="Paste usernames separated by commas or new lines, e.g. torvalds, gaearon, sindresorhus (up to 10)"
          className="input-matrix-field"
          rows={3}
          style={{
            width: "100%", padding: "12px 16px", borderRadius: 12, fontSize: 13, color: "#fff",
            fontFamily: "monospace", border: "none", outline: "none", resize: "vertical", marginBottom: 12
          }}
        />
        <button
          onClick={handleBulkCompare}
          disabled={loading || !bulkText.trim()}
          className="btn-neon-action"
          style={{
            border: "none", outline: "none", color: "#fff", padding: "12px 28px",
            borderRadius: 14, fontSize: 13, fontWeight: 700, fontFamily: "monospace",
            cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 8
          }}
        >
          {loading ? <RefreshCw size={14} style={{ animation: "spinSlow 1s linear infinite" }} /> : <Columns3 size={14} />}
          {loading ? "Loading..." : "Compare pasted list"}
        </button>

        {cappedNotice && (
          <div style={{ marginTop: 12, fontSize: 12, fontFamily: "monospace", color: "#d29922" }}>
            {cappedNotice}
          </div>
        )}
      </div>

      {results.length > 0 && (
        <>
          <CompareMetricsChart results={results} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {results.map((result) => {
              const rank = result.data ? results.filter(r => r.data).indexOf(result) + 1 : null;
              return <CompareSnapshotCard key={result.username} result={result} rank={rank} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main Application ──────────────────────────────────────
export default function App() {
  const [viewMode, setViewMode] = useState<"single" | "compare">("single");
  const [searchTarget, setSearchTarget] = useState("");
  const [dataPayload, setDataPayload] = useState<Snapshot | null>(null);
  const [processingState, setProcessingState] = useState(false);
  const [failureNotice, setFailureNotice] = useState("");

  async function executeMainDataFetchPipeline() {
    if (!searchTarget.trim()) { setFailureNotice("Please enter a GitHub username."); return; }
    setProcessingState(true); setFailureNotice(""); setDataPayload(null);
    try {
      const response = await fetch(`${API_BASE}/api/snapshot/${searchTarget.trim()}`);
      if (!response.ok) throw new Error("Couldn't find that GitHub user. Check the spelling and try again.");
      setDataPayload(await response.json());
    } catch (err) {
      setFailureNotice(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setProcessingState(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", color: "#e6edf3", fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "0 24px 160px", position: "relative", overflowX: "hidden"
    }}>
      <style>{INTENSE_PREMIUM_CSS}</style>
      <InteractiveFluidMeshBackground />

      <div style={{
        position: "absolute", width: "700px", height: "700px", top: "-100px", left: "50%", transform: "translateX(-50%)",
        background: "radial-gradient(circle, rgba(57, 211, 83, 0.03) 0%, transparent 65%)",
        filter: "blur(60px)", pointerEvents: "none", zIndex: 0
      }} />

      <header style={{
        maxWidth: 1100, margin: "0 auto", padding: "40px 0 80px", display: "flex",
        justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            background: "rgba(57, 211, 83, 0.1)", border: "1px solid rgba(57, 211, 83, 0.2)",
            padding: 8, borderRadius: 12, color: "#39d353", display: "flex", alignItems: "center"
          }}>
            <Command size={18} />
          </div>
          <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.5px", color: "#fff", fontFamily: "monospace" }}>
            GitPulse
          </span>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: 3, borderRadius: 12 }}>
            <button
              onClick={() => setViewMode("single")}
              style={{
                fontFamily: "monospace", fontSize: 12, fontWeight: 700, padding: "8px 18px", borderRadius: 9,
                border: "none", cursor: "pointer", background: viewMode === "single" ? "#238636" : "transparent",
                color: viewMode === "single" ? "#fff" : "#8b949e", transition: "all 0.2s"
              }}
            >
              Single
            </button>
            <button
              onClick={() => setViewMode("compare")}
              style={{
                fontFamily: "monospace", fontSize: 12, fontWeight: 700, padding: "8px 18px", borderRadius: 9,
                border: "none", cursor: "pointer", background: viewMode === "compare" ? "#238636" : "transparent",
                color: viewMode === "compare" ? "#fff" : "#8b949e", transition: "all 0.2s"
              }}
            >
              Compare
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontFamily: "monospace", color: "#6e7681" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#39d353", animation: "subtleGlowPulse 1.5s infinite" }} />
            <span>Live GitHub data</span>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {viewMode === "compare" ? (
          <>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h1 style={{
                fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 950, color: "#fff",
                letterSpacing: "-1px", marginBottom: 12, lineHeight: 1.15
              }}>
                Compare GitHub profiles
              </h1>
              <p style={{ fontSize: 15, color: "#8b949e", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
                See streaks, top language, and consistency score side by side for up to 3 users.
              </p>
            </div>
            <ComparePanel />
          </>
        ) : (
        <>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)", padding: "6px 16px", borderRadius: 100,
            marginBottom: 24, fontSize: 12, fontFamily: "monospace", color: "#8b949e"
          }}>
            <Shield size={12} color="#39d353" />
            <span>GitHub activity analyzer</span>
          </div>
          
          <h1 style={{
            fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 950, color: "#fff",
            letterSpacing: "-2px", marginBottom: 20, lineHeight: 1.1, textShadow: "0 10px 30px rgba(0,0,0,0.5)"
          }}>
            Decode any GitHub profile's<br />real activity.
          </h1>
          
          <p style={{
            fontSize: "clamp(15px, 2.5vw, 17px)", color: "#8b949e", maxWidth: 580,
            margin: "0 auto", lineHeight: 1.6, fontWeight: 400
          }}>
            Enter any public GitHub username to see their streaks, top language, most active day, and consistency score.
          </p>
        </div>

        <div 
          className="ultra-glass" 
          style={{ padding: 10, borderRadius: 22, display: "flex", gap: 10, marginBottom: 48 }}
        >
          <input 
            type="text"
            value={searchTarget}
            onChange={(e) => setSearchTarget(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && executeMainDataFetchPipeline()}
            placeholder="Enter a GitHub username (e.g., TP200613)"
            className="input-matrix-field"
            style={{
              flex: 1, border: "none", outline: "none", padding: "16px 22px",
              borderRadius: 16, fontSize: 15, color: "#fff", fontFamily: "monospace"
            }}
          />
          <button
            onClick={executeMainDataFetchPipeline}
            disabled={processingState}
            className="btn-neon-action"
            style={{
              border: "none", outline: "none", color: "#fff", padding: "0 32px",
              borderRadius: 16, fontSize: 13, fontWeight: 700, fontFamily: "monospace",
              cursor: processingState ? "not-allowed" : "pointer", display: "flex",
              alignItems: "center", gap: 10
            }}
          >
            {processingState ? (
              <RefreshCw size={14} style={{ animation: "spinSlow 1s linear infinite" }} />
            ) : (
              <Search size={14} />
            )}
            {processingState ? "Loading..." : "GET SNAPSHOT"}
          </button>
        </div>

        {failureNotice && (
          <div 
            className="ultra-glass"
            style={{
              borderRadius: 16, padding: "18px 24px", borderLeft: "4px solid #f85149 !important",
              marginBottom: 40, background: "rgba(248,81,73,0.02) !important"
            }}
          >
            <div style={{ fontFamily: "monospace", fontSize: 13, color: "#f85149", fontWeight: 700 }}>
              {failureNotice}
            </div>
          </div>
        )}

        {dataPayload ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            
            <Interactive3DHero data={dataPayload} />

            <DesignSectionLabel title="Activity Stats" icon={<Activity size={15} />} />
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 20 }}>
              <TelemetryMetricCard icon={<Flame size={18} />} label="CURRENT STREAK" value={`${dataPayload.current_streak} Days`} sub="Consecutive days with a commit, right now" hex="#f78166" />
              <TelemetryMetricCard icon={<Zap size={18} />} label="LONGEST STREAK" value={`${dataPayload.longest_streak} Days`} sub="Longest streak ever recorded" hex="#39d353" />
              <TelemetryMetricCard icon={<Code2 size={18} />} label="TOP LANGUAGE" value={dataPayload.top_language ?? "NONE"} sub="Most-used language across repos" hex="#58a6ff" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 20 }}>
              <TelemetryMetricCard icon={<Calendar size={18} />} label="MOST ACTIVE DAY" value={dataPayload.most_active_day ?? "N/A"} sub="Day of the week with the most commits" hex="#d2a8ff" />
              <TelemetryMetricCard icon={<Award size={18} />} label="CONSISTENCY SCORE" value={`${dataPayload.consistency_score} / 100`} sub="Based on recency, streaks, and regularity" hex="#ffbd2e" />
            </div>

            <DesignSectionLabel title="Boost / Roast" icon={<Cpu size={15} />} />
            <InteractiveDiagnosticTerminal boost={dataPayload.boost_message} roast={dataPayload.roast_message} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 24, marginTop: 16 }}>
              
              <div className="ultra-glass" style={{ borderRadius: 24, padding: 32, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontFamily: "monospace", fontWeight: 700, color: "#8b949e", marginBottom: 28, letterSpacing: "1px" }}>
                  <Columns3 size={14} color="#39d353" />
                  <span>TOP REPOS BY STARS + FORKS</span>
                </div>
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 260 }}>
                  <RepoBarChart repos={dataPayload.top_repos} topLanguage={dataPayload.top_language} />
                </div>
              </div>

              <div className="ultra-glass" style={{ borderRadius: 24, padding: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontFamily: "monospace", fontWeight: 700, color: "#8b949e", marginBottom: 24, letterSpacing: "1px" }}>
                  <Terminal size={14} color="#58a6ff" />
                  <span>REPO LIST</span>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {dataPayload.top_repos.map((repo, i) => (
                    <a 
                      key={repo.name} 
                      href={`https://github.com/${dataPayload.username}/${repo.name}`} 
                      target="_blank" rel="noreferrer"
                      style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "16px 20px", borderRadius: 16, background: "rgba(255,255,255,0.01)",
                        border: "1px solid rgba(255,255,255,0.03)", textDecoration: "none", transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(57,211,83,0.3)";
                        e.currentTarget.style.background = "rgba(57,211,83,0.02)";
                        e.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.03)";
                        e.currentTarget.style.background = "rgba(255,255,255,0.01)";
                        e.currentTarget.style.transform = "translateX(0px)";
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <span style={{ fontSize: 11, fontFamily: "monospace", color: "#484f58", width: 16 }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#58a6ff", letterSpacing: "0.2px", fontFamily: "monospace" }}>
                          {repo.name}
                        </span>
                      </div>
                      
                      <div style={{ display: "flex", gap: 16, fontSize: 12, fontFamily: "monospace", color: "#8b949e" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#d29922" }}>
                          <Star size={12} fill="#d29922" opacity={0.8} /> {repo.stars}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <GitFork size={12} /> {repo.forks}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

            </div>

          </div>
        ) : (
          !processingState && (
            <div 
              className="ultra-glass" 
              style={{ borderRadius: 28, padding: "80px 40px", textAlign: "center", borderStyle: "dashed" }}
            >
              <div style={{
                color: "#6e7681", display: "inline-flex", padding: 20, borderRadius: "50%",
                background: "rgba(255,255,255,0.02)", marginBottom: 20, border: "1px dashed rgba(255,255,255,0.05)"
              }}>
                <Terminal size={36} style={{ animation: "floatElement 4s infinite ease-in-out" }} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: "0 0 8px 0" }}>No profile loaded yet</h3>
              <p style={{ fontFamily: "monospace", fontSize: 12, color: "#6e7681", margin: 0, letterSpacing: "0.5px" }}>
                Enter a GitHub username above to see their activity snapshot.
              </p>
            </div>
          )
        )}
        </>
        )}

      </main>
    </div>
  );
}
