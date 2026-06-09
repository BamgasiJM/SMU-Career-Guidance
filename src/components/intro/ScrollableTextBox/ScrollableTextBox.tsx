import { useRef } from 'react'
import styles from './ScrollableTextBox.module.css'

interface ScrollableTextBoxProps {
  /** 표시할 텍스트 (줄바꿈은 \n 으로 구분) */
  text: string
  /** 박스 높이 (기본: 260px) */
  height?: string
}

export default function ScrollableTextBox({
  text,
  height = '260px',
}: ScrollableTextBoxProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const paragraphs = text
    .split('\n\n')
    .map(p => p.trim())
    .filter(Boolean)

  return (
    <div className={styles.outer} style={{ '--box-height': height } as React.CSSProperties}>
      {/* 위 아래 fade 마스크 */}
      <div className={styles.fadeTop}    aria-hidden="true" />
      <div className={styles.fadeBottom} aria-hidden="true" />

      <div ref={scrollRef} className={styles.scroll}>
        <div className={styles.inner}>
          {paragraphs.map((para, i) => (
            <p key={i} className={styles.para}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
