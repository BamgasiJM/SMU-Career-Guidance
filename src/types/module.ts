/** 모듈형 교육과정 한 개 */
export interface ModuleCourse {
  /** 식별자 (React key — 과정마다 고유해야 함) */
  id: string
  /** 모듈 과정 이름 */
  name: string
  /** 관련된 학과 목록 */
  departments: string[]
  /** 모듈에 포함된 과목명 목록 */
  subjects: string[]
  /** 과정 설명 */
  desc: string
}
