import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROGRAMS } from '@/data/programs'
import styles from './ProgramCardGrid.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function ProgramCardGrid() {
  const gridRef  = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

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
        <div
          key={prog.id}
          ref={el => { cardRefs.current[i] = el }}
          className={styles.card}
          style={{ '--accent': `var(${prog.accentVar})` } as React.CSSProperties}
        >
          <span className={styles.cardAccent} aria-hidden="true" />
          <span className={styles.cardTitle}>{prog.title}</span>
          <span className={styles.cardSub}>{prog.subtitle}</span>
        </div>
      ))}
    </div>
  )
}
