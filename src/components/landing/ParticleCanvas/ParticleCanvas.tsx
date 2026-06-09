import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import styles from './ParticleCanvas.module.css'

// ── 파티클 개수 / 범위 상수 — 나중에 디자인 조정 시 여기만 수정 ──
const PARTICLE_COUNT = 380
const SPREAD_X = 14
const SPREAD_Y = 10
const SPREAD_Z = 6
const PARTICLE_SIZE = 0.025
const PARTICLE_COLOR = '#6C63FF'   // index.css --color-accent-primary 와 맞춤
const DRIFT_SPEED = 0.00018

function Particles() {
  const meshRef = useRef<THREE.Points>(null)

  // 초기 위치를 useMemo로 고정
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      positions[i3]     = (Math.random() - 0.5) * SPREAD_X
      positions[i3 + 1] = (Math.random() - 0.5) * SPREAD_Y
      positions[i3 + 2] = (Math.random() - 0.5) * SPREAD_Z
      // 각 파티클마다 미세하게 다른 드리프트 속도
      velocities[i3]     = (Math.random() - 0.5) * DRIFT_SPEED
      velocities[i3 + 1] = (Math.random() - 0.5) * DRIFT_SPEED * 0.6
      velocities[i3 + 2] = (Math.random() - 0.5) * DRIFT_SPEED * 0.3
    }
    return { positions, velocities }
  }, [])

  useFrame(() => {
    if (!meshRef.current) return
    const pos = meshRef.current.geometry.attributes['position'] as THREE.BufferAttribute
    const arr = pos.array as Float32Array

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      arr[i3]     += velocities[i3]
      arr[i3 + 1] += velocities[i3 + 1]
      arr[i3 + 2] += velocities[i3 + 2]

      // 경계를 벗어나면 반대편에서 재등장
      if (Math.abs(arr[i3])     > SPREAD_X / 2) velocities[i3]     *= -1
      if (Math.abs(arr[i3 + 1]) > SPREAD_Y / 2) velocities[i3 + 1] *= -1
      if (Math.abs(arr[i3 + 2]) > SPREAD_Z / 2) velocities[i3 + 2] *= -1
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
        size={PARTICLE_SIZE}
        color={PARTICLE_COLOR}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  )
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
  )
}
