import { Link } from "react-router";

import loopifyLogo from "../assets/images/brand/loopify-logo.jpeg";
import { regularCollections } from "../data/collections.js";
import { products } from "../data/products.js";
import { formatCurrency } from "../utils/formatCurrency.js";

const brandValues = [
  {
    number: "01",
    title: "Playful",
    description:
      "Loopify turns an everyday phone accessory into a fun mystery-unboxing experience.",
  },
  {
    number: "02",
    title: "Affordable",
    description:
      "Each blind box is priced for students who want a cute accessory without overspending.",
  },
  {
    number: "03",
    title: "Expressive",
    description:
      "Every collection offers a different style for customers to personalise their phones.",
  },
  {
    number: "04",
    title: "Community-Driven",
    description:
      "Loopify encourages customers to share unboxings, vote on future themes, and trade duplicates.",
  },
];

const qualitySteps = [
  {
    number: "01",
    title: "Charm Inspection",
    description:
      "Each charm is checked for visible damage, loose pieces, and major surface defects.",
  },
  {
    number: "02",
    title: "Loop and Attachment Check",
    description:
      "The attachment loop is checked to make sure it is secure and suitable for phone use.",
  },
  {
    number: "03",
    title: "Mystery Packaging",
    description:
      "The charm is placed inside Loopify packaging without revealing the design before opening.",
  },
  {
    number: "04",
    title: "Order Preparation",
    description:
      "The team confirms the quantity, customer details, payment method, and pickup schedule.",
  },
  {
    number: "05",
    title: "Campus Handover",
    description:
      "The completed mystery order is prepared for customer collection at EDU Café.",
  },
];

const businessJourney = [
  {
    label: "IDEA_FILE",
    title: "A playful student idea",
    description:
      "Loopify began as a student business concept focused on making phone accessories more fun, affordable, and expressive.",
  },
  {
    label: "BRAND_FILE",
    title: "A Y2K identity",
    description:
      "The brand developed a retro-digital identity inspired by early computer interfaces, glossy graphics, and collectible pop culture.",
  },
  {
    label: "PRODUCT_FILE",
    title: "One box, one surprise",
    description:
      "The mystery-box format was selected to create anticipation while keeping the purchasing process simple.",
  },
  {
    label: "COMMUNITY_FILE",
    title: "Growing the Loop",
    description:
      "Loopify connects customers through reviews, social media, collection voting, unboxing posts, and duplicate-charm trading.",
  },
];

