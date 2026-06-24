import "../../styles/PreviewPanel.css";

export default function PreviewPanel({ image }) {

    if (!image) {
        return (
            <div className="preview-panel empty-preview">
                <h3>🖼️ Preview</h3>
                <p>Select a screenshot to preview.</p>
            </div>
        );
    }

    return (
        <div className="preview-panel">

            <img
                src={`electricsearch://image?path=${encodeURIComponent(image.path)}`}
                alt={image.file_name}
                className="preview-image"
            />

            <div className="preview-details">
                <h3>{image.file_name}</h3>
                <p className="path-label">Path</p>
                <p className="path-value">{image.path}</p>
            </div>

        </div>
    );
}