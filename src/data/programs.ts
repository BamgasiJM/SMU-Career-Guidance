import type { Program } from '@/types/program'

/**
 * 세 가지 진로설계 제도 데이터.
 * 버튼을 추가·삭제·수정하려면 각 buttons 배열만 편집하면 됩니다.
 * accentVar 는 src/index.css 의 CSS 변수명과 일치해야 합니다.
 */
export const PROGRAMS: Program[] = [
  {
    id: 'transfer',
    title: '전과 제도',
    subtitle: '새로운 전공, 새로운 진로',
    description:
      '재학 중 언제든지 원하는 전공으로 변경할 수 있는 제도입니다. ' +
      '전과 횟수에는 제한이 없으며, 기존에 이수한 전공 학점은 ' +
      '새 전공의 교과 과정에 따라 인정 여부가 결정됩니다. ' +
      '단, 의예과·간호학과 등 일부 전공은 전과가 제한될 수 있습니다.',
    accentVar: '--color-accent-transfer',
    buttons: [
      {
        label: '전과 제도 알아보기',
        href: '/programs/transfer',
        variant: 'primary',
      },
      {
        label: '졸업 학점 계산기',
        href: '/programs/transfer#calculator',
        variant: 'outline',
      },
    ],
  },
  {
    id: 'modular',
    title: '모듈형 교육과정',
    subtitle: '전문가가 설계한 융합 트랙',
    description:
      '특정 분야의 전문가를 양성하기 위해 여러 전공의 핵심 과목을 ' +
      '교수진이 체계적으로 조합한 교육과정입니다. ' +
      '단일 전공의 틀을 넘어 깊이 있는 융합 역량을 키우고 ' +
      '관련 학위를 취득할 수 있습니다.',
    accentVar: '--color-accent-modular',
    buttons: [
      {
        label: '개설 과정 보기',
        href: '/programs/modular',
        variant: 'primary',
      },
    ],
  },
  {
    id: 'self-design',
    title: '학생설계전공',
    subtitle: '내가 직접 그리는 커리큘럼',
    description:
      '학생 스스로 원하는 전문가 상을 설정하고, ' +
      '그에 맞는 과목을 직접 선택·조합하여 전공을 설계하는 제도입니다. ' +
      '기존 전공의 경계를 넘어 나만의 학문적 정체성을 만들 수 있습니다.',
    accentVar: '--color-accent-self',
    buttons: [
      {
        label: '설계 예시 보기',
        href: '/programs/self-design',
        variant: 'primary',
      },
    ],
  },
]
