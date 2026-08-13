import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { techGraph } from "@/data/portfolio";
import { useMousePosition } from "@/hooks/useMousePosition";
import { usePerformanceTier, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { SceneBoundary } from "./SceneBoundary";

const ACCENT = "#6fd3f2";
const VIOLET = "#9a7bf5";

function Graph({ reduce }: { reduce: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useMousePosition();

  const edges = useMemo(
    () =>
      techGraph.edges.map(([a, b]) => {
        const from = techGraph.nodes.find((n) => n.id === a)!;
        const to = techGraph.nodes.find((n) => n.id === b)!;
        return {
          key: `${a}-${b}`,
          points: [
            new THREE.Vector3(...from.position),
            new THREE.Vector3(...to.position),
          ] as [THREE.Vector3, THREE.Vector3],
        };
      }),
    [],
  );

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const targetY = reduce ? 0 : pointer.current.x * 0.45;
    const targetX = reduce ? 0 : pointer.current.y * 0.22;
    g.rotation.y += (targetY - g.rotation.y) * Math.min(1, dt * 1.8);
    g.rotation.x += (targetX - g.rotation.x) * Math.min(1, dt * 1.8);
  });

  return (
    <group ref={group}>
      {edges.map((edge) => (
        <Line
          key={edge.key}
          points={edge.points}
          color={ACCENT}
          transparent
          opacity={0.35}
          lineWidth={1}
        />
      ))}
      {techGraph.nodes.map((node, i) => (
        <Float
          key={node.id}
          speed={reduce ? 0 : 1.1 + (i % 3) * 0.25}
          floatIntensity={0.5}
          rotationIntensity={0.2}
        >
          <group position={[node.position[0], node.position[1], node.position[2]]}>
            <mesh>
              <icosahedronGeometry args={[0.26, 1]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? ACCENT : VIOLET}
                emissive={i % 2 === 0 ? ACCENT : VIOLET}
                emissiveIntensity={0.45}
                metalness={0.6}
                roughness={0.25}
              />
            </mesh>
            <Html center distanceFactor={7} position={[0, 0.5, 0]}>
              <span className="whitespace-nowrap font-mono text-[10px] tracking-[0.18em] text-foreground/80 uppercase">
                {node.label}
              </span>
            </Html>
          </group>
        </Float>
      ))}
    </group>
  );
}

/** Lightweight technology graph. Rendered only on tablet/desktop. */
export function TechGraph() {
  const tier = usePerformanceTier();
  const reduce = usePrefersReducedMotion();

  if (tier === "low") return null;

  return (
    <SceneBoundary>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 7], fov: 42 }}
        className="!absolute inset-0"
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[3, 3, 5]} intensity={18} color={ACCENT} distance={16} />
        <pointLight position={[-4, -2, 4]} intensity={14} color={VIOLET} distance={16} />
        <Graph reduce={reduce} />
      </Canvas>
    </SceneBoundary>
  );
}
