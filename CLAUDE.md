# CLAUDE.md — SMU Career Guidance

Claude Code가 이 프로젝트를 작업할 때 반드시 참고하는 문서입니다.

---

## 프로젝트 개요

세명대학교 전공·진로설계센터 홍보 웹사이트.
재학생에게 전과 제도 / 모듈형 교육과정 / 학생설계전공 세 가지 제도를 안내합니다.

**개발 서버 실행**
```bash
npm run dev
```

---

## 기술 스택

| 분류 | 기술 | 버전 |
|---|---|---|
| UI | React | 19 |
| 번들러 | Vite | 6 |
| 언어 | TypeScript | 5.8 |
| 라우팅 | React Router | 7 |
| 3D/파티클 | @react-three/fiber + drei (three.js) | 9 / 10 (three 0.177) |
| 스크롤 애니메이션 | GSAP + ScrollTrigger + @gsap/react | 3 |
| Lottie | lottie-web | 5 |
| 스타일 | CSS Modules | — |

**의도적으로 제외된 라이브러리**: TanStack Query, Zustand (불필요 판단)

---

## 파일 구조

```
src/
├── App.tsx                  # 라우트 정의 + ScrollToTop
├── main.tsx                 # 앱 진입점
├── index.css                # 전역 CSS 변수 (디자인 토큰 중앙화)
│
├── types/
│   ├── department.ts        # Department 인터페이스
│   └── program.ts           # Program, ProgramButton 인터페이스
│
├── data/
│   ├── departments.ts       # 학과 목록 데이터 (40개 학과, driveUrl·keywords 포함)
│   └── programs.ts          # 세 제도 데이터 + CTA 버튼 배열
│
├── pages/
│   ├── LandingPage/         # 히어로 + 소개 + 세 제도 (단일 스크롤)
│   ├── DepartmentsPage/     # 학과 목록 + 검색
│   ├── DepartmentDetailPage/# 학과 상세 + PDF 뷰어
│   ├── TransferPage/        # 전과 제도 상세 + 학점 계산기
│   ├── ModularPage/         # 모듈형 교육과정 상세
│   └── SelfDesignPage/      # 학생설계전공 상세
│
└── components/
    ├── layout/
    │   ├── Navbar/              # 고정 상단 네비게이션 (모바일 드로어 포함)
    │   └── ScrollDownIndicator/ # 랜딩 스크롤 유도 아이콘
    ├── landing/
    │   ├── HeroSection/         # Lottie/mp4 + 파티클 + 텍스트 오버레이
    │   ├── ParticleCanvas/      # R3F 부유 파티클 배경
    │   └── ScrollPhotoStack/    # 스크롤 시 사진 아래→위 부유 (GSAP)
    ├── intro/
    │   ├── IntroSection/        # 인사말 + 캐릭터 Lottie + 제도 카드
    │   ├── ScrollableTextBox/   # 위아래 fade 마스크 스크롤 텍스트
    │   └── ProgramCardGrid/     # 세 제도 카드 — 클릭 시 해당 ProgramSection(#program-{id})으로 스크롤
    ├── programs/
    │   ├── ProgramSection/      # 제도 공통 레이아웃 (좌: 제목 / 우: 설명+버튼)
    │   ├── SplitTextTitle/      # GSAP 글자 분해 등장 애니메이션 제목
    │   ├── ProgramR3FScene/     # 제도별 R3F 파티클 씬
    │   └── ProgramButtons/      # data 기반 CTA 버튼 렌더러
    ├── departments/
    │   ├── DepartmentCard/      # 학과 카드 (fadeUp 애니메이션)
    │   ├── DepartmentSearch/    # 실시간 검색창
    │   └── PdfViewer/           # Google Drive iframe PDF 뷰어
    └── common/
        ├── LottiePlayer/        # lottie-web 래퍼
        └── CreditCalc/          # 졸업 학점 계산기 모달
```

---

## 라우트 구조

```
/                        → LandingPage (히어로 + 소개 + 세 제도 섹션)
/departments             → DepartmentsPage
/departments/:id         → DepartmentDetailPage
/programs/transfer       → TransferPage
/programs/modular        → ModularPage
/programs/self-design    → SelfDesignPage
```

---

## 디자인 시스템 — Neumorphism Light

**핵심 원칙**: border 미사용. 모든 경계는 box-shadow로 표현.
배경색과 컴포넌트 배경색이 동일(`#E0E5EC`). 그림자로만 깊이 표현.

### CSS 변수 위치
모든 디자인 토큰은 `src/index.css` `:root` 블록에 중앙화되어 있습니다.
컴포넌트에서 하드코딩 금지 — 반드시 변수 참조.