export default function About() {
  const mysteryProduct = products[0];
  const productPrice = mysteryProduct?.price ?? 7;

  return (
    <>
      <section className="about-hero page-section">
        <div className="about-hero-copy">
          <p className="eyebrow">
            ABOUT_LOOPIFY.EXE
          </p>

          <h1>Welcome to the Loop</h1>

          <p className="about-hero-description">
            Loopify Charmies is a student-run lifestyle
            brand created to make phone accessories more
            playful, affordable, expressive, and exciting.
          </p>

          <div className="about-hero-actions">
            <Link
              className="button button-primary"
              to="/shop"
            >
              Get a Blind Box —{" "}
              {formatCurrency(productPrice)}
            </Link>

            <Link
              className="button button-secondary"
              to="/collections"
            >
              Explore Collections
            </Link>
          </div>

          <div className="about-hero-facts">
            <span>Student-run brand</span>
            <span>RM7 mystery boxes</span>
            <span>Cyber-Y2K identity</span>
            <span>Campus community</span>
          </div>
        </div>

        <div className="about-hero-window">
          <div className="computer-window">
            <div className="window-title-bar">
              <span>loopify_brand_profile.exe</span>

              <div aria-hidden="true">
                <span>—</span>
                <span>□</span>
                <span>×</span>
              </div>
            </div>

            <div className="about-logo-window">
              <img
                src={loopifyLogo}
                alt="Loopify Charmies circular LC logo"
              />

              <div>
                <p className="eyebrow">
                  BRAND_PROFILE
                </p>

                <h2>Loopify Charmies</h2>

                <p>
                  Find Your Lucky Charms!
                </p>

                <div className="about-profile-status">
                  <span>STATUS</span>
                  <strong>ONLINE</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="about-story page-section"
        aria-labelledby="about-story-heading"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              OUR_STORY.TXT
            </p>

            <h2 id="about-story-heading">
              A little mystery for your phone
            </h2>
          </div>
        </div>

        <div className="about-story-layout">
          <div className="about-story-copy">
            <p>
              Loopify was created around a simple idea:
              phone accessories should be useful, but they
              can also be playful and personal. Instead of
              selling only a standard accessory, Loopify
              turns each purchase into a surprise.
            </p>

            <p>
              Every blind box contains one randomly
              selected Y2K-inspired phone charm. Customers
              may discover a charm from HyperBloomz,
              CosmicGlitz, AquaSurfz, or the classified
              HaloWhimpz secret collection.
            </p>

            <p>
              The business is designed for students,
              teenagers, young adults, blind-box
              collectors, and anyone who enjoys decorating
              their phone without spending too much.
            </p>

            <div className="about-story-highlight">
              <strong>
                One box. One surprise. Endless
                possibilities.
              </strong>

              <p>
                Loopify combines affordability,
                functionality, personal expression, and
                the excitement of mystery.
              </p>
            </div>
          </div>

          <div className="about-folder-grid">
            {businessJourney.map((item) => (
              <article
                className="about-folder-card"
                key={item.label}
              >
                <div className="about-folder-tab">
                  {item.label}
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-vision-mission page-section">
        <div className="about-vision-card">
          <div className="window-title-bar">
            <span>vision.txt</span>

            <div aria-hidden="true">
              <span>—</span>
              <span>□</span>
              <span>×</span>
            </div>
          </div>

          <div className="about-vision-card-content">
            <span
              className="about-card-symbol"
              aria-hidden="true"
            >
              ✦
            </span>

            <p className="eyebrow">
              OUR_VISION
            </p>

            <h2>Make everyday accessories more fun</h2>

            <p>
              To become a recognisable student lifestyle
              brand that makes phone personalisation
              playful, affordable, collectible, and
              accessible.
            </p>
          </div>
        </div>

        <div className="about-mission-card">
          <div className="window-title-bar">
            <span>mission.txt</span>

            <div aria-hidden="true">
              <span>—</span>
              <span>□</span>
              <span>×</span>
            </div>
          </div>

          <div className="about-vision-card-content">
            <span
              className="about-card-symbol"
              aria-hidden="true"
            >
              ♡
            </span>

            <p className="eyebrow">
              OUR_MISSION
            </p>

            <h2>Deliver a joyful mystery experience</h2>

            <p>
              To provide quality-checked phone charms,
              simple campus purchasing, friendly customer
              support, and a community where collectors
              can share, vote, and trade.
            </p>
          </div>
        </div>
      </section>

      <section className="about-name-section page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              BRAND_NAME_DIRECTORY
            </p>

            <h2>What does “Loopify” mean?</h2>
          </div>
        </div>

        <div className="about-name-grid">
          <article className="about-name-card">
            <span className="about-name-letter">
              LOOP
            </span>

            <h3>The phone-charm connection</h3>

            <p>
              “Loop” refers to the attachment that connects
              the charm to a phone. It also represents the
              connection between Loopify and its customer
              community.
            </p>
          </article>

          <article className="about-name-card">
            <span className="about-name-letter">
              -IFY
            </span>

            <h3>Turning something ordinary into more</h3>

            <p>
              “-ify” means to transform. Loopify transforms
              an ordinary phone into something more
              personal, colourful, and expressive.
            </p>
          </article>

          <article className="about-name-card about-name-result">
            <span className="about-name-letter">
              LOOPIFY
            </span>

            <h3>Connect, personalise, and collect</h3>

            <p>
              Together, the name represents the idea of
              adding a playful loop to your phone while
              joining a wider community of charm
              collectors.
            </p>
          </article>
        </div>
      </section>

      <section className="about-logo-section page-section">
        <div className="about-logo-explanation">
          <p className="eyebrow">
            LC_LOGO_FILE
          </p>

          <h2>The meaning behind the LC logo</h2>

          <p>
            The Loopify emblem uses the initials “L” and
            “C” for Loopify Charmies. The letters are
            placed inside a circular form to represent a
            continuous loop, connection, and community.
          </p>

          <p>
            Maroon communicates the main Loopify identity,
            while pink introduces the cheerful, friendly,
            and youthful personality of the brand.
          </p>

          <div className="about-logo-points">
            <span>LC initials</span>
            <span>Circular loop</span>
            <span>Maroon identity</span>
            <span>Playful pink</span>
          </div>
        </div>

        <div className="about-logo-display">
          <div className="about-logo-orbit">
            <span aria-hidden="true">✦</span>

            <img
              src={loopifyLogo}
              alt="Loopify Charmies LC emblem"
            />

            <span aria-hidden="true">♡</span>
          </div>

          <p>Find Your Lucky Charms!</p>
        </div>
      </section>

      <section className="about-y2k-section page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              VISUAL_IDENTITY.EXE
            </p>

            <h2>Why cyber Y2K?</h2>
          </div>

          <p>
            Nostalgic style with modern usability.
          </p>
        </div>

        <div className="about-y2k-layout">
          <div className="about-y2k-copy">
            <p>
              Loopify’s visual identity is inspired by
              early-2000s digital culture, old computer
              windows, glossy plastic, chrome graphics,
              pixel symbols, sparkles, flowers, stars, and
              colourful interface elements.
            </p>

            <p>
              The aesthetic supports the mystery-box
              concept because opening a blind box feels
              similar to unlocking a hidden digital file.
              However, readability and simple navigation
              remain more important than decoration.
            </p>

            <ul className="about-y2k-feature-list">
              <li>Retro software windows</li>
              <li>Bright but readable colours</li>
              <li>Glossy and translucent visuals</li>
              <li>Playful loading bars and file names</li>
              <li>Modern responsive e-commerce layout</li>
            </ul>
          </div>

          <div className="about-collection-mosaic">
            {regularCollections.map(
              (collection) => (
                <figure
                  className={`about-mosaic-item ${collection.className}`}
                  key={collection.id}
                >
                  <img
                    src={collection.image}
                    alt={collection.imageAlt}
                  />

                  <figcaption>
                    {collection.name}
                  </figcaption>
                </figure>
              ),
            )}

            <div className="about-mosaic-secret">
              <span aria-hidden="true">?</span>
              <strong>SECRET FILE</strong>
              <small>HaloWhimpz.exe</small>
            </div>
          </div>
        </div>
      </section>

      <section className="about-philosophy page-section">
        <div className="about-philosophy-window computer-window">
          <div className="window-title-bar">
            <span>surprise_philosophy.txt</span>

            <div aria-hidden="true">
              <span>—</span>
              <span>□</span>
              <span>×</span>
            </div>
          </div>

          <div className="about-philosophy-content">
            <div
              className="about-philosophy-symbol"
              aria-hidden="true"
            >
              ?
            </div>

            <div>
              <p className="eyebrow">
                SURPRISE_UNBOXING
              </p>

              <h2>The mystery is part of the product</h2>

              <p>
                Loopify does not only sell a charm. It
                creates anticipation before opening,
                excitement during the reveal, and a story
                customers can share afterward.
              </p>

              <p>
                The exact charm cannot be selected before
                purchase. This keeps every order surprising
                while encouraging customers to collect,
                share, and trade duplicate designs.
              </p>

              <Link
                className="button button-primary"
                to="/how-it-works"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              BRAND_VALUES
            </p>

            <h2>What Loopify stands for</h2>
          </div>
        </div>

        <div className="about-values-grid">
          {brandValues.map((value) => (
            <article
              className="about-value-card"
              key={value.number}
            >
              <span>{value.number}</span>

              <h3>{value.title}</h3>

              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-student-business page-section">
        <div className="about-student-copy">
          <p className="eyebrow">
            STUDENT_ENTREPRENEURSHIP
          </p>

          <h2>Built by students, for students</h2>

          <p>
            Loopify is developed as a student
            entrepreneurship project. The business allows
            the team to apply real skills in product
            planning, branding, marketing, operations,
            finance, customer service, and e-commerce.
          </p>

          <p>
            The brand is intentionally small, friendly, and
            campus-focused. This allows the team to learn
            directly from customer feedback and improve
            the experience over time.
          </p>

          <div className="about-student-tags">
            <span>Teamwork</span>
            <span>Creativity</span>
            <span>Operations</span>
            <span>Marketing</span>
            <span>Customer Service</span>
          </div>
        </div>

        <div className="about-desktop-folders">
          <div className="about-desktop-folder">
            <span aria-hidden="true">▰</span>
            <strong>branding</strong>
          </div>

          <div className="about-desktop-folder">
            <span aria-hidden="true">▰</span>
            <strong>operations</strong>
          </div>

          <div className="about-desktop-folder">
            <span aria-hidden="true">▰</span>
            <strong>marketing</strong>
          </div>

          <div className="about-desktop-folder">
            <span aria-hidden="true">▰</span>
            <strong>community</strong>
          </div>
        </div>
      </section>

      <section className="about-quality page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              QUALITY_CHECK_PROCESS
            </p>

            <h2>From charm to campus pickup</h2>
          </div>

          <p>
            A simple process designed for consistent
            order preparation.
          </p>
        </div>

        <ol className="about-quality-list">
          {qualitySteps.map((step, index) => (
            <li
              className="about-quality-step"
              key={step.number}
            >
              <div className="about-quality-step-heading">
                <span>{step.number}</span>

                <h3>{step.title}</h3>
              </div>

              <p>{step.description}</p>

              {index < qualitySteps.length - 1 && (
                <div
                  className="about-quality-line"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>

        <div className="about-quality-notice">
          <strong>Quality reminder</strong>

          <p>
            Small visual differences may occur because
            charms are selected from available stock.
            Customers should contact Loopify if an item is
            received with significant damage or a faulty
            attachment.
          </p>
        </div>
      </section>

      <section className="about-community-focus page-section">
        <div>
          <p className="eyebrow">
            COMMUNITY_CONNECTION
          </p>

          <h2>More than an order</h2>

          <p>
            Loopify is designed around participation.
            Customers can share reviews, post unboxings,
            vote for future themes, follow collection
            announcements, and connect with other charm
            collectors.
          </p>

          <div className="about-community-actions">
            <Link
              className="button button-primary"
              to="/community"
            >
              Join the Community
            </Link>

            <a
              className="button button-secondary"
              href="https://www.instagram.com/loopify_charmies/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow Instagram ↗
            </a>
          </div>
        </div>

        <div className="about-community-icons">
          <div>
            <span aria-hidden="true">★</span>
            <strong>Collect</strong>
          </div>

          <div>
            <span aria-hidden="true">♡</span>
            <strong>Share</strong>
          </div>

          <div>
            <span aria-hidden="true">↔</span>
            <strong>Trade</strong>
          </div>

          <div>
            <span aria-hidden="true">✦</span>
            <strong>Vote</strong>
          </div>
        </div>
      </section>

      <section className="about-final-cta page-section">
        <div>
          <p className="eyebrow">
            ENTER_THE_LOOP
          </p>

          <h2>Find your lucky charm</h2>

          <p>
            Choose between one and three mystery boxes at{" "}
            {formatCurrency(productPrice)} each and collect
            your order through campus pickup at EDU Café.
          </p>
        </div>

        <div className="about-final-actions">
          <Link
            className="button button-primary"
            to="/shop"
          >
            Shop the Mystery Box
          </Link>

          <Link
            className="button button-secondary"
            to="/collections"
          >
            View Collections
          </Link>
        </div>
      </section>
    </>
  );
}
