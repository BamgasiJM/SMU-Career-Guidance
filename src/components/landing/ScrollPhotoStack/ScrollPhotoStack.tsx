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

// 각 사진의 초기 위치·크기 (레이아웃 조정 시 여기만 수정)
const PHOTO_CONFIGS = [
  { left: '8%',  bottom: '70%', width: '160px', rotate: -16,  delay: 0.2 },
  { left: '72%', bottom: '30%', width: '220px', rotate:  4,  delay: 0.1 },
  { left: '35%', bottom: '10%', width: '200px', rotate: -12,  delay: 0.2 },
  { left: '5%', bottom: '20%', width: '150px', rotate: 13,  delay: 0.1 },
  { left: '55%', bottom: '20%', width: '150px', rotate: 9,  delay: 0.1 },
  { left: '85%', bottom: '60%', width: '140px', rotate: -18,  delay: 0.1 },
  { left: '35%', bottom: '70%', width: '110px', rotate: 5,  delay: 0.1 },
]

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
