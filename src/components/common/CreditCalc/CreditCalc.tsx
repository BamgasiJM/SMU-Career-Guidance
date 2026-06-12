import { useMemo, useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import styles from './CreditCalc.module.css'

interface CreditCalcProps {
  onClose: () => void
}

// ── 졸업 기준 상수 — 학교 규정에 따라 수정 ──
const DEFAULT_GRADUATION = {
  totalCredits:    130,
  majorRequired:    60,
  majorElective:     0,
  generalRequired:  30,
  generalElective:   0,
}

type CategoryKey = 'majorRequired' | 'majorElective' | 'generalRequired' | 'generalElective' | 'free'

interface CategoryConfig {
  key:      CategoryKey
  label:    string
  required: number
}

type Inputs = Record<CategoryKey, string>

const EMPTY_INPUTS: Inputs = {
  majorRequired:   '',
  majorElective:   '',
  generalRequired: '',
  generalElective: '',
  free:            '',
}

const FREE_REQUIRED = Math.max(
  0,
  DEFAULT_GRADUATION.totalCredits -
    DEFAULT_GRADUATION.majorRequired -
    DEFAULT_GRADUATION.majorElective -
    DEFAULT_GRADUATION.generalRequired -
    DEFAULT_GRADUATION.generalElective,
)

const CATEGORIES: CategoryConfig[] = [
  { key: 'majorRequired',   label: '전공필수', required: DEFAULT_GRADUATION.majorRequired },
  { key: 'majorElective',   label: '전공선택', required: DEFAULT_GRADUATION.majorElective },
  { key: 'generalRequired', label: '기초교양', required: DEFAULT_GRADUATION.generalRequired },
  { key: 'generalElective', label: '경험교양', required: DEFAULT_GRADUATION.generalElective },
  { key: 'free',            label: '일반선택', required: FREE_REQUIRED },
]

function toNumber(value: string): number {
  if (value.trim() === '') return 0
  const n = Number(value)
  if (Number.isNaN(n) || n < 0) return 0
  return n
}

export default function CreditCalc({ onClose }: CreditCalcProps) {
  const [inputs, setInputs] = useState<Inputs>(EMPTY_INPUTS)
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef   = useRef<HTMLDivElement>(null)

  const earnedByKey = useMemo<Record<CategoryKey, number>>(() => ({
    majorRequired:   toNumber(inputs.majorRequired),
    majorElective:   toNumber(inputs.majorElective),
    generalRequired: toNumber(inputs.generalRequired),
    generalElective: toNumber(inputs.generalElective),
    free:            toNumber(inputs.free),
  }), [inputs])

  const totalEarned =
    earnedByKey.majorRequired + earnedByKey.majorElective +
    earnedByKey.generalRequired + earnedByKey.generalElective + earnedByKey.free

  const totalRemaining = Math.max(0, DEFAULT_GRADUATION.totalCredits - totalEarned)
  const progress = Math.min(100, Math.round((totalEarned / DEFAULT_GRADUATION.totalCredits) * 100))
  const isComplete = totalEarned >= DEFAULT_GRADUATION.totalCredits

  const handleChange = (key: CategoryKey, value: string) => {
    if (value === '' || /^\d{0,3}$/.test(value)) {
      setInputs((prev) => ({ ...prev, [key]: value }))
    }
  }

  const handleReset = () => setInputs(EMPTY_INPUTS)

  // 등장 애니메이션 — gsap.set() + to() 패턴 (from() 버그 방지)
  useEffect(() => {
    if (!overlayRef.current || !modalRef.current) return
    gsap.set(overlayRef.current, { opacity: 0 })
    gsap.set(modalRef.current,   { y: 32, opacity: 0 })
    const tl = gsap.timeline()
    tl.to(overlayRef.current, { opacity: 1, duration: 0.25 })
      .to(modalRef.current,   { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }, '-=0.1')
  }, [])

  const handleClose = () => {
    if (!overlayRef.current || !modalRef.current) { onClose(); return }
    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(modalRef.current,   { y: 24, opacity: 0, duration: 0.3, ease: 'power2.in' })
      .to(overlayRef.current, { opacity: 0, duration: 0.2 }, '-=0.1')
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div ref={overlayRef} className={styles.overlay} onClick={handleClose}>
      <div
        ref={modalRef}
        className={styles.modal}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="calc-title"
      >
        <div className={styles.header}>
          <h2 id="calc-title" className={styles.title}>졸업 학점 계산기</h2>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="닫기">✕</button>
        </div>

        <div className={styles.intro}>
          <p className={styles.introText}>
            현재까지 이수한 학점을 카테고리별로 입력하면 졸업까지 남은 학점이 자동으로 계산됩니다.
          </p>
          <button type="button" className={styles.resetBtn} onClick={handleReset}>
            초기화
          </button>
        </div>

        <div className={styles.summary}>
          <div className={styles.summaryLabel}>졸업까지 남은 학점</div>
          <div className={styles.summaryNumbers}>
            <span className={styles.remaining}>{totalRemaining}</span>
            <span className={styles.remainingUnit}>학점</span>
          </div>
          <div className={styles.summaryMeta}>
            현재 {totalEarned}학점 / 졸업기준 {DEFAULT_GRADUATION.totalCredits}학점
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
              aria-hidden="true"
            />
          </div>
          <div className={styles.progressText}>
            {isComplete ? '졸업 기준 학점을 모두 충족했습니다.' : `진행률 ${progress}%`}
          </div>
        </div>

        <div className={styles.table}>
          <div className={`${styles.row} ${styles.headRow}`}>
            <span>카테고리</span>
            <span className={styles.colInput}>이수 학점</span>
            <span className={styles.colRequired}>필요</span>
            <span className={styles.colShort}>부족</span>
          </div>
          {CATEGORIES.map((cat) => {
            const earned = earnedByKey[cat.key]
            const short  = Math.max(0, cat.required - earned)
            const met    = earned >= cat.required && cat.required > 0
            return (
              <label key={cat.key} className={styles.row}>
                <span className={styles.catLabel}>{cat.label}</span>
                <span className={styles.colInput}>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className={styles.input}
                    value={inputs[cat.key]}
                    onChange={(e) => handleChange(cat.key, e.target.value)}
                    onFocus={(e) => e.target.select()}
                    placeholder="0"
                    aria-label={`${cat.label} 이수 학점`}
                  />
                </span>
                <span className={styles.colRequired}>{cat.required}</span>
                <span className={`${styles.colShort} ${met ? styles.met : ''}`}>
                  {met ? '충족' : short}
                </span>
              </label>
            )
          })}
        </div>

        <p className={styles.note}>
          ※ 전과시 새로운 학과의 전공필수로 인정받지 못하는 수업은 일반선택으로 인정됩니다.
        </p>
      </div>
    </div>
  )
}
