export interface Department {
  /** URL slug & 고유 ID */
  id: string
  /** 학과 표시명 */
  name: string
  /** 소속 단과대학 */
  college: string
  /** Google Drive 공유 링크 (preview 용) — 추후 입력 */
  driveUrl: string | null
  /** 검색 보조 키워드 (선택) */
  keywords?: string[]
}
