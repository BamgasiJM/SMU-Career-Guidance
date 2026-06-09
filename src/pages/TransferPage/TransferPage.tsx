import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CreditCalc from '@/components/common/CreditCalc/CreditCalc'
import styles from './TransferPage.module.css'

gsap.registerPlugin(ScrollTrigger)

const INELIGIBLE_EXAMPLES = [
  '의예과', '한의예과', '치의예과', '약학과', '간호학과 (일부 조건)',
]

const CREDIT_RULES = [
  { label: '인정되는 경우', desc: '새 전공의 교육과정과 동일하거나 유사한 교과목으로 인정받을 수 있습니다.', positive: true },
  { label: '인정되지 않는 경우', desc: '기존 전공에만 해당하는 전공 필수 과목은 새 전공 학점으로 인정되지 않을 수 있습니다.', positive: false },
]

export default function TransferPage() {
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
    <>
      <main ref={pageRef} className={styles.page}>
        <div className={styles.container}>
          {/* 헤더 */}
          <header className={styles.header} data-animate>
            <button className={styles.back} onClick={() => navigate(-1)}>← 뒤로</button>
            <p className={styles.eyebrow}>진로설계 제도</p>
            <h1 className={styles.title}>전과 제도</h1>
            <p className={styles.sub}>재학 중 언제든지 원하는 전공으로 변경할 수 있습니다.</p>
          </header>

          {/* 핵심 안내 카드 */}
          <section className={styles.section} data-animate>
            <h2 className={styles.sectionTitle}>핵심 안내</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <span className={styles.infoIcon}>🔄</span>
                <strong>횟수 제한 없음</strong>
                <p>전과 횟수에 제한이 없습니다. 자신에게 맞는 전공을 찾을 때까지 탐색할 수 있습니다.</p>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoIcon}>📋</span>
                <strong>신청 시기</strong>
                <p>매 학기 지정된 기간 내에 신청하며, 학과 정원 및 성적 기준이 적용될 수 있습니다.</p>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoIcon}>🎓</span>
                <strong>졸업 요건</strong>
                <p>전과 후에는 새 전공의 교육과정을 기준으로 졸업 요건이 적용됩니다.</p>
              </div>
            </div>
          </section>

          {/* 학점 인정 여부 */}
          <section className={styles.section} data-animate>
            <h2 className={styles.sectionTitle}>기존 학점 인정 여부</h2>
            <div className={styles.ruleList}>
              {CREDIT_RULES.map(rule => (
                <div
                  key={rule.label}
                  className={[styles.ruleCard, rule.positive ? styles.positive : styles.negative].join(' ')}
                >
                  <strong>{rule.label}</strong>
                  <p>{rule.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 전과 불가 전공 */}
          <section className={styles.section} data-animate>
            <h2 className={styles.sectionTitle}>전과 제한 전공 예시</h2>
            <p className={styles.sectionDesc}>아래 전공은 정원 또는 학칙에 따라 전과가 제한될 수 있습니다. 반드시 학생처에 문의하세요.</p>
            <ul className={styles.tagList}>
              {INELIGIBLE_EXAMPLES.map(name => (
                <li key={name} className={styles.tag}>{name}</li>
              ))}
            </ul>
          </section>

          {/* CTA 버튼 */}
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
