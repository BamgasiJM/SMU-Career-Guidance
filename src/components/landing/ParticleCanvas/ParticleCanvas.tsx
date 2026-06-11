import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import styles from "./ParticleCanvas.module.css";

const PARTICLE_COUNT = 700;
const SPREAD_X = 3;
const SPREAD_Y = 3;
const SPREAD_Z = 15;
const PARTICLE_SIZE = 0.065;
const DRIFT_SPEED = 0.0018;

// ── 파티클에 사용할 컬러 팔레트 — 여기에 추가/변경 ──
const PALETTE = ["#083d9e", "#ecb91f", "#9b56bd"];

function createCircleTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0,   "rgba(255,255,255,1)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.8)");
  gradient.addColorStop(1,   "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}

function Particles() {
  const meshRef = useRef<THREE.Points>(null);

  const texture = useMemo(() => createCircleTexture(), []);

  const { positions, velocities, colors } = useMemo(() => {
    const positions  = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors     = new Float32Array(PARTICLE_COUNT * 3); // RGB per particle

    const threeColors = PALETTE.map((hex) => new THREE.Color(hex));

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      positions[i3]     = (Math.random() - 0.5) * SPREAD_X;
      positions[i3 + 1] = (Math.random() - 0.5) * SPREAD_Y;
      positions[i3 + 2] = (Math.random() - 0.5) * SPREAD_Z;

      velocities[i3]     = (Math.random() - 0.5) * DRIFT_SPEED;
      velocities[i3 + 1] = (Math.random() - 0.5) * DRIFT_SPEED * 0.6;
      velocities[i3 + 2] = (Math.random() - 0.5) * DRIFT_SPEED * 0.3;

      // 팔레트에서 랜덤 선택 후 RGB 버퍼에 기록
      const c = threeColors[Math.floor(Math.random() * threeColors.length)];
      colors[i3]     = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }
    return { positions, velocities, colors };
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes[
      "position"
    ] as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      arr[i3]     += velocities[i3];
      arr[i3 + 1] += velocities[i3 + 1];
      arr[i3 + 2] += velocities[i3 + 2];

      if (Math.abs(arr[i3])     > SPREAD_X / 2) velocities[i3]     *= -1;
      if (Math.abs(arr[i3 + 1]) > SPREAD_Y / 2) velocities[i3 + 1] *= -1;
      if (Math.abs(arr[i3 + 2]) > SPREAD_Z / 2) velocities[i3 + 2] *= -1;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={PARTICLE_SIZE}
        map={texture}
        alphaMap={texture}
        alphaTest={0.01}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        vertexColors          // color 속성 활성화
      />
    </points>
  );
}

export default function ParticleCanvas() {
  return (
    <div className={styles.canvas} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Particles />
      </Canvas>
    </div>
  );
}