import styles from './ScrollDownIndicator.module.css'

interface ScrollDownIndicatorProps {
  /** 스크롤 타깃 섹션의 id */
  targetId?: string
}

export default function ScrollDownIndicator({ targetId }: ScrollDownIndicatorProps) {
  const handleClick = () => {
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
    }
  }

  return (
    <button
      className={styles.indicator}
      onClick={handleClick}
      aria-label="아래로 스크롤"
    >
      <span className={styles.label}>scroll</span>
      <span className={styles.arrow} aria-hidden="true">
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
          <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="1.5" />
          <polyline
            points="4,14 10,22 16,14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  )
}
