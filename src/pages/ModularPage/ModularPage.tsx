import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ModularPage.module.css'

gsap.registerPlugin(ScrollTrigger)

// 현재 개설 과정 데이터 — 추후 실제 데이터로 교체
const COURSES = [
  {
    id: 'smart-health',
    name: '스마트 헬스케어 트랙',
    departments: ['보건행정학과', '컴퓨터학과', '전기전자공학과'],
    desc: '디지털 헬스케어 분야 전문가 양성을 위한 융합 과정입니다.',
  },
  {
    id: 'culture-content',
    name: '문화콘텐츠 기획 트랙',
    departments: ['미디어콘텐츠학과', '경영학과', '디자인학과'],
    desc: '콘텐츠 기획·제작·비즈니스를 아우르는 실무 중심 과정입니다.',
  },
  {
    id: 'green-tech',
    name: '그린테크 환경 트랙',
    departments: ['환경공학과', '화학과', '토목공학과'],
    desc: '탄소중립·환경 기술 분야의 전문 인재 양성 과정입니다.',
  },
]

export default function ModularPage() {
  const navigate = useNavigate()
  const pageRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!pageRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('[data-animate]', {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: pageRef.current, start: 'top 80%' },
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <main ref={pageRef} className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header} data-animate>
          <button className={styles.back} onClick={() => navigate(-1)}>← 뒤로</button>
          <p className={styles.eyebrow}>진로설계 제도</p>
          <h1 className={styles.title}>모듈형 교육과정</h1>
          <p className={styles.sub}>
            교수진이 설계한 융합 트랙으로 깊이 있는 전문 역량을 키울 수 있습니다.
          </p>
        </header>

        <section className={styles.section} data-animate>
          <h2 className={styles.sectionTitle}>제도 특징</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>🧩</span>
              <strong>융합 설계</strong>
              <p>여러 전공의 핵심 과목을 교수진이 체계적으로 조합합니다.</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>📜</span>
              <strong>학위 취득</strong>
              <p>과정을 이수하면 관련 분야 학위를 취득할 수 있습니다.</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>🏫</span>
              <strong>전문 지도</strong>
              <p>담당 교수의 체계적 지도 아래 심화 학습이 가능합니다.</p>
            </div>
          </div>
        </section>

        <section className={styles.section} data-animate>
          <h2 className={styles.sectionTitle}>현재 개설 과정</h2>
          <p className={styles.sectionDesc}>아래 과정은 예시이며, 실제 개설 과정은 학교 공지를 확인하세요.</p>
          <div className={styles.courseList}>
            {COURSES.map(course => (
              <div key={course.id} className={styles.courseCard}>
                <div className={styles.courseHeader}>
                  <strong className={styles.courseName}>{course.name}</strong>
                  <div className={styles.deptTags}>
                    {course.departments.map(d => (
                      <span key={d} className={styles.deptTag}>{d}</span>
                    ))}
                  </div>
                </div>
                <p className={styles.courseDesc}>{course.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className={styles.actions} data-animate>
          <button className={styles.btnPrimary} onClick={() => navigate('/departments')}>
            학과 전공 살펴보기 →
          </button>
        </div>
      </div>
    </main>
  )
}
