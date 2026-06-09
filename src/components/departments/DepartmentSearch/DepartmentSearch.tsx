import styles from './DepartmentSearch.module.css'

interface DepartmentSearchProps {
  value: string
  onChange: (value: string) => void
  resultCount: number
}

export default function DepartmentSearch({
  value,
  onChange,
  resultCount,
}: DepartmentSearchProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrap}>
        <span className={styles.icon} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
            <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        <input
          type="search"
          className={styles.input}
          placeholder="학과명으로 검색"
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-label="학과 검색"
        />
        {value && (
          <button
            className={styles.clear}
            onClick={() => onChange('')}
            aria-label="검색어 지우기"
          >
            ✕
          </button>
        )}
      </div>
      {value && (
        <p className={styles.count}>
          <strong>{resultCount}</strong>개 학과
        </p>
      )}
    </div>
  )
}
