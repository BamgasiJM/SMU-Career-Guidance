import HeroSection from '@/components/landing/HeroSection/HeroSection'
import IntroSection from '@/components/intro/IntroSection/IntroSection'
import ProgramSection from '@/components/programs/ProgramSection/ProgramSection'
import { PROGRAMS } from '@/data/programs'
import styles from './LandingPage.module.css'

/**
 * 랜딩 페이지 — 전체 스크롤 한 페이지 구성.
 * 섹션 순서: Hero → Intro → Transfer → Modular → SelfDesign
 */
export default function LandingPage() {
  return (
    <main className={styles.page}>
      <HeroSection />
      <IntroSection />
      {PROGRAMS.map(prog => (
        <ProgramSection key={prog.id} program={prog} />
      ))}
    </main>
  )
}
