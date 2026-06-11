import type { Department } from "@/types/department";
import styles from "./DepartmentCard.module.css";

interface Props {
  department: Department;
  onClick: () => void;
}

/** 학과별 강조 컬러 — 인트로 세 버튼과 동일한 팔레트 */
const ACCENT_VARS = [
  "--color-accent-transfer",
  "--color-accent-modular",
  "--color-accent-self",
] as const;

/** id 문자열을 해시해 팔레트 중 하나를 고정 배정 (리렌더·검색 필터에도 색이 안 바뀜) */
function pickAccent(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  return ACCENT_VARS[Math.abs(hash) % ACCENT_VARS.length];
}

export default function DepartmentCard({ department, onClick }: Props) {
  const accentVar = pickAccent(department.id);
  return (
    <button
      className={styles.card}
      onClick={onClick}
      title={department.name}
      style={{ "--accent": `var(${accentVar})` } as React.CSSProperties}
    >
      <span className={styles.cardAccent} aria-hidden="true" />
      <span className={styles.name}>{department.name}</span>
      <span className={styles.arrow}>→</span>
    </button>
  );
}
