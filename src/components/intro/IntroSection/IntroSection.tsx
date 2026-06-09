import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LottiePlayer from '@/components/common/LottiePlayer/LottiePlayer'
import ScrollableTextBox from '@/components/intro/ScrollableTextBox/ScrollableTextBox'
import ProgramCardGrid from '@/components/intro/ProgramCardGrid/ProgramCardGrid'
import styles from './IntroSection.module.css'

gsap.registerPlugin(ScrollTrigger)

const GREETING_TEXT = `세명대학교 교육혁신·학생성공본부 전공·진로설계센터는 학생들이 자신의 적성과 역량에 맞는 전공을 선택하고, 나아가 미래를 향한 진로를 주도적으로 설계할 수 있도록 지원하기 위해 설립되었습니다. 우리 센터는 전공 선택과 전과, 다전공 및 자기설계전공 등 학사 유연화 제도를 활용하고자 하는 학생들에게 체계적인 탐색 기회와 맞춤형 지도를 제공하고 있습니다.

오늘날 급변하는 사회에서 학생들이 자신의 강점을 발견하고 미래를 능동적으로 개척해 나가기 위해서는 입학 초기부터 졸업 이후까지 이어지는 일관된 진로 설계 지원이 무엇보다 중요합니다. 이에 우리 센터는 전공·진로설계 프로그램 기획 및 운영, 교수·학생위원과의 연계를 통한 다각도의 맞춤형 지도, 그리고 전공 및 진로 탐색 경험 확대를 통해 학생 개개인의 성장을 적극적으로 뒷받침하고 있습니다.

전공·진로설계센터는 학생들이 스스로의 가능성을 믿고 도전·성장·자립하는 CHARM 인재로 나아갈 수 있도록 든든한 동반자가 되겠습니다. 전공과 진로에 대한 고민이 있다면 언제든지 편하게 찾아주시기 바랍니다.`

export default function IntroSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const titleRef    = useRef<HTMLHeadingElement>(null)
  const textBoxRef  = useRef<HTMLDivElement>(null)
  const lottieRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      // 타이틀 등장
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        },
      })
      // 텍스트 박스 등장
      gsap.from(textBoxRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textBoxRef.current,
          start: 'top 85%',
        },
      })
      // 캐릭터 등장
      gsap.from(lottieRef.current, {
        scale: 0.88,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: lottieRef.current,
          start: 'top 85%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="intro" className={styles.section}>
      <div className={styles.container}>
        {/* ── 인사말 헤더 ── */}
        <header className={styles.header}>
          <p className={styles.eyebrow}>전공·진로설계센터</p>
          <h2 ref={titleRef} className={styles.title}>인사말</h2>
        </header>

        {/* ── 스크롤 텍스트 박스 ── */}
        <div ref={textBoxRef}>
          <ScrollableTextBox text={GREETING_TEXT} height="280px" />
        </div>

        {/* ── 캐릭터 Lottie ── */}
        <div ref={lottieRef} className={styles.character}>
          <LottiePlayer
            src="/assets/lottie/intro-character.json"
            loop
            autoplay
            className={styles.lottieAnim}
          />
        </div>

        {/* ── 세 제도 카드 ── */}
        <div className={styles.cardsWrapper}>
          <p className={styles.cardsLabel}>다양한 방법으로 여러분의 진로를 디자인해보세요.</p>
          <ProgramCardGrid />
        </div>
      </div>
    </section>
  )
}
