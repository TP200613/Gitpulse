import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";

interface Repo {
  name: string;
  stars: number;
  forks: number;
}

const languageColors: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  "C#": "#178600",
  Default: "#39d353",
};

function RepoGroup({
  x,
  repo,
  color,
  maxValue,
}: {
  x: number;
  repo: Repo;
  color: string;
  maxValue: number;
}) {
  const starHeight = Math.max(
    (repo.stars / maxValue) * 2.8,
    repo.stars > 0 ? 0.25 : 0.12
  );
  const forkHeight = Math.max(
    (repo.forks / maxValue) * 2.8,
    repo.forks > 0 ? 0.25 : 0.12
  );

  const label =
    repo.name.length > 12 ? repo.name.slice(0, 10) + "…" : repo.name;

  return (
    <group position={[x, 0, 0]}>
      {/* stars */}
      <mesh position={[-0.28, starHeight / 2, 0]}>
        <boxGeometry args={[0.38, starHeight, 0.38]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.18}
          roughness={0.45}
          metalness={0.2}
        />
      </mesh>

      {/* forks */}
      <mesh position={[0.28, forkHeight / 2, 0]}>
        <boxGeometry args={[0.38, forkHeight, 0.38]} />
        <meshStandardMaterial
          color="#58a6ff"
          emissive="#58a6ff"
          emissiveIntensity={0.16}
          roughness={0.45}
          metalness={0.2}
        />
      </mesh>

      {/* values */}
      <Text
        position={[-0.28, starHeight + 0.18, 0]}
        fontSize={0.14}
        color="#e6edf3"
        anchorX="center"
        anchorY="middle"
      >
        {repo.stars}
      </Text>

      <Text
        position={[0.28, forkHeight + 0.18, 0]}
        fontSize={0.14}
        color="#e6edf3"
        anchorX="center"
        anchorY="middle"
      >
        {repo.forks}
      </Text>

      {/* legend dots */}
      <Text
        position={[-0.28, -0.22, 0]}
        fontSize={0.11}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        ★
      </Text>
      <Text
        position={[0.28, -0.22, 0]}
        fontSize={0.11}
        color="#58a6ff"
        anchorX="center"
        anchorY="middle"
      >
        ⑂
      </Text>

      {/* repo label */}
      <Text
        position={[0, -0.48, 0]}
        fontSize={0.14}
        color="#8b949e"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.3}
      >
        {label}
      </Text>
    </group>
  );
}

export default function RepoBarChart({
  repos,
  topLanguage,
}: {
  repos: Repo[];
  topLanguage: string | null;
}) {
  if (!repos.length) {
    return (
      <div className="h-72 flex items-center justify-center rounded-2xl border border-white/6 bg-[#0f141b] text-sm font-mono text-[#8b949e]">
        no repo data available
      </div>
    );
  }

  const color =
    languageColors[topLanguage ?? "Default"] ?? languageColors.Default;

  const maxValue = Math.max(
    ...repos.flatMap((repo) => [repo.stars, repo.forks]),
    1
  );

  const spacing = 1.55;
  const startX = -((repos.length - 1) * spacing) / 2;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/6 bg-[#0f141b]">
      <div className="flex items-center justify-between px-4 pt-3 text-[11px] font-mono text-[#8b949e]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            stars
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[#58a6ff]" />
            forks
          </span>
        </div>
        <span>scaled by repo max</span>
      </div>

      <div className="h-72">
        <Canvas camera={{ position: [0, 2.6, 6.4], fov: 42 }}>
          <ambientLight intensity={0.75} />
          <directionalLight position={[5, 8, 5]} intensity={1.15} />
          <pointLight position={[0, 4, 2]} intensity={0.35} color={color} />

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
            <planeGeometry args={[12, 6]} />
            <meshStandardMaterial color="#11161d" />
          </mesh>

          <gridHelper
            args={[12, 12, "#21262d", "#161b22"]}
            position={[0, 0, 0]}
          />

          {repos.map((repo, i) => (
            <RepoGroup
              key={repo.name}
              x={startX + i * spacing}
              repo={repo}
              color={color}
              maxValue={maxValue}
            />
          ))}
        </Canvas>
      </div>
    </div>
  );
}