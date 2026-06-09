import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './SplitTextTitle.module.css'

gsap.registerPlugin(ScrollTrigger)

interface SplitTextTitleProps {
  text: string
  /** accent 색상 CSS 변수명. 예: '--color-accent-transfer' */
  accentVar: string
  /** 트리거 시작 위치 (기본: 'top 75%') */
  triggerStart?: string
}

export default function SplitTextTitle({
  text,
  accentVar,
  triggerStart = 'top 75%',
}: SplitTextTitleProps) {
  const wrapRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!wrapRef.current) return

    // 한 글자씩 span 분리
    const chars = text.split('').map(ch => {
      const span = document.createElement('span')
      span.className = styles.char
      span.textContent = ch === ' ' ? '\u00A0' : ch
      return span
    })

    wrapRef.current.innerHTML = ''
    chars.forEach(c => wrapRef.current!.appendChild(c))

    const ctx = gsap.context(() => {
      gsap.from(chars, {
        y: '110%',
        opacity: 0,
        duration: 0.65,
        stagger: 0.04,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: triggerStart,
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [text, triggerStart])

  return (
    <h2
      ref={wrapRef}
      className={styles.title}
      style={{ '--accent': `var(${accentVar})` } as React.CSSProperties}
    >
      {text}
    </h2>
  )
}
