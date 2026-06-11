import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import gsap from 'gsap'
import styles from './Navbar.module.css'

const NAV_ITEMS = [
  { label: '홈',      href: '/' },
  { label: '전과 제도',   href: '/programs/transfer' },
  { label: '모듈형 교육과정', href: '/programs/modular' },
  { label: '학생설계전공',  href: '/programs/self-design' },
  { label: '학과 안내',   href: '/departments' },
]

interface NavbarProps {
  /** 졸업 학점 계산기 모달 열기 (현재 페이지 위에 오버레이) */
  onOpenCalc: () => void
}

export default function Navbar({ onOpenCalc }: NavbarProps) {
  const navRef     = useRef<HTMLElement>(null)
  const location   = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // 스크롤 시 배경 불투명도 전환
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 라우트 변경 시 모바일 메뉴 닫기
  useEffect(() => { setMenuOpen(false) }, [location])

  // 초기 등장 애니메이션
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.2,
          // 애니메이션 종료 후 인라인 스타일 제거 → 어중간한 투명도로 고정되는 것 방지
          clearProps: 'opacity,transform',
        },
      )
    }, navRef)
    // StrictMode 이중 실행/언마운트 시 인라인 스타일·트윈을 되돌려 항상 또렷하게 보이도록
    return () => ctx.revert()
  }, [])

  return (
    <header
      ref={navRef}
      className={[styles.header, scrolled ? styles.scrolled : ''].join(' ')}
    >
      <nav className={styles.nav}>
        {/* 로고 */}
        <NavLink to="/" className={styles.logo}>
          <img
            src="/assets/logo/smu_logo.png"
            alt="smu_logo"
            className={styles.logoImg}
          />
          <span className={styles.logoText}>전공‧진로설계센터</span>
        </NavLink>

        {/* 데스크탑 메뉴 */}
        <ul className={styles.menu}>
          {NAV_ITEMS.map(item => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                end={item.href === '/'}
                className={({ isActive }) =>
                  [styles.link, isActive ? styles.active : ''].join(' ')
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          {/* 졸업 학점 계산기 — 강조 색상으로 우측 끝에 배치. 현재 페이지 위에 모달로 열림 */}
          <li>
            <button type="button" className={styles.calcLink} onClick={onOpenCalc}>
              졸업 학점 계산기
            </button>
          </li>
        </ul>

        {/* 모바일 햄버거 */}
        <button
          className={styles.burger}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={menuOpen}
        >
          <span className={[styles.bar, menuOpen ? styles.barTop : ''].join(' ')} />
          <span className={[styles.bar, menuOpen ? styles.barMid : ''].join(' ')} />
          <span className={[styles.bar, menuOpen ? styles.barBot : ''].join(' ')} />
        </button>
      </nav>

      {/* 모바일 드로어 */}
      <div className={[styles.drawer, menuOpen ? styles.drawerOpen : ''].join(' ')}>
        <ul className={styles.drawerMenu}>
          {NAV_ITEMS.map(item => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                end={item.href === '/'}
                className={({ isActive }) =>
                  [styles.drawerLink, isActive ? styles.active : ''].join(' ')
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          {/* 졸업 학점 계산기 — 강조 색상으로 맨 아래 배치. 현재 페이지 위에 모달로 열림 */}
          <li>
            <button
              type="button"
              className={styles.drawerCalcLink}
              onClick={() => { setMenuOpen(false); onOpenCalc() }}
            >
              졸업 학점 계산기
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}