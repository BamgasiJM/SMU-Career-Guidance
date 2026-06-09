import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './CreditCalc.module.css'

interface CreditCalcProps {
  onClose: () => void
}

interface CalcResult {
  totalRequired: number
  remaining: number
  message: string
}

// ── 졸업 기준 상수 — 학교 규정에 따라 수정 ──
const GRADUATION_CREDITS = 130
const MAJOR_REQUIRED     = 60
const GENERAL_REQUIRED   = 30

export default function CreditCalc({ onClose }: CreditCalcProps) {
  const [earned,   setEarned]   = useState('')
  const [major,    setMajor]    = useState('')
  const [general,  setGeneral]  = useState('')
  const [result,   setResult]   = useState<CalcResult | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef   = useRef<HTMLDivElement>(null)

  // 등장 애니메이션
  // gsap.set 으로 초기 상태를 먼저 확정한 뒤 to() 로 전환
  // from() 은 GSAP가 초기값을 인라인 스타일로 즉시 주입하기 때문에
  // 마운트 직후 요소가 invisible 상태가 되는 문제가 생김
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

  const calculate = () => {
    const e = Number(earned)  || 0
    const m = Number(major)   || 0
    const g = Number(general) || 0

    const remainTotal   = Math.max(GRADUATION_CREDITS - e, 0)
    const remainMajor   = Math.max(MAJOR_REQUIRED - m, 0)
    const remainGeneral = Math.max(GENERAL_REQUIRED - g, 0)

    let message = ''
    if (remainTotal === 0) {
      message = '졸업 요건을 충족했습니다! 🎓'
    } else {
      const parts: string[] = []
      if (remainMajor   > 0) parts.push(`전공 ${remainMajor}학점`)
      if (remainGeneral > 0) parts.push(`교양 ${remainGeneral}학점`)
      const extra = remainTotal - remainMajor - remainGeneral
      if (extra > 0)         parts.push(`기타 ${extra}학점`)
      message = parts.join(', ') + ' 추가 이수 필요'
    }

    setResult({
      totalRequired: GRADUATION_CREDITS,
      remaining:     remainTotal,
      message,
    })
  }

  // ESC 키로 닫기
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

        <p className={styles.desc}>
          현재까지 이수한 학점을 입력하면 졸업까지 남은 학점을 계산합니다.
          <br />
          <span className={styles.note}>
            기준: 총 {GRADUATION_CREDITS}학점 / 전공 {MAJOR_REQUIRED}학점 / 교양 {GENERAL_REQUIRED}학점
          </span>
        </p>

        <div className={styles.fields}>
          <label className={styles.field}>
            <span className={styles.label}>총 이수 학점</span>
            <input
              type="number"
              className={styles.input}
              value={earned}
              onChange={e => setEarned(e.target.value)}
              min={0}
              max={200}
              placeholder="예) 72"
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>전공 이수 학점</span>
            <input
              type="number"
              className={styles.input}
              value={major}
              onChange={e => setMajor(e.target.value)}
              min={0}
              max={100}
              placeholder="예) 36"
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>교양 이수 학점</span>
            <input
              type="number"
              className={styles.input}
              value={general}
              onChange={e => setGeneral(e.target.value)}
              min={0}
              max={60}
              placeholder="예) 18"
            />
          </label>
        </div>

        <button className={styles.calcBtn} onClick={calculate}>
          계산하기
        </button>

        {result && (
          <div className={styles.result}>
            <div className={styles.resultBar}>
              <div
                className={styles.resultFill}
                style={{
                  width: `${Math.min(((GRADUATION_CREDITS - result.remaining) / GRADUATION_CREDITS) * 100, 100)}%`,
                }}
              />
            </div>
            <p className={styles.resultText}>
              <strong>{GRADUATION_CREDITS - result.remaining}</strong> / {GRADUATION_CREDITS} 학점
            </p>
            <p className={styles.resultMsg}>{result.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}
