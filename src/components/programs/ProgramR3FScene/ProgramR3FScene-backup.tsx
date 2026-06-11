import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import styles from './ProgramR3FScene.module.css'

// ── 제도별 씬 설정 — 디자인 조정 시 여기만 수정 ──────────────
const SCENE_CONFIG = {
  transfer: {
    color:       '#1A6FD0',
    count:       120,
    shape:       'ring',    // 링 형태로 흩어지는 파티클
    noiseSpeed:  0.0004,
    size:        0.12,
  },
  modular: {
    color:       '#38B2AC',
    count:       100,
    shape:       'grid',    // 격자 배열
    noiseSpeed:  0.0003,
    size:        0.135,
  },
  'self-design': {
    color:       '#ED8936',
    count:       140,
    shape:       'scatter', // 자유 분산
    noiseSpeed:  0.0005,
    size:        0.13,
  },
} as const

type SceneId = keyof typeof SCENE_CONFIG

// ── 간단한 sin/cos 기반 노이즈 드리프트 ──────────────────────
function ParticlesMesh({ sceneId }: { sceneId: SceneId }) {
  const meshRef  = useRef<THREE.Points>(null)
  const cfg      = SCENE_CONFIG[sceneId]
  const count    = cfg.count
  const timeRef  = useRef(0)

  const { positions, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const phases    = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      if (cfg.shape === 'ring') {
        const angle = (i / count) * Math.PI * 2
        const r = 3 + (Math.random() - 0.5) * 2
        positions[i3]     = Math.cos(angle) * r
        positions[i3 + 1] = (Math.random() - 0.5) * 3
        positions[i3 + 2] = Math.sin(angle) * r
      } else if (cfg.shape === 'grid') {
        const cols = Math.ceil(Math.sqrt(count))
        const col  = i % cols
        const row  = Math.floor(i / cols)
        positions[i3]     = (col / cols - 0.5) * 8
        positions[i3 + 1] = (row / cols - 0.5) * 6
        positions[i3 + 2] = (Math.random() - 0.5) * 2
      } else {
        positions[i3]     = (Math.random() - 0.5) * 10
        positions[i3 + 1] = (Math.random() - 0.5) * 7
        positions[i3 + 2] = (Math.random() - 0.5) * 4
      }
      phases[i] = Math.random() * Math.PI * 2
    }
    return { positions, phases }
  }, [count, cfg.shape])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    timeRef.current += delta
    const t   = timeRef.current
    const pos = meshRef.current.geometry.attributes['position'] as THREE.BufferAttribute
    const arr = pos.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const ph = phases[i] ?? 0
      arr[i3 + 1] += Math.sin(t * 0.6 + ph) * cfg.noiseSpeed * 8
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={cfg.size}
        color={cfg.color}
        sizeAttenuation
        transparent
        opacity={0.45}
        depthWrite={false}
      />
    </points>
  )
}

interface ProgramR3FSceneProps {
  programId: SceneId
}

export default function ProgramR3FScene({ programId }: ProgramR3FSceneProps) {
  return (
    <div className={styles.canvas} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ParticlesMesh sceneId={programId} />
      </Canvas>
    </div>
  )
}
