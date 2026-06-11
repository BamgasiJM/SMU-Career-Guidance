import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MODULE_COURSES } from '@/data/moduleCourses'
import styles from './ModularPage.module.css'

gsap.registerPlugin(ScrollTrigger)

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
          <button className={styles.back} onClick={() => navigate(-1)}>←</button>
          <p className={styles.eyebrow}>Career Guidance</p>
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
          <p className={styles.sectionDesc}>개설된 모듈 과정을 아래에서 확인하세요.</p>
          <div className={styles.courseList}>
            {MODULE_COURSES.map(course => (
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
                <div className={styles.subjectGroup}>
                  <span className={styles.subjectLabel}>구성 과목</span>
                  <div className={styles.subjectTags}>
                    {course.subjects.map(s => (
                      <span key={s} className={styles.subjectTag}>{s}</span>
                    ))}
                  </div>
                </div>
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
