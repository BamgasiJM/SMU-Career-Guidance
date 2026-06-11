import type { ModuleCourse } from '@/types/module'

/**
 * 모듈형 교육과정 목록.
 *
 * 과정 추가 방법: 아래 배열에 객체 하나를 추가하면 됩니다.
 * ModularPage가 배열 길이에 상관없이 전부 이어서 렌더링합니다.
 *
 * 필드 설명:
 *   id          — 과정마다 고유한 식별자 (React key)
 *   name        — 모듈 과정 이름
 *   departments — 관련된 학과 목록
 *   subjects    — 모듈에 포함된 과목명 목록
 *   desc        — 과정 설명
 */
export const MODULE_COURSES: ModuleCourse[] = [
  {
    id: 'digital-architecture-1',
    name: '디지털건축',
    departments: ['건축학과', '재난안전학과'],
    subjects: ['CAD의기초', 'CAD의응용', '건축디지털디자인', '건설공간정보및드론활용'],
    desc: '첨단 디지털 기술을 건축 설계에 응용하는 법을 배우는 과정입니다.',
  },
  {
    id: 'digital-architecture-2',
    name: '디지털건축',
    departments: ['건축학과', '재난안전학과'],
    subjects: ['CAD의기초', 'CAD의응용', '건축디지털디자인', '건설공간정보및드론활용'],
    desc: '첨단 디지털 기술을 건축 설계에 응용하는 법을 배우는 과정입니다.',
  },
  {
    id: 'digital-architecture-3',
    name: '디지털건축',
    departments: ['건축학과', '재난안전학과'],
    subjects: ['CAD의기초', 'CAD의응용', '건축디지털디자인', '건설공간정보및드론활용'],
    desc: '첨단 디지털 기술을 건축 설계에 응용하는 법을 배우는 과정입니다.',
  },
  {
    id: 'digital-architecture-4',
    name: '디지털건축',
    departments: ['건축학과', '재난안전학과'],
    subjects: ['CAD의기초', 'CAD의응용', '건축디지털디자인', '건설공간정보및드론활용'],
    desc: '첨단 디지털 기술을 건축 설계에 응용하는 법을 배우는 과정입니다.',
  },
  {
    id: 'digital-architecture-5',
    name: '디지털건축',
    departments: ['건축학과', '재난안전학과'],
    subjects: ['CAD의기초', 'CAD의응용', '건축디지털디자인', '건설공간정보및드론활용'],
    desc: '첨단 디지털 기술을 건축 설계에 응용하는 법을 배우는 과정입니다.',
  },
]
