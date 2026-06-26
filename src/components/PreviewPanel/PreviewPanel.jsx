import "../../styles/PreviewPanel.css";

export default function PreviewPanel({ image }) {
  if (!image) {
    return (
      <div className="preview-panel">
        <div className="preview-header">
          <span className="preview-header-label">Preview</span>
        </div>
        <div className="empty-preview">
          <span className="empty-preview-icon">🖼️</span>
          <div className="empty-preview-text">
            <strong>Nothing selected</strong>
            Click any result to see a larger preview here
          </div>
        </div>
      </div>
    );
  }

  const fileName = image.file_name;
  const folder = image.path.replace(/[\\/][^\\/]+$/, "");

  return (
    <div className="preview-panel">
      <div className="preview-header">
        <span className="preview-header-label">Preview</span>
      </div>

      <img
        src={`electricsearch://image?path=${encodeURIComponent(image.path)}`}
        alt={fileName}
        className="preview-image"
      />

      <div className="preview-details">
        <p className="preview-name">{fileName}</p>

        <div className="detail-row">
          <span className="detail-label">Folder</span>
          <span className="detail-value">{folder}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Full path</span>
          <span className="detail-value">{image.path}</span>
        </div>
      </div>

      <div className="preview-actions">
        <button
          className="open-full-btn"
          onClick={() => window.electron.openImage(image.path)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Open image
        </button>
      </div>
    </div>
  );
}