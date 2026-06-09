import styles from './PdfViewer.module.css'

interface PdfViewerProps {
  /** Google Drive 공유 링크 또는 null */
  driveUrl: string | null
  title?: string
}

/**
 * Google Drive 공유 링크를 iframe preview URL 로 변환합니다.
 *
 * 입력:  https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * 출력:  https://drive.google.com/file/d/FILE_ID/preview
 */
function toPreviewUrl(url: string): string {
  // /view 혹은 /view?... 를 /preview 로 교체
  return url.replace(/\/view(\?.*)?$/, '/preview')
}

export default function PdfViewer({ driveUrl, title }: PdfViewerProps) {
  if (!driveUrl) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon} aria-hidden="true">📄</span>
        <p>아직 학과 안내 PDF가 등록되지 않았습니다.</p>
        <p className={styles.emptyHint}>관리자에게 문의하거나 추후 업로드 예정입니다.</p>
      </div>
    )
  }

  const previewUrl = toPreviewUrl(driveUrl)

  return (
    <div className={styles.wrapper}>
      <iframe
        className={styles.frame}
        src={previewUrl}
        title={title ?? 'PDF 학과 안내'}
        allow="autoplay"
        loading="lazy"
      />
    </div>
  )
}
