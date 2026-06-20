import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <div className="footer-brand">
          <span className="brand-mark" aria-hidden="true">
            LC
          </span>

          <div>
            <strong>Loopify Charmies</strong>
            <p>Find Your Lucky Charms!</p>
          </div>
        </div>

        <p className="footer-description">
          Affordable cyber-Y2K blind-box phone charms created for students,
          collectors and smartphone accessory lovers.
        </p>
      </div>

      <div>
        <h2>Explore</h2>

        <div className="footer-links">
          <Link to="/shop">Shop</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/community">Community</Link>
        </div>
      </div>

      <div>
        <h2>Support</h2>

        <div className="footer-links">
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>

      <div>
        <h2>Join the Loop</h2>

        <p>@loopify_charmies</p>
        <p>Instagram · Telegram · TikTok</p>
        <p>Campus pickup at EDU Café</p>
      </div>

      <p className="footer-bottom">
        © 2026 Loopify Charmies. Student entrepreneurship project.
      </p>
    </footer>
  );
}