### 핵심 변수

```css
--neu-bg: #E0E5EC          /* 전체 배경 + 컴포넌트 배경 (동일) */

/* 그림자 6단계 */
--shadow-extruded          /* 카드·버튼 기본 돌출 */
--shadow-extruded-hover    /* 호버 강조 돌출 */
--shadow-extruded-sm       /* 소형 요소 */
--shadow-inset             /* 섹션 구분·웰 */
--shadow-inset-deep        /* 입력창 */
--shadow-inset-sm          /* 버튼 눌림 */

/* Accent */
--color-accent-primary:   #075cbd   /* 세명 블루 (기본 accent) */
--color-accent-transfer:  #2775ce   /* 전과 — programs.ts가 참조하는 변수 */
--color-accent-modular:   #2aa29c   /* 틸 — 모듈형 */
--color-accent-self:      #ED8936   /* 앰버 — 학생설계 */
--color-accent-light:     #8B84FF   /* 밝은 변형 */

/* 텍스트 */
--color-text-primary:   #3D4852    /* WCAG AAA 7.5:1 */
--color-text-secondary: #6B7280    /* WCAG AA 4.6:1 */
--color-text-muted:     #A0AEC0

/* 폰트 */
--font-display: 'Plus Jakarta Sans', 'Noto Sans KR', sans-serif  /* 헤딩 */
--font-sans:    'Noto Sans KR', sans-serif                        /* 본문 */

/* Radius */
--radius-container: 32px
--radius-base:      16px
--radius-inner:     12px
```

> 위는 핵심 토큰만 발췌한 것입니다. `index.css` 에는 이 외에도 Spacing(`--sp-1`~`--sp-24`, 8pt 그리드), Motion(`--ease-out-expo`, `--duration-fast/normal/slow`), Layout(`--max-width`, `--navbar-h`), 하위 호환 변수(`--color-bg`, `--color-surface` 등)와 `.neu-*` 헬퍼 클래스가 정의되어 있습니다.

### 버튼 패턴
```css
/* 기본 */
box-shadow: var(--shadow-extruded-sm);
/* 호버 */
box-shadow: var(--shadow-extruded); transform: translateY(-1px);
/* 클릭 */
box-shadow: var(--shadow-inset-sm); transform: translateY(0.5px);
```

### 입력창 패턴
```css
/* 기본 */
box-shadow: var(--shadow-inset-deep);
/* 포커스 */
box-shadow: var(--shadow-inset-deep), 0 0 0 2px var(--neu-bg), 0 0 0 4px var(--color-accent-primary);
```

---

## 데이터 수정 가이드

### 학과 PDF 링크 추가
`src/data/departments.ts` 의 각 학과 `driveUrl` 필드에 입력:
```ts
driveUrl: 'https://drive.google.com/file/d/FILE_ID/view?usp=sharing'
```
PdfViewer 컴포넌트가 `/view` → `/preview` 로 자동 변환합니다.

### 제도별 CTA 버튼 수정
`src/data/programs.ts` 의 각 제도 `buttons` 배열만 편집.
컴포넌트 코드 수정 불필요.

### 졸업 학점 기준 수정
`src/components/common/CreditCalc/CreditCalc.tsx` 상단 상수:
```ts
const GRADUATION_CREDITS = 130
const MAJOR_REQUIRED     = 60
const GENERAL_REQUIRED   = 30
```

---

## 애니메이션 규칙

### GSAP — 마운트 즉시 등장 애니메이션은 `gsap.set() + gsap.to()` 패턴 사용
모달/오버레이처럼 마운트 직후 곧바로 보여야 하는 요소(예: `CreditCalc`)는
`from()` 대신 `set() → to()` 를 사용합니다. `from()` 은 초기값을 인라인 스타일로
즉시 주입해 마운트 직후 invisible 상태가 되는 버그가 생길 수 있습니다.
```ts
// ✅ 마운트 즉시 등장
gsap.set(el, { opacity: 0, y: 30 })
gsap.to(el, { opacity: 1, y: 0, duration: 0.7 })
```

### ScrollTrigger 기반 등장은 `from()` 허용
스크롤 진입 시점에 트리거되는 애니메이션(예: `ModularPage`, `SelfDesignPage`의
`[data-animate]`)은 화면에 들어올 때만 실행되므로 `gsap.from()` 을 사용합니다.
```ts
// 컴포넌트 마운트 시 gsap.context()로 감싸고 cleanup에서 ctx.revert()
const ctx = gsap.context(() => {
  gsap.from('[data-animate]', {
    y: 28, opacity: 0, stagger: 0.1,
    scrollTrigger: { trigger: scopeRef.current, start: 'top 80%' },
  })
}, scopeRef)
return () => ctx.revert()
```

