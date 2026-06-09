import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './SelfDesignPage.module.css'

gsap.registerPlugin(ScrollTrigger)

// 학생 설계 예시 — 추후 실제 사례로 교체
const EXAMPLES = [
  {
    id: 'ex1',
    name: '데이터 저널리즘 전공',
    student: '미디어콘텐츠학과 3학년',
    courses: ['데이터 분석 입문', '미디어 글쓰기', '통계학 개론', '디지털 저널리즘'],
    goal: '데이터를 기반으로 스토리를 전달하는 저널리스트가 되기 위한 설계.',
  },
  {
    id: 'ex2',
    name: '소셜벤처 경영 전공',
    student: '경영학과 2학년',
    courses: ['사회적경제론', '창업론', '사회복지개론', '마케팅 원론'],
    goal: '사회문제를 비즈니스로 해결하는 소셜벤처 창업가를 목표로 한 설계.',
  },
]

export default function SelfDesignPage() {
  const navigate = useNavigate()
  const pageRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!pageRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('[data-animate]', {
        y: 28, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
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
          <h1 className={styles.title}>학생설계전공</h1>
          <p className={styles.sub}>
            학생 스스로 원하는 전문가 상을 정하고 그에 맞는 교과목을 직접 설계합니다.
          </p>
        </header>

        <section className={styles.section} data-animate>
          <h2 className={styles.sectionTitle}>어떻게 설계하나요?</h2>
          <ol className={styles.stepList}>
            {[
              { step: '01', text: '원하는 전문가 상(목표)을 구체적으로 설정합니다.' },
              { step: '02', text: '목표에 필요한 역량을 분석하고 관련 교과목을 탐색합니다.' },
              { step: '03', text: '지도교수와 상담하여 커리큘럼 초안을 수정·완성합니다.' },
              { step: '04', text: '학사팀에 학생설계전공 신청서를 제출하여 승인받습니다.' },
              { step: '05', text: '승인된 교과목을 이수하고 졸업 시 해당 전공명으로 학위를 취득합니다.' },
            ].map(({ step, text }) => (
              <li key={step} className={styles.stepItem}>
                <span className={styles.stepNum}>{step}</span>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} data-animate>
          <h2 className={styles.sectionTitle}>학생 설계 예시</h2>
          <p className={styles.sectionDesc}>실제 학생들의 설계 사례를 참고하세요. (아래는 예시입니다)</p>
          <div className={styles.exampleList}>
            {EXAMPLES.map(ex => (
              <div key={ex.id} className={styles.exampleCard}>
                <div className={styles.exHeader}>
                  <strong className={styles.exName}>{ex.name}</strong>
                  <span className={styles.exStudent}>{ex.student}</span>
                </div>
                <p className={styles.exGoal}>{ex.goal}</p>
                <div className={styles.exCourses}>
                  {ex.courses.map(c => (
                    <span key={c} className={styles.courseTag}>{c}</span>
                  ))}
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
