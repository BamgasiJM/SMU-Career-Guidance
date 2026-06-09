import { useNavigate } from 'react-router'
import type { ProgramButton } from '@/types/program'
import styles from './ProgramButtons.module.css'

interface ProgramButtonsProps {
  buttons: ProgramButton[]
  /** accent 색상 CSS 변수명 */
  accentVar: string
}

/**
 * 버튼 추가·삭제·수정은 src/data/programs.ts 의 buttons 배열만 편집합니다.
 * 이 컴포넌트는 데이터를 그대로 렌더링합니다.
 */
export default function ProgramButtons({ buttons, accentVar }: ProgramButtonsProps) {
  const navigate = useNavigate()

  const handleClick = (btn: ProgramButton) => {
    if (btn.external) {
      window.open(btn.href, '_blank', 'noopener,noreferrer')
    } else {
      navigate(btn.href)
    }
  }

  return (
    <div
      className={styles.group}
      style={{ '--accent': `var(${accentVar})` } as React.CSSProperties}
    >
      {buttons.map((btn, i) => (
        <button
          key={i}
          className={
            btn.variant === 'outline' ? styles.outline : styles.primary
          }
          onClick={() => handleClick(btn)}
        >
          {btn.label}
          <span className={styles.arrow} aria-hidden="true">→</span>
        </button>
      ))}
    </div>
  )
}
