import type { Department } from "@/data/departments";
import styles from "./DepartmentCard.module.css";

interface Props {
  department: Department;
  onClick: () => void;
}

export default function DepartmentCard({ department, onClick }: Props) {
  return (
    <button className={styles.card} onClick={onClick} title={department.name}>
      <span className={styles.name}>{department.name}</span>
      <span className={styles.arrow}>→</span>
    </button>
  );
}
