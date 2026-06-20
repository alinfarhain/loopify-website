import { Link } from "react-router";

export default function NotFound() {
  return (
    <section className="placeholder-page page-section">
      <div className="placeholder-content">
        <p className="eyebrow">ERROR 404</p>
        <h1>Charm file not found</h1>

        <p>
          The page may have been moved, renamed or lost somewhere inside the
          Loopify system.
        </p>

        <Link className="button button-primary" to="/">
          Return Home
        </Link>
      </div>
    </section>
  );
}