import { Link } from "react-router";

export default function PlaceholderPage({
  title,
  description = "This page will be developed in the next stage.",
}) {
  return (
    <section className="placeholder-page page-section">
      <div className="computer-window placeholder-window">
        <div className="window-title-bar">
          <span>loopify_page.exe</span>

          <div>
            <span>—</span>
            <span>□</span>
            <span>×</span>
          </div>
        </div>

        <div className="placeholder-content">
          <p className="eyebrow">PAGE UNDER DEVELOPMENT</p>
          <h1>{title}</h1>
          <p>{description}</p>

          <Link className="button button-primary" to="/">
            Return Home
          </Link>
        </div>
      </div>
    </section>
  );
}