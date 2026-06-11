import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ScrollPhotoStack.module.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * 스크롤 시 사진들이 아래→위로 부유하는 효과.
 * 사진 파일은 public/assets/images/scroll-photos/ 에 위치해야 합니다.
 * 사진 추가: PHOTOS 배열에 경로 추가.
 */
const PHOTOS = [
  '/assets/images/scroll-photos/photo-01.png',
  '/assets/images/scroll-photos/photo-02.png',
  '/assets/images/scroll-photos/photo-03.png',
  '/assets/images/scroll-photos/photo-04.png',
  '/assets/images/scroll-photos/photo-05.png',
  '/assets/images/scroll-photos/photo-06.png',
  '/assets/images/scroll-photos/photo-07.png',
]

// ── 랜덤 범위 설정 (여기만 조정하면 됩니다) ──────────────────────────
const RAND_RANGES = {
  leftMin:   15,   leftMax:   85,   // % (뷰포트 폭 기준)
  bottomMin: 5,  bottomMax: 15,   // % (컨테이너 높이 기준)
  widthMin:  110, widthMax:  130,  // px
  rotateMax: 5,                   // ±deg (음수/양수 랜덤)
  delayMin:  0.1, delayMax:  0.3,  // scrub delay
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

// 컴포넌트 마운트마다 재계산되지 않도록 모듈 레벨에서 한 번만 생성
const PHOTO_CONFIGS = PHOTOS.map(() => ({
  left:   `${rand(RAND_RANGES.leftMin,   RAND_RANGES.leftMax).toFixed(1)}%`,
  bottom: `${rand(RAND_RANGES.bottomMin, RAND_RANGES.bottomMax).toFixed(1)}%`,
  width:  `${Math.round(rand(RAND_RANGES.widthMin, RAND_RANGES.widthMax))}px`,
  rotate: rand(-RAND_RANGES.rotateMax, RAND_RANGES.rotateMax),
  delay:  rand(RAND_RANGES.delayMin, RAND_RANGES.delayMax),
}))

export default function ScrollPhotoStack() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const photoRefs  = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!wrapperRef.current) return

    const ctx = gsap.context(() => {
      photoRefs.current.forEach((el, i) => {
        if (!el) return
        const cfg = PHOTO_CONFIGS[i] ?? PHOTO_CONFIGS[0]!

        gsap.to(el, {
          y: '-80vh',
          opacity: 0,
          ease: 'none',
          delay: cfg.delay,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} className={styles.wrapper} aria-hidden="true">
      {PHOTOS.map((src, i) => {
        const cfg = PHOTO_CONFIGS[i] ?? PHOTO_CONFIGS[0]!
        return (
          <div
            key={src}
            ref={el => { photoRefs.current[i] = el }}
            className={styles.photo}
            style={{
              left:      cfg.left,
              bottom:    cfg.bottom,
              width:     cfg.width,
              transform: `rotate(${cfg.rotate}deg)`,
            }}
          >
            <img src={src} alt="" draggable={false} />
          </div>
        )
      })}
    </div>
  )
}