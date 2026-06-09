import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { DEPARTMENTS } from '@/data/departments'
import DepartmentSearch from '@/components/departments/DepartmentSearch/DepartmentSearch'
import DepartmentCard from '@/components/departments/DepartmentCard/DepartmentCard'
import styles from './DepartmentsPage.module.css'

const COLLEGE_ORDER = [
  '인문예술대학',
  '사회과학대학',
  'IT엔지니어링대학',
  '보건바이오대학',
  '한의과대학',
  '교양대학',
  '성인학습자전담학과',
]

export default function DepartmentsPage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return DEPARTMENTS
    return DEPARTMENTS.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.college.toLowerCase().includes(q) ||
      d.keywords?.some(k => k.toLowerCase().includes(q))
    )
  }, [query])

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>()
    COLLEGE_ORDER.forEach(c => map.set(c, []))
    filtered.forEach(d => {
      if (!map.has(d.college)) map.set(d.college, [])
      map.get(d.college)!.push(d)
    })
    return Array.from(map.entries()).filter(([, list]) => list.length > 0)
  }, [filtered])

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate(-1)}>← 뒤로</button>
        <h1 className={styles.title}>학과 전공 안내</h1>
        <p className={styles.sub}>학과를 선택하면 상세 안내 PDF를 확인할 수 있습니다.</p>
      </header>

      <div className={styles.container}>
        <DepartmentSearch
          value={query}
          onChange={setQuery}
          resultCount={filtered.length}
        />

        {grouped.length === 0 ? (
          <div className={styles.empty}>
            <p>'{query}' 에 해당하는 학과가 없습니다.</p>
          </div>
        ) : (
          <div className={styles.groups}>
            {grouped.map(([college, list]) => (
              <section key={college} className={styles.group}>
                <h2 className={styles.groupTitle}>{college}</h2>
                <div className={styles.grid}>
                  {list.map((dept) => (
                    <DepartmentCard
                      key={dept.id}
                      department={dept}
                      onClick={() => navigate(`/departments/${dept.id}`)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
