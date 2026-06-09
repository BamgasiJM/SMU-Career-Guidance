import { useParams, useNavigate } from 'react-router'
import { DEPARTMENTS } from '@/data/departments'
import PdfViewer from '@/components/departments/PdfViewer/PdfViewer'
import styles from './DepartmentDetailPage.module.css'

export default function DepartmentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dept = DEPARTMENTS.find(d => d.id === id)

  if (!dept) {
    return (
      <main className={styles.page}>
        <div className={styles.notFound}>
          <p>학과를 찾을 수 없습니다.</p>
          <button className={styles.backBtn} onClick={() => navigate('/departments')}>
            목록으로 돌아가기
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* ── 브레드크럼 ── */}
        <nav className={styles.breadcrumb} aria-label="breadcrumb">
          <button onClick={() => navigate('/departments')} className={styles.crumb}>
            학과 안내
          </button>
          <span className={styles.sep} aria-hidden="true">/</span>
          <span className={styles.crumbCurrent}>{dept.college}</span>
          <span className={styles.sep} aria-hidden="true">/</span>
          <span className={styles.crumbCurrent}>{dept.name}</span>
        </nav>

        {/* ── 헤더 ── */}
        <header className={styles.header}>
          <p className={styles.college}>{dept.college}</p>
          <h1 className={styles.name}>{dept.name}</h1>
        </header>

        {/* ── PDF 뷰어 ── */}
        <section className={styles.pdfSection} aria-label="학과 안내 PDF">
          <PdfViewer driveUrl={dept.driveUrl} title={`${dept.name} 안내`} />
        </section>
      </div>
    </main>
  )
}
