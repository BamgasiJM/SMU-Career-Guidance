import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import LottiePlayer from "@/components/common/LottiePlayer/LottiePlayer";
import ParticleCanvas from "@/components/landing/ParticleCanvas/ParticleCanvas";
// import ScrollPhotoStack from "@/components/landing/ScrollPhotoStack/ScrollPhotoStack"; // 일시 비활성화
import ScrollDownIndicator from "@/components/layout/ScrollDownIndicator/ScrollDownIndicator";
import styles from "./HeroSection.module.css";

gsap.registerPlugin(useGSAP);

/**
 * 히어로 미디어 소스 설정.
 * - Lottie JSON 파일이 있으면 Lottie 우선 사용.
 * - 없으면 mp4 폴백.
 * 실제 파일을 추가한 뒤 아래 상수를 맞게 설정하세요.
 */
const LOTTIE_SRC = "/assets/lottie/landing-hero.json";
const VIDEO_SRC = "/assets/videos/landing-hero.mp4";
/** true = Lottie 사용 / false = mp4 사용 */
const USE_LOTTIE = true;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [mediaError, setMediaError] = useState(false);

  // 텍스트 등장 애니메이션
  useGSAP(
    () => {
      gsap.from(headingRef.current, {
        y: 32,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={styles.hero} id="hero">
      {/* ── R3F 파티클 (배경) ── */}
      <ParticleCanvas />

      {/* ── 스크롤 패럴랙스 사진 스택 (일시 비활성화 — 추후 재사용 가능) ── */}
      {/* <ScrollPhotoStack /> */}

      {/* ── 콘텐츠: 타이틀 상자 + 그 아래 Lottie ── */}
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <p className={styles.eyebrow}>Career Guidance Program</p>
          <h1 ref={headingRef} className={styles.heading}>
            커리어 가이던스
            <br className={styles.mobileBreak} />
            프로그램
          </h1>
        </div>

        {/* ── 타이틀 아래 미디어 (Lottie / mp4 폴백) ── */}
        <div className={styles.media}>
          {USE_LOTTIE && !mediaError ? (
            <LottiePlayer
              src={LOTTIE_SRC}
              loop
              autoplay
              className={styles.lottie}
            />
          ) : (
            <video
              className={styles.video}
              src={VIDEO_SRC}
              autoPlay
              loop
              muted
              playsInline
              onError={() => setMediaError(true)}
            />
          )}
        </div>
      </div>

      {/* ── 스크롤 유도 아이콘 ── */}
      <div className={styles.scrollHint}>
        <ScrollDownIndicator targetId="intro" />
      </div>
    </section>
  );
}
