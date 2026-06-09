import type { Department } from '@/types/department'

/**
 * 세명대학교 학과 목록.
 * driveUrl: Google Drive 공유 링크를 받으면 여기에 입력합니다.
 * 링크 형식 예시:
 *   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *   → iframe preview 용으로 자동 변환됩니다 (PdfViewer 컴포넌트 참고).
 *
 * 학과 추가 방법: 아래 배열에 객체 하나를 추가하면 됩니다.
 */
export const DEPARTMENTS: Department[] = [
  // ── 1. 인문예술대학 ───────────────────────────────────────
  { id: 'media-content-creation',  name: '미디어콘텐츠창작학과', college: '인문예술대학', driveUrl: 'https://drive.google.com/file/d/1gjYyqJARX77_gIVl1vKTlH3vSSac_CPl/view?usp=drive_link' },
  { id: 'foreign-languages',       name: '외국어학부',          college: '인문예술대학', driveUrl: 'https://drive.google.com/file/d/1QBcPClXN6yrd7SNR-gSHeVrp4zuCe-s2/view?usp=sharing' },
  { id: 'art-industrial-design',   name: '아트&산업디자인학과',  college: '인문예술대학', driveUrl: 'https://drive.google.com/file/d/1Nu8Tiw7Gh0fS7KPKWlPuTAatHXHnxORQ/view?usp=sharing' },
  { id: 'interior-design',         name: '실내디자인학과',       college: '인문예술대학', driveUrl: 'https://drive.google.com/file/d/1z82CNvcHvf7jbkGiGOhIkQN8aZcTl-yH/view?usp=sharing' },
  { id: 'visual-design',           name: '시각영상디자인학과',   college: '인문예술대학', driveUrl: 'https://drive.google.com/file/d/19W0SzuTIKJAIEWvqnHh-JltkYt-ACjKr/view?usp=sharing' },
  { id: 'fashion-design',          name: '패션디자인학과',       college: '인문예술대학', driveUrl: 'https://drive.google.com/file/d/12VAslm_NoY6gFPTeRHfonnqpJGr6pHyw/view?usp=sharing' },
  { id: 'acting-arts',             name: '연기예술학과',         college: '인문예술대학', driveUrl: 'https://drive.google.com/file/d/1UPkgynKPwAxwNgsyykK8PRNl0BHjBKX9/view?usp=sharing' },
  { id: 'film-webtoon-animation',  name: '영화웹툰애니메이션학과', college: '인문예술대학', driveUrl: 'https://drive.google.com/file/d/1aq1xwkssHoYmQUFTU2z1nlRyhM8v5M6B/view?usp=sharing' },

  // ── 2. 사회과학대학 ───────────────────────────────────────
  { id: 'police-studies',          name: '경찰학과',             college: '사회과학대학', driveUrl: 'https://drive.google.com/file/d/1K4nEm7R1mvFGgmkN8fJerfm-SSh7TlcB/view?usp=sharing' },
  { id: 'law',                     name: '법학과',               college: '사회과학대학', driveUrl: 'https://drive.google.com/file/d/16jlrVa-oQ75PdtFzqxtQS4t8B8zBCpnZ/view?usp=sharing' },
  { id: 'real-estate',             name: '부동산지적학과',        college: '사회과학대학', driveUrl: 'https://drive.google.com/file/d/1nyFmO8Qg1NSGccrXa3ymOzsXVq-jdy9P/view?usp=sharing' },
  { id: 'fire-disaster',           name: '소방방재학과',          college: '사회과학대학', driveUrl: 'https://drive.google.com/file/d/1VknIUMBZ65hR9CWgtDjor9CH3tiKtmW6/view?usp=sharing' },
  { id: 'business-admin',          name: '경영학과',              college: '사회과학대학', driveUrl: 'https://drive.google.com/file/d/1PvUUnEdNADcPXIyaIIdcUNinnAddDJ_D/view?usp=sharing' },
  { id: 'accounting-tax-finance',  name: '회계세무금융학과',      college: '사회과학대학', driveUrl: 'https://drive.google.com/file/d/1YChl8LM3JNh4VUFd82aF7-_9cq4dyKIl/view?usp=sharing' },
  { id: 'hotel-management',        name: '호텔경영학과',          college: '사회과학대학', driveUrl: 'https://drive.google.com/file/d/193dqAOMnu7hp9jOwrjslIYKC_Sj3kIv8/view?usp=sharing' },
  { id: 'aviation-service',        name: '항공서비스학과',        college: '사회과학대학', driveUrl: 'https://drive.google.com/file/d/1yu7pPegsjZGnLoMg6MaUO4tSsxJyVIep/view?usp=sharing' },
  { id: 'advertising-pr',          name: '광고홍보학과',          college: '사회과학대학', driveUrl: 'https://drive.google.com/file/d/1ywWTL6LCSeIh-TOR6wwV-iovuXmCb_vO/view?usp=sharing' },
  { id: 'social-welfare',          name: '사회복지학과',          college: '사회과학대학', driveUrl: 'https://drive.google.com/file/d/19FkJ0w9qDHuaQbVaTpG0DX5vslpCb2Ya/view?usp=sharing' },
  { id: 'counseling-psychology',   name: '상담심리학과',          college: '사회과학대학', driveUrl: 'https://drive.google.com/file/d/1M66HHWOFtGkJJhmxsw0mnJL9jiCvN3B2/view?usp=sharing' },

  // ── 3. IT엔지니어링대학 ──────────────────────────────────
  { id: 'smart-it',                name: '스마트IT학부',          college: 'IT엔지니어링대학', driveUrl: 'https://drive.google.com/file/d/1zqvquZ9CAKwHnN7X_QpSgFRlJseHCPJ2/view?usp=sharing', keywords: ['IT', '스마트'] },
  { id: 'computer',                name: '컴퓨터학부',            college: 'IT엔지니어링대학', driveUrl: 'https://drive.google.com/file/d/1BUuDHDisvGXfAO4MqnmHFR0tUHj5SG47/view?usp=sharing', keywords: ['CS', '소프트웨어', 'SW'] },
  { id: 'electrical-electronic',   name: '전기전자공학과',        college: 'IT엔지니어링대학', driveUrl: 'https://drive.google.com/file/d/1kC4Xstuu-I3icu3ISxcZME81-avJk5jH/view?usp=sharing' },
  { id: 'architecture',            name: '건축학과',              college: 'IT엔지니어링대학', driveUrl: 'https://drive.google.com/file/d/13boqKdZtkA6sBwy7lFapeL66bMZ4-2Nl/view?usp=sharing' },
  { id: 'disaster-safety',         name: '재난안전학과',          college: 'IT엔지니어링대학', driveUrl: 'https://drive.google.com/file/d/1LEMh04YS0U4UFDgSNLqaUYmH0FpW0Lkd/view?usp=sharing' },

  // ── 4. 보건바이오대학 ─────────────────────────────────────
  { id: 'nursing',                 name: '간호학과',              college: '보건바이오대학', driveUrl: 'https://drive.google.com/file/d/1vbdi7RIEKcrcR54KFcPkjTnLHtofK4sM/view?usp=sharing' },
  { id: 'occupational-therapy',    name: '작업치료학과',          college: '보건바이오대학', driveUrl: 'https://drive.google.com/file/d/17PcHBWfSP2jku66UhPCYC3fYxcjm_W7w/view?usp=sharing' },
  { id: 'clinical-lab',            name: '임상병리학과',          college: '보건바이오대학', driveUrl: 'https://drive.google.com/file/d/1Nw7DcpjhOvFuLjkWRfkgnxE8CICvj_zh/view?usp=sharing' },
  { id: 'health-safety',           name: '보건안전학과',          college: '보건바이오대학', driveUrl: 'https://drive.google.com/file/d/1qg1MaRvi0mLl57h-mX27KAmOv36R6Z0F/view?usp=sharing' },
  { id: 'bio-pharma',              name: '바이오제약산업학부',     college: '보건바이오대학', driveUrl: 'https://drive.google.com/file/d/1HMGNZ2CY2JL2Zs37l-g-9L8bUbLtsGkT/view?usp=sharing' },
  { id: 'bio-cosmetic',            name: '바이오코스메틱학과',     college: '보건바이오대학', driveUrl: 'https://drive.google.com/file/d/1WUr58zyqef9q5AJRond7ccAjrr_7_gqC/view?usp=sharing' },
  { id: 'beauty-care',             name: '뷰티케어학과',          college: '보건바이오대학', driveUrl: 'https://drive.google.com/file/d/17HhPfREEdb0R0cQjmwPdI7G0yxofRpjo/view?usp=sharing' },
  { id: 'bio-food-nutrition',      name: '바이오식품영양학부',     college: '보건바이오대학', driveUrl: 'https://drive.google.com/file/d/1JBbV5oPqCPpyGq4V9PMZxK8XbtrziFhY/view?usp=sharing' },
  { id: 'animal-health',           name: '동물보건학과',          college: '보건바이오대학', driveUrl: 'https://drive.google.com/file/d/1-lQg3KmuaFLnQiAE6DM8gGwij15x0Wud/view?usp=sharing' },
  { id: 'companion-animal',        name: '반려동물산업학과',       college: '보건바이오대학', driveUrl: 'https://drive.google.com/file/d/1exGber7A72X-TpiFua76zYlePi5liUQZ/view?usp=sharing' },
  { id: 'sports-life',             name: '생활체육학과',          college: '보건바이오대학', driveUrl: 'https://drive.google.com/file/d/1rLzSqXlwY2smwfMEpI-JeG1WKxWuRteO/view?usp=sharing' },

  // ── 5. 한의과대학 ────────────────────────────────────────
  { id: 'korean-medicine',         name: '한의예과·한의학과',     college: '한의과대학', driveUrl: 'https://drive.google.com/file/d/1EMax34goL6WpfDaPde1hh49zvB5mtviX/view?usp=sharing', keywords: ['한의', '한방'] },

  // ── 6. 교양대학 ──────────────────────────────────────────
  { id: 'liberal-arts',            name: '자율전공학부',          college: '교양대학', driveUrl: 'https://drive.google.com/file/d/1OgSUHHT3QY8c8d4WBFGbtpZSHym1v2Xy/view?usp=sharing', keywords: ['자율', '미정', '전공선택'] },

  // ── 7. 성인학습자전담학과 ─────────────────────────────────
  { id: 'life-management',         name: '라이프경영학과',        college: '성인학습자전담학과', driveUrl: 'https://drive.google.com/file/d/10bzFLGJDgT_OaYXotgqC8LavYsWfQ1Bu/view?usp=sharing' },
  { id: 'life-welfare-counseling', name: '라이프복지상담학과',    college: '성인학습자전담학과', driveUrl: 'https://drive.google.com/file/d/1DIAHoM36UnW9GgQpKqfY64QYXMr3DZi2/view?usp=sharing' },
  { id: 'bio-healthcare-fusion',   name: '바이오헬스케어융합학과', college: '성인학습자전담학과', driveUrl: 'https://drive.google.com/file/d/1S5jP7-lcr-HP5hr40ucoPBu20YMvZta-/view?usp=sharing' },
]
