/** 제도 소개 페이지의 CTA 버튼 하나 */
export interface ProgramButton {
  /** 버튼 표시 라벨 */
  label: string
  /** 이동할 경로 (내부 라우트) 또는 외부 URL */
  href: string
  /** 외부 링크 여부 */
  external?: boolean
  /** 버튼 스타일 변형 */
  variant?: 'primary' | 'outline'
}

/** 세 가지 진로설계 제도 중 하나 */
export interface Program {
  /** 라우트 식별자 */
  id: 'transfer' | 'modular' | 'self-design'
  /** 제도 이름 (SplitText 애니메이션에 사용) */
  title: string
  /** 짧은 부제 */
  subtitle: string
  /** 취지·목적 설명 (멀티라인 허용) */
  description: string
  /** 제도 고유 accent 색상 (CSS var 이름) */
  accentVar: string
  /** CTA 버튼 목록 — 추가·삭제·수정 용이하도록 배열로 관리 */
  buttons: ProgramButton[]
}
