import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Program } from '@/types/program'
import SplitTextTitle from '@/components/programs/SplitTextTitle/SplitTextTitle'
import ProgramR3FScene from '@/components/programs/ProgramR3FScene/ProgramR3FScene'
import ProgramButtons from '@/components/programs/ProgramButtons/ProgramButtons'
import styles from './ProgramSection.module.css'

gsap.registerPlugin(ScrollTrigger)

interface ProgramSectionProps {
  program: Program
}

export default function ProgramSection({ program }: ProgramSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const rightRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      // 오른쪽 텍스트/버튼 등장
      gsap.from(rightRef.current, {
        x: 32,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id={`program-${program.id}`}
      className={styles.section}
      style={{ '--accent': `var(${program.accentVar})` } as React.CSSProperties}
    >
      {/* R3F 배경 */}
      <ProgramR3FScene programId={program.id as 'transfer' | 'modular' | 'self-design'} />

      {/* accent 그라디언트 오버레이 */}
      <div className={styles.gradientOverlay} aria-hidden="true" />

      <div className={styles.inner}>
        {/* 왼쪽: SplitText 제목 */}
        <div className={styles.left}>
          <SplitTextTitle
            text={program.title}
            accentVar={program.accentVar}
          />
          <p className={styles.subtitle}>{program.subtitle}</p>
        </div>

        {/* 오른쪽: 설명 + 버튼 */}
        <div ref={rightRef} className={styles.right}>
          <p className={styles.description}>{program.description}</p>
          <ProgramButtons
            buttons={program.buttons}
            accentVar={program.accentVar}
          />
        </div>
      </div>
    </section>
  )
}
