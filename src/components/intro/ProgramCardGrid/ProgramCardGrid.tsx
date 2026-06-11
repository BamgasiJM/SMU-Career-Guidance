import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROGRAMS } from '@/data/programs'
import styles from './ProgramCardGrid.module.css'

gsap.registerPlugin(ScrollTrigger)

/** 해당 제도 섹션(대표 카드)의 위치로 부드럽게 스크롤 — 고정 네비 높이만큼 보정 */
function scrollToProgram(programId: string) {
  const target = document.getElementById(`program-${programId}`)
  if (!target) return
  const navH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--navbar-h'),
    10,
  ) || 64
  const top = target.getBoundingClientRect().top + window.scrollY - navH
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function ProgramCardGrid() {
  const gridRef  = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    if (!gridRef.current) return
    const ctx = gsap.context(() => {
      gsap.from(cardRefs.current.filter(Boolean), {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      })
    }, gridRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={gridRef} className={styles.grid}>
      {PROGRAMS.map((prog, i) => (
        <button
          key={prog.id}
          type="button"
          ref={el => { cardRefs.current[i] = el }}
          className={styles.card}
          style={{ '--accent': `var(${prog.accentVar})` } as React.CSSProperties}
          onClick={() => scrollToProgram(prog.id)}
          aria-label={`${prog.title} 제도 살펴보기`}
        >
          <span className={styles.cardAccent} aria-hidden="true" />
          <span className={styles.cardTitle}>{prog.title}</span>
          <span className={styles.cardSub}>{prog.subtitle}</span>
        </button>
      ))}
    </div>
  )
}
