import { useEffect, useRef } from 'react'
import lottie, { type AnimationItem } from 'lottie-web'
import styles from './LottiePlayer.module.css'

interface LottiePlayerProps {
  /** public/ 기준 경로. 예: '/assets/lottie/landing-hero.json' */
  src: string
  /** 반복 재생 여부 (기본: true) */
  loop?: boolean
  /** 자동 재생 여부 (기본: true) */
  autoplay?: boolean
  className?: string
  /** 렌더러 — 'svg'(기본) | 'canvas' | 'html' */
  renderer?: 'svg' | 'canvas' | 'html'
}

export default function LottiePlayer({
  src,
  loop = true,
  autoplay = true,
  className,
  renderer = 'svg',
}: LottiePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<AnimationItem | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer,
      loop,
      autoplay,
      path: src,
    })

    return () => {
      animRef.current?.destroy()
      animRef.current = null
    }
  }, [src, loop, autoplay, renderer])

  return (
    <div
      ref={containerRef}
      className={[styles.player, className].filter(Boolean).join(' ')}
    />
  )
}
