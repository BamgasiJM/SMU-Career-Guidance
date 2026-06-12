import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CreditCalc from '@/components/common/CreditCalc/CreditCalc'
import { SELF_DESIGN_EXAMPLES } from '@/data/selfDesignExamples'
import styles from './SelfDesignPage.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function SelfDesignPage() {
  const [showCalc, setShowCalc] = useState(false)
  const navigate = useNavigate()
  const pageRef = useRef<HTMLElement>(null)

  // hash 로 계산기 자동 열기
  useEffect(() => {
    if (window.location.hash === '#calculator') setShowCalc(true)
  }, [])

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
    <>
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
          <p className={styles.sectionDesc}>아래의 전공 이름, 전공 학위, 전공의 목표와 전공 수업명 일부를 확인해보세요. 여러분도 원하는 학과를 설계하여 공부할 수 있습니다.</p>
          <div className={styles.exampleList}>
            {SELF_DESIGN_EXAMPLES.map(ex => (
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
          <button className={styles.btnOutline} onClick={() => setShowCalc(true)}>
            졸업 학점 계산기
          </button>
        </div>
      </div>
    </main>

    {showCalc && <CreditCalc onClose={() => setShowCalc(false)} />}
    </>
  )
}
