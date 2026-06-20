import { Link } from "react-router";

import loopifyLogo from "../../assets/images/brand/loopify-logo.jpeg";

export default function Footer() {
  const currentYear =
    new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-grid">
          <section className="footer-brand-block">
            <div className="footer-brand-heading">
              <span className="footer-logo-frame">
                <img
                  src={loopifyLogo}
                  alt=""
                />
              </span>

              <div>
                <strong>
                  Loopify Charmies
                </strong>

                <p>
                  Find Your Lucky Charms!
                </p>
              </div>
            </div>

            <p className="footer-brand-description">
              Affordable cyber-Y2K blind-box phone
              charms created for students,
              collectors, and smartphone accessory
              lovers.
            </p>
          </section>

          <nav
            className="footer-column footer-navigation"
            aria-label="Footer explore navigation"
          >
            <h2>Explore</h2>

            <Link to="/shop">
              Shop
            </Link>

            <Link to="/collections">
              Collections
            </Link>

            <Link to="/how-it-works">
              How It Works
            </Link>

            <Link to="/community">
              Community
            </Link>

            <Link to="/about">
              About Loopify
            </Link>
          </nav>

          <nav
            className="footer-column footer-navigation"
            aria-label="Footer support navigation"
          >
            <h2>Support</h2>

            <Link to="/faq">
              FAQ
            </Link>

            <Link to="/contact">
              Contact and Support
            </Link>

            <Link to="/privacy">
              Privacy Policy
            </Link>

            <Link to="/terms">
              Terms and Conditions
            </Link>
          </nav>

          <section className="footer-column footer-community-column">
            <h2>Join the Loop</h2>

            <div className="footer-social-links">
              <a
                href="https://wa.me/60129717470"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Support
              </a>

              <a
                href="https://www.instagram.com/loopify_charmies/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram @loopify_charmies ↗
              </a>
            </div>

            <p className="footer-pickup-note">
              Campus pickup at EDU Café
            </p>
          </section>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Loopify Charmies.
            {" "}IIUM Technopreneurship Project.
          </p>
        </div>
      </div>
    </footer>
  );
}