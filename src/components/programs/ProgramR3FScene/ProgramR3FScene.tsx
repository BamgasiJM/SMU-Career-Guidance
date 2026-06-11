import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import styles from './ProgramR3FScene.module.css'

type SceneId = 'transfer' | 'modular' | 'self-design'

interface SceneConfig {
  color: string
  count: number
  size: number
  /** 초기 배치 형태 */
  shape: 'scatter' | 'grid' | 'helix'
  /** 부유 진폭 (float / gridFloat 에서 사용) */
  floatAmp: number
  /** 부유 속도 */
  floatSpeed: number
  /** 이중나선 전용 파라미터 */
  helixRadius?: number
  helixHeight?: number
  helixTurns?: number
  flowSpeed?: number
  /** 모듈형 파장(ripple) 파라미터 — 한 지점에서 동심원으로 퍼지는 파동 */
  waveAmp?: number      // z 변위 진폭
  waveFreq?: number     // 파동 촘촘함(공간 주파수)
  waveSpeed?: number    // 퍼지는 속도
  waveFalloff?: number  // 발원점에서 멀어질수록 감쇠
  waveCenterX?: number  // 발원점 x (격자 좌표)
  waveCenterY?: number  // 발원점 y
}

// ── 제도별 씬 설정 — 디자인 조정 시 여기만 수정 ──────────────
const SCENE_CONFIG: Record<SceneId, SceneConfig> = {
  // 전과: 자유롭게 부유하는 파티클
  transfer: {
    color:      '#1A6FD0',
    count:      120,
    size:       0.12,
    shape:      'scatter',
    floatAmp:   0.55,
    floatSpeed: 0.5,
  },
  // 모듈형: 격자 틀을 유지한 채 한 지점에서 파장이 퍼져나감(ripple)
  modular: {
    color:       '#38B2AC',
    count:       100,
    size:        0.135,
    shape:       'grid',
    floatAmp:    0.04,   // x·y 미세 부유 — 격자 형태 유지
    floatSpeed:  0.5,
    waveAmp:     1.1,
    waveFreq:    1.4,
    waveSpeed:   1.2,
    waveFalloff: 0.16,
    waveCenterX: -1.8,   // 격자 좌측 상단쯤에서 발원
    waveCenterY: 1.2,
  },
  // 학생설계: 이중나선을 따라 흐르는 파티클
  'self-design': {
    color:       '#ED8936',
    count:       140,
    size:        0.13,
    shape:       'helix',
    floatAmp:    0,
    floatSpeed:  0,
    helixRadius: 2.2,
    helixHeight: 7,
    helixTurns:  3,
    flowSpeed:   0.01,
  },
}

function ParticlesMesh({ sceneId }: { sceneId: SceneId }) {
  const meshRef = useRef<THREE.Points>(null)
  const cfg     = SCENE_CONFIG[sceneId]
  const count   = cfg.count
  const timeRef = useRef(0)

  // base: 기준 좌표 / phases: 축별 부유 위상 / helixU·helixStrand: 나선 파라미터
  const { render, base, phases, helixU, helixStrand, gridDist } = useMemo(() => {
    const base        = new Float32Array(count * 3)
    const phases      = new Float32Array(count * 3)
    const helixU      = new Float32Array(count)
    const helixStrand = new Float32Array(count)
    const gridDist    = new Float32Array(count)

    const wcx = cfg.waveCenterX ?? 0
    const wcy = cfg.waveCenterY ?? 0

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      if (cfg.shape === 'grid') {
        const cols = Math.ceil(Math.sqrt(count))
        const col  = i % cols
        const row  = Math.floor(i / cols)
        base[i3]     = (col / cols - 0.5) * 8
        base[i3 + 1] = (row / cols - 0.5) * 6
        base[i3 + 2] = (Math.random() - 0.5) * 0.6
        // 발원점까지의 평면 거리 — 매 프레임 재계산 대신 미리 저장
        gridDist[i] = Math.hypot(base[i3] - wcx, base[i3 + 1] - wcy)
      } else if (cfg.shape === 'helix') {
        const strand = i % 2
        const u      = i / count
        helixStrand[i] = strand
        helixU[i]      = u
        const angle = u * (cfg.helixTurns ?? 3) * Math.PI * 2 + strand * Math.PI
        const r     = cfg.helixRadius ?? 2.2
        base[i3]     = Math.cos(angle) * r
        base[i3 + 1] = (u - 0.5) * (cfg.helixHeight ?? 7)
        base[i3 + 2] = Math.sin(angle) * r
      } else {
        // scatter
        base[i3]     = (Math.random() - 0.5) * 10
        base[i3 + 1] = (Math.random() - 0.5) * 7
        base[i3 + 2] = (Math.random() - 0.5) * 4
      }

      phases[i3]     = Math.random() * Math.PI * 2
      phases[i3 + 1] = Math.random() * Math.PI * 2
      phases[i3 + 2] = Math.random() * Math.PI * 2
    }

    return { render: base.slice(), base, phases, helixU, helixStrand, gridDist }
  }, [count, cfg])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    timeRef.current += delta
    const t   = timeRef.current
    const pos = meshRef.current.geometry.attributes['position'] as THREE.BufferAttribute
    const arr = pos.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      if (cfg.shape === 'helix') {
        // 시간에 따라 u 가 증가 → 나선을 따라 위로 흐르고 위에 도달하면 아래로 순환
        const strand = helixStrand[i] ?? 0
        const u      = ((helixU[i] ?? 0) + t * (cfg.flowSpeed ?? 0.05)) % 1
        const angle  = u * (cfg.helixTurns ?? 3) * Math.PI * 2 + strand * Math.PI
        const r      = cfg.helixRadius ?? 2.2
        arr[i3]     = Math.cos(angle) * r
        arr[i3 + 1] = (u - 0.5) * (cfg.helixHeight ?? 7)
        arr[i3 + 2] = Math.sin(angle) * r
      } else if (cfg.shape === 'grid') {
        // 격자는 x·y 고정(미세 부유)으로 유지, z 로 파장이 발원점에서 퍼져나감
        const bx = base[i3] ?? 0,  by = base[i3 + 1] ?? 0,  bz = base[i3 + 2] ?? 0
        const px = phases[i3] ?? 0, py = phases[i3 + 1] ?? 0
        const a = cfg.floatAmp, s = cfg.floatSpeed
        // 진행파: sin(거리·주파수 − 시간·속도) → 파면이 바깥으로 이동, 거리에 따라 감쇠
        const d    = gridDist[i] ?? 0
        const wave = Math.sin(d * (cfg.waveFreq ?? 1.4) - t * (cfg.waveSpeed ?? 2.2))
          * (cfg.waveAmp ?? 1) * Math.exp(-d * (cfg.waveFalloff ?? 0.16))
        arr[i3]     = bx + Math.sin(t * s + px) * a
        arr[i3 + 1] = by + Math.sin(t * s + py) * a
        arr[i3 + 2] = bz + wave
      } else {
        // scatter — 3축 자유 부유
        const bx = base[i3] ?? 0,  by = base[i3 + 1] ?? 0,  bz = base[i3 + 2] ?? 0
        const px = phases[i3] ?? 0, py = phases[i3 + 1] ?? 0, pz = phases[i3 + 2] ?? 0
        const a = cfg.floatAmp, s = cfg.floatSpeed
        arr[i3]     = bx + Math.sin(t * s * 0.8 + px) * a
        arr[i3 + 1] = by + Math.sin(t * s + py)       * a * 1.3
        arr[i3 + 2] = bz + Math.cos(t * s * 0.9 + pz) * a
      }
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[render, 3]}
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
