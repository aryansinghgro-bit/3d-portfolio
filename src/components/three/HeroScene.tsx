import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, RoundedBox, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";
import { usePerformanceTier, usePrefersReducedMotion, type Tier } from "@/hooks/useMediaQuery";
import { SceneBoundary } from "./SceneBoundary";

const ACCENT = "#6fd3f2";
const VIOLET = "#9a7bf5";

function CodeLines() {
  const lines = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        y: 0.42 - i * 0.14,
        width: 0.35 + ((i * 37) % 60) / 100,
        indent: i % 3 === 0 ? 0 : 0.12,
        color: i % 4 === 0 ? VIOLET : ACCENT,
      })),
    [],
  );

  return (
    <group position={[0, 0, 0.031]}>
      {lines.map((line, i) => (
        <mesh key={i} position={[-0.62 + line.width / 2 + line.indent, line.y, 0]}>
          <planeGeometry args={[line.width, 0.045]} />
          <meshBasicMaterial color={line.color} transparent opacity={i % 4 === 0 ? 0.55 : 0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Monitor() {
  return (
    <group>
      {/* Bezel */}
      <RoundedBox args={[2.9, 1.85, 0.09]} radius={0.06} smoothness={3} castShadow receiveShadow>
        <meshStandardMaterial color="#15181f" metalness={0.85} roughness={0.32} />
      </RoundedBox>
      {/* Screen */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[2.66, 1.6]} />
        <meshStandardMaterial color="#080a10" metalness={0.4} roughness={0.18} />
      </mesh>
      {/* Editor chrome */}
      <group position={[0, 0.68, 0.052]}>
        <mesh>
          <planeGeometry args={[2.66, 0.16]} />
          <meshBasicMaterial color="#101420" />
        </mesh>
        {[-1.22, -1.13, -1.04].map((x, i) => (
          <mesh key={x} position={[x, 0, 0.001]}>
            <circleGeometry args={[0.025, 16]} />
            <meshBasicMaterial color={[ACCENT, VIOLET, "#4a5568"][i] ?? ACCENT} />
          </mesh>
        ))}
      </group>
      <group position={[0, -0.05, 0.02]}>
        <CodeLines />
      </group>
      {/* Screen glow */}
      <pointLight position={[0, 0, 0.6]} intensity={2.4} distance={3.4} color={ACCENT} />
      {/* Stand */}
      <mesh position={[0, -1.18, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.11, 0.5, 20]} />
        <meshStandardMaterial color="#1b1f28" metalness={0.9} roughness={0.3} />
      </mesh>
      <RoundedBox args={[0.9, 0.06, 0.5]} radius={0.03} position={[0, -1.44, 0]} castShadow>
        <meshStandardMaterial color="#1b1f28" metalness={0.9} roughness={0.35} />
      </RoundedBox>
    </group>
  );
}

function Keyboard({ tier }: { tier: Tier }) {
  const rows = tier === "low" ? 2 : 4;
  const cols = tier === "low" ? 8 : 14;
  const keys = useMemo(() => {
    const out: [number, number, number][] = [];
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        out.push([-0.9 + (c * 1.8) / (cols - 1), 0.045, -0.16 + (r * 0.32) / (rows - 1)]);
    return out;
  }, [rows, cols]);

  return (
    <group position={[0, -1.62, 1.35]} rotation={[-0.12, 0, 0]}>
      <RoundedBox args={[2.1, 0.08, 0.62]} radius={0.04} smoothness={2} castShadow receiveShadow>
        <meshStandardMaterial color="#171a22" metalness={0.7} roughness={0.42} />
      </RoundedBox>
      {keys.map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.1, 0.02, 0.1]} />
          <meshStandardMaterial
            color="#2a3040"
            emissive={ACCENT}
            emissiveIntensity={i % 9 === 0 ? 0.5 : 0.06}
            metalness={0.5}
            roughness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

function GlassPanel({
  position,
  rotation,
  size,
  accent,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number];
  accent: string;
}) {
  return (
    <group position={position} rotation={rotation}>
      <RoundedBox args={[size[0], size[1], 0.035]} radius={0.05} smoothness={3}>
        <meshPhysicalMaterial
          color="#aecbe4"
          transparent
          opacity={0.16}
          roughness={0.08}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>
      <mesh position={[0, size[1] / 2 - 0.11, 0.024]}>
        <planeGeometry args={[size[0] * 0.55, 0.045]} />
        <meshBasicMaterial color={accent} transparent opacity={0.85} />
      </mesh>
      <mesh position={[-size[0] * 0.1, size[1] / 2 - 0.24, 0.024]}>
        <planeGeometry args={[size[0] * 0.72, 0.03]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

function AtomRings() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * 0.12;
  });
  return (
    <group ref={ref} position={[2.35, 0.9, -0.6]} scale={0.85}>
      {[0, Math.PI / 3, -Math.PI / 3].map((rot, i) => (
        <mesh key={i} rotation={[Math.PI / 2, rot, 0]}>
          <torusGeometry args={[0.62, 0.012, 8, 64]} />
          <meshStandardMaterial
            color={i === 1 ? VIOLET : ACCENT}
            emissive={i === 1 ? VIOLET : ACCENT}
            emissiveIntensity={0.7}
            roughness={0.3}
          />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={1.1} />
      </mesh>
    </group>
  );
}

function Workspace({ tier, reduce }: { tier: Tier; reduce: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useMousePosition();
  const scroll = useRef(0);

  useFrame(({ camera }, dt) => {
    const g = group.current;
    if (!g) return;

    const progress = Math.min(
      1,
      window.scrollY / Math.max(1, window.innerHeight * (tier === "low" ? 1.6 : 2.2)),
    );
    scroll.current += (progress - scroll.current) * Math.min(1, dt * 3);
    const p = scroll.current;

    const mx = reduce ? 0 : pointer.current.x;
    const my = reduce ? 0 : pointer.current.y;
    const t = performance.now() / 1000;

    const targetY = mx * 0.28 + p * 0.9;
    const targetX = my * 0.12 + p * 0.18;
    g.rotation.y += (targetY - g.rotation.y) * Math.min(1, dt * 2.2);
    g.rotation.x += (targetX - g.rotation.x) * Math.min(1, dt * 2.2);
    g.position.y = (reduce ? 0 : Math.sin(t * 0.7) * 0.08) - p * 0.7;
    g.position.x = (tier === "low" ? 0.2 : 1.9) + p * -1.6;

    // Gentle scroll-driven camera travel with mouse parallax.
    const camTargetX = mx * 0.35 + p * 1.2;
    const camTargetY = -my * 0.28 + 0.2 + p * 0.9;
    const camTargetZ = 7.4 - p * 1.4;
    camera.position.x += (camTargetX - camera.position.x) * Math.min(1, dt * 1.6);
    camera.position.y += (camTargetY - camera.position.y) * Math.min(1, dt * 1.6);
    camera.position.z += (camTargetZ - camera.position.z) * Math.min(1, dt * 1.6);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group} scale={tier === "low" ? 0.72 : 1}>
      <Float speed={reduce ? 0 : 1.1} rotationIntensity={0.12} floatIntensity={0.35}>
        <Monitor />
      </Float>
      <Keyboard tier={tier} />
      {tier !== "low" && (
        <>
          <Float speed={reduce ? 0 : 1.4} floatIntensity={0.6} rotationIntensity={0.2}>
            <GlassPanel
              position={[-2.5, 0.95, 0.9]}
              rotation={[0, 0.45, 0.06]}
              size={[1.15, 0.8]}
              accent={ACCENT}
            />
          </Float>
          <Float speed={reduce ? 0 : 1.7} floatIntensity={0.5} rotationIntensity={0.2}>
            <GlassPanel
              position={[-2.15, -0.55, 1.5]}
              rotation={[0, 0.5, -0.05]}
              size={[0.95, 0.62]}
              accent={VIOLET}
            />
          </Float>
          <AtomRings />
        </>
      )}
      {tier === "high" && (
        <Sparkles count={40} scale={[9, 5, 5]} size={2} speed={0.25} opacity={0.5} color={ACCENT} />
      )}
      <ContactShadows
        position={[0, -1.72, 0]}
        opacity={tier === "low" ? 0.25 : 0.45}
        scale={11}
        blur={2.8}
        far={4}
        resolution={tier === "high" ? 512 : 256}
        frames={tier === "low" ? 1 : Infinity}
      />
    </group>
  );
}

/** Single hero canvas, fixed behind the first sections of the page. */
export function HeroScene() {
  const tier = usePerformanceTier();
  const reduce = usePrefersReducedMotion();

  return (
    <SceneBoundary>
      <Canvas
        dpr={tier === "high" ? [1, 1.8] : [1, 1.35]}
        shadows={tier !== "low"}
        gl={{ antialias: tier !== "low", powerPreference: "high-performance", alpha: true }}
        camera={{ position: [0, 0.2, 7.4], fov: 38 }}
        className="!absolute inset-0"
      >
        <ambientLight intensity={0.5} />
        <hemisphereLight args={["#8fd4ff", "#0a0c12", 0.45]} />
        <directionalLight
          position={[4.5, 6, 5]}
          intensity={1.5}
          castShadow={tier !== "low"}
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-5, 1.5, 3]} intensity={22} color={VIOLET} distance={14} />
        <pointLight position={[5, -2, 4]} intensity={14} color={ACCENT} distance={14} />
        <Workspace tier={tier} reduce={reduce} />
      </Canvas>
    </SceneBoundary>
  );
}
