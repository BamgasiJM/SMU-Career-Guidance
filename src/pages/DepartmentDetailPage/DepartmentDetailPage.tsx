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
        {/* ── 뒤로 가기 ── */}
        <button className={styles.back} onClick={() => navigate(-1)} aria-label="뒤로 가기">←</button>

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
