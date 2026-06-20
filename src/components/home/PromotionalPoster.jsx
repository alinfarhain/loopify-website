import { Link } from "react-router";

const POSTER_URL =
  "/images/loopify-promo-poster.jpeg";

export default function PromotionalPoster() {
  return (
    <section
      className="home-campaign page-section"
      aria-labelledby="home-campaign-heading"
    >
      <div className="home-campaign-copy">
        <p className="eyebrow">
          LOOPIFY_CAMPAIGN.EXE
        </p>

        <h2 id="home-campaign-heading">
          Your next charm is hiding
        </h2>

        <p className="home-campaign-description">
          Step into the Loopify mystery. Each blind
          box contains one randomly selected cyber-Y2K
          phone charm, complete with playful packaging
          and a chance to discover the secret file.
        </p>

        <div className="home-campaign-message">
          <span aria-hidden="true">
            ?
          </span>

          <div>
            <strong>
              Which collection will choose you?
            </strong>

            <p>
              HyperBloomz, CosmicGlitz, AquaSurfz,
              or the classified HaloWhimpz secret
              charm.
            </p>
          </div>
        </div>

        <div className="home-campaign-facts">
          <article>
            <span>RM7</span>
            <strong>Per blind box</strong>
          </article>

          <article>
            <span>3</span>
            <strong>Maximum per order</strong>
          </article>

          <article>
            <span>?</span>
            <strong>Secret charm chance</strong>
          </article>
        </div>

        <div className="home-campaign-tags">
          <span>Y2K phone charm</span>
          <span>Mystery blind box</span>
          <span>Student-friendly</span>
          <span>Campus pickup</span>
        </div>

        <div className="home-campaign-actions">
          <Link
            className="button button-primary"
            to="/shop"
          >
            Get a Blind Box — RM7
          </Link>

          <Link
            className="button button-secondary"
            to="/collections"
          >
            Explore Collections
          </Link>
        </div>

        <p className="home-campaign-disclosure">
          Each box contains one randomly selected
          charm. The exact design cannot be selected
          before opening.
        </p>
      </div>

      <div className="home-campaign-poster-area">
        <span
          className="home-campaign-decoration home-campaign-decoration-one"
          aria-hidden="true"
        >
          ✦
        </span>

        <span
          className="home-campaign-decoration home-campaign-decoration-two"
          aria-hidden="true"
        >
          ♡
        </span>

        <span
          className="home-campaign-sticker home-campaign-sticker-top"
          aria-hidden="true"
        >
          NEW CAMPAIGN
        </span>

        <div className="computer-window home-campaign-window">
          <div className="window-title-bar">
            <span>
              loopify_campaign_poster.jpeg
            </span>

            <div aria-hidden="true">
              <span>—</span>
              <span>□</span>
              <span>×</span>
            </div>
          </div>

          <div className="home-campaign-window-body">
            <figure className="home-campaign-poster-frame">
              <img
                src={POSTER_URL}
                width="900"
                height="1200"
                loading="lazy"
                decoding="async"
                alt="Loopify Charmies promotional campaign poster for mystery blind-box phone charms"
              />

              <span className="home-campaign-file-label">
                CAMPAIGN_01
              </span>

              <span className="home-campaign-ratio-label">
                3:4
              </span>
            </figure>

            <div className="home-campaign-status">
              <div>
                <span
                  className="home-campaign-status-dot"
                  aria-hidden="true"
                />

                <strong>
                  POSTER LOADED
                </strong>
              </div>

              <span>
                LOOPIFY_2026
              </span>
            </div>
          </div>
        </div>

        <span
          className="home-campaign-sticker home-campaign-sticker-bottom"
          aria-hidden="true"
        >
          FIND YOUR CHARM
        </span>
      </div>
    </section>
  );
}