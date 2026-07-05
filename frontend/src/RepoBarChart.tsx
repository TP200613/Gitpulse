import { useState } from "react";

interface Repo {
  name: string;
  stars: number;
  forks: number;
}

const SLICE_COLORS = [
  "#39d353",
  "#58a6ff",
  "#f78166",
  "#d2a8ff",
  "#ffa657",
];

const CX = 100;
const CY = 100;
const R = 80;
const INNER_R = 38;

function polarToCartesian(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CX + radius * Math.cos(rad),
    y: CY + radius * Math.sin(rad),
  };
}

function buildSlicePath(startAngle: number, endAngle: number): string {
  // SVG can't draw a full 360° arc as a single arc command — use a circle instead
  if (endAngle - startAngle >= 359.99) {
    return `M ${CX} ${CY - R} A ${R} ${R} 0 1 1 ${CX - 0.01} ${CY - R} Z`;
  }
  const start = polarToCartesian(startAngle, R);
  const end = polarToCartesian(endAngle, R);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${CX} ${CY}`,
    `L ${start.x} ${start.y}`,
    `A ${R} ${R} 0 ${largeArc} 1 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

export default function RepoBarChart({
  repos,
  topLanguage: _topLanguage,
}: {
  repos: Repo[];
  topLanguage: string | null;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (!repos.length) {
    return (
      <div
        style={{
          height: 200,
          background: "#0d1117",
          border: "1px solid #21262d",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#8b949e",
          fontSize: 13,
          fontFamily: "monospace",
        }}
      >
        no repo data available
      </div>
    );
  }

  const scores = repos.map((r) => r.stars + r.forks);
  const total = scores.reduce((a, b) => a + b, 0);

  // equal slices when all repos have 0 traction
  const values = total === 0 ? repos.map(() => 1) : scores;
  const valueTotal = values.reduce((a, b) => a + b, 0);

  let cursor = 0;
  const slices = repos.map((repo, i) => {
    const fraction = values[i] / valueTotal;
    const startAngle = cursor;
    const endAngle = cursor + fraction * 360;
    cursor = endAngle;
    return {
      repo,
      score: scores[i],
      fraction,
      startAngle,
      endAngle,
      color: SLICE_COLORS[i % SLICE_COLORS.length],
    };
  });

  const hoveredSlice = hovered !== null ? slices[hovered] : null;

  return (
    <div
      style={{
        background: "#0d1117",
        border: "1px solid #21262d",
        borderRadius: 8,
        padding: "16px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
          flexWrap: "wrap",
        }}
      >
        {/* Donut SVG */}
        <div style={{ flexShrink: 0 }}>
          <svg
            width={200}
            height={200}
            viewBox="0 0 200 200"
            style={{ display: "block" }}
          >
            {slices.map((s, i) => {
              const isHovered = hovered === i;
              const offset = isHovered ? 7 : 0;
              const mid = (s.startAngle + s.endAngle) / 2;
              const rad = ((mid - 90) * Math.PI) / 180;
              const tx = offset * Math.cos(rad);
              const ty = offset * Math.sin(rad);

              return (
                <path
                  key={s.repo.name}
                  d={buildSlicePath(s.startAngle, s.endAngle)}
                  fill={s.color}
                  opacity={hovered === null || isHovered ? 1 : 0.3}
                  transform={`translate(${tx}, ${ty})`}
                  style={{
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                />
              );
            })}

            {/* Donut hole */}
            <circle cx={CX} cy={CY} r={INNER_R} fill="#0d1117" />

            {/* Center label */}
            {hoveredSlice ? (
              <>
                <text
                  x={CX}
                  y={CY - 12}
                  textAnchor="middle"
                  fill={hoveredSlice.color}
                  fontSize={10}
                  fontFamily="monospace"
                >
                  {hoveredSlice.repo.name.length > 11
                    ? hoveredSlice.repo.name.slice(0, 10) + "…"
                    : hoveredSlice.repo.name}
                </text>
                <text
                  x={CX}
                  y={CY + 7}
                  textAnchor="middle"
                  fill="#f0f6fc"
                  fontSize={18}
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {Math.round(hoveredSlice.fraction * 100)}%
                </text>
                <text
                  x={CX}
                  y={CY + 22}
                  textAnchor="middle"
                  fill="#8b949e"
                  fontSize={9}
                  fontFamily="monospace"
                >
                  ★{hoveredSlice.repo.stars} ⑂{hoveredSlice.repo.forks}
                </text>
              </>
            ) : (
              <>
                <text
                  x={CX}
                  y={CY - 5}
                  textAnchor="middle"
                  fill="#8b949e"
                  fontSize={10}
                  fontFamily="monospace"
                >
                  {total === 0 ? "equal" : "traction"}
                </text>
                <text
                  x={CX}
                  y={CY + 13}
                  textAnchor="middle"
                  fill="#f0f6fc"
                  fontSize={14}
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {total === 0 ? "split" : `${total} pts`}
                </text>
              </>
            )}
          </svg>
        </div>

        {/* Legend */}
        <div style={{ flex: 1, minWidth: 180, display: "flex", flexDirection: "column", gap: 12 }}>
          {slices.map((s, i) => (
            <div
              key={s.repo.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                opacity: hovered === null || hovered === i ? 1 : 0.35,
                transition: "opacity 0.2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: s.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 13,
                    color: "#e6edf3",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: 180,
                  }}
                >
                  {s.repo.name}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#8b949e",
                  flexShrink: 0,
                  marginLeft: 12,
                }}
              >
                <span>★ {s.repo.stars}</span>
                <span>⑂ {s.repo.forks}</span>
                <span style={{ color: s.color, fontWeight: "bold" }}>
                  {Math.round(s.fraction * 100)}%
                </span>
              </div>
            </div>
          ))}

          {total === 0 && (
            <p
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "#484f58",
                marginTop: 4,
              }}
            >
              no stars or forks yet — slices split equally
            </p>
          )}
        </div>
      </div>
    </div>
  );
}