### useGSAP 훅
`HeroSection` 등 일부 컴포넌트는 `@gsap/react` 의 `useGSAP({ scope })` 훅으로
애니메이션을 등록합니다. (자동 cleanup·scope 처리)
```ts
gsap.registerPlugin(useGSAP)
useGSAP(() => { gsap.from(headingRef.current, { y: 32, opacity: 0 }) }, { scope: sectionRef })
```

### R3F 파티클 설정 위치
- `ParticleCanvas.tsx` — `PARTICLE_COLOR` 상수
- `ProgramR3FScene.tsx` — `SCENE_CONFIG` 객체에 제도별 색·개수·크기 + **움직임 전체**가 모여 있음. 디자인 조정은 이 객체만 수정.
  - 공통: `color` `count` `size` `shape`(`'scatter'|'grid'|'helix'`) `floatAmp` `floatSpeed`
  - 전과(`scatter`): 3축 sin/cos 자유 부유
  - 모듈형(`grid`): x·y는 격자 고정(미세 부유), z축으로 발원점에서 동심원 파장 전파. `waveAmp`/`waveFreq`/`waveSpeed`/`waveFalloff`/`waveCenterX,Y` 로 제어
  - 학생설계(`helix`): 이중나선(DNA). `helixRadius`/`helixHeight`/`helixTurns`/`flowSpeed`. `flowSpeed`로 나선을 따라 흐르는 속도
  - 애니메이션은 `useFrame`에서 `base`(기준 좌표) + 시간 오프셋 방식 — 위치를 누적하지 않아 형태가 유지됨
  - ⚠️ 파티클 `color`는 CSS 변수를 못 써서 hex 하드코딩이며, `--color-accent-*` 토큰과 값이 약간 다름(별도 관리)

---

## 에셋 위치

| 용도 | 경로 |
|---|---|
| 랜딩 히어로 Lottie | `public/assets/lottie/landing-hero.json` |
| 소개 캐릭터 Lottie | `public/assets/lottie/intro-character.json` |
| 히어로 영상 (mp4 대안) | `public/assets/videos/landing-hero.mp4` *(현재 미존재 — `USE_LOTTIE=false` 시 필요)* |
| 스크롤 패럴랙스 사진 | `public/assets/images/scroll-photos/photo-01~07.png` (7장) |

`HeroSection.tsx` 상단 `USE_LOTTIE` 플래그로 Lottie/mp4 전환 (현재 기본값 `true`).
mp4 파일은 아직 추가되지 않았으므로 `false` 로 바꾸려면 영상 파일을 먼저 넣어야 합니다.

---

## 알려진 사항

- `Unchecked runtime.lastError` 콘솔 에러 — 브라우저 확장 프로그램 이슈. 코드 무관.
- 학과 데이터(`departments.ts`) `driveUrl`은 40개 학과 전부 실제 Google Drive 링크가 입력되어 있음. (타입상 `string | null` 이나 현재 null 없음)
- `ModularPage`(`COURSES`), `SelfDesignPage`(`EXAMPLES`)의 과정·예시 데이터는 placeholder. 실제 데이터로 교체 필요.

---

## 배포 (Vercel)

- **빌드 명령**: `tsc -b && vite build` (`package.json`). `vercel.json` 없이 기본 Vite 프리셋으로 배포.
- **⚠️ 핵심 함정 — 로컬 `npm run dev`는 `tsc`를 건너뛴다.** dev는 vite만 실행하므로 타입 에러가 잡히지 않고, Vercel 빌드의 `tsc -b` 단계에서만 터진다. **푸시 전 반드시 `npm run build`로 타입 체크까지 통과시킬 것.**
- 빌드 의존 설정 파일:
  - `src/vite-env.d.ts` — `.module.css` 등 Vite 에셋 import의 타입 선언(`vite/client`). 없으면 모든 CSS Module import가 `tsc`에서 TS2307로 실패.
  - `@types/node` (devDependency) — `vite.config.ts`의 `path`/`__dirname` 타입 제공.
- 번들 경고: three.js/R3F로 메인 청크가 ~1.6MB(gzip 457KB). 빌드는 통과하나 초기 로딩 최적화 시 `manualChunks`로 three 분리 또는 제도 페이지 `React.lazy` 코드 스플리팅 권장.
- lottie-web의 `Use of eval ... discouraged` 경고는 라이브러리 내부 이슈로 무해. 빌드 막지 않음.
