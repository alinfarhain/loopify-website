import { Link } from "react-router";

import { collections } from "../data/collections.js";
import PromotionalVideo from "../components/home/PromotionalVideo.jsx";
import PromotionalPoster from "../components/home/PromotionalPoster.jsx";

const steps = [
  {
    number: "01",
    title: "Choose your quantity",
    description:
      "Select between one and three Loopify mystery blind boxes at RM7 per box.",
  },
  {
    number: "02",
    title: "Complete your details",
    description:
      "Enter your contact information and choose an available campus pickup schedule.",
  },
  {
    number: "03",
    title: "Choose your payment",
    description:
      "Pay using DuitNow QR and upload your receipt, or select cash payment during pickup.",
  },
  {
    number: "04",
    title: "Collect and unbox",
    description:
      "Collect your order at EDU Café and discover which Loopify charm you received.",
  },
];

const benefits = [
  {
    title: "RM7 Per Box",
    description:
      "Each mystery blind box contains one randomly selected Loopify phone charm.",
  },
  {
    title: "Maximum Three Boxes",
    description:
      "Customers can purchase up to three mystery boxes in one order.",
  },
  {
    title: "Campus Pickup",
    description:
      "Orders are collected at EDU Café near the Kulliyyah of Engineering and Education buildings.",
  },
  {
    title: "Secret Charm Chance",
    description:
      "Selected blind boxes may contain the ultra-rare HaloWhimpz secret charm.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero page-section">
        <div className="hero-content">
          <p className="eyebrow">LOOPIFY_SYSTEM.EXE</p>

          <h1>Find Your Lucky Charms!</h1>

          <p className="hero-description">
            Unbox a surprise cyber-Y2K phone charm made for
            your style, your phone, and your campus
            adventures.
          </p>

          <div className="hero-actions">
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

          <p className="trust-line">
            Cute ★ Functional ★ Collectible ★
            Student-friendly
          </p>

          <p className="purchase-limit-text">
            RM7 per box · Maximum 3 boxes per order · Campus
            pickup only
          </p>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="computer-window">
            <div className="window-title-bar">
              <span>lucky_charm_finder.exe</span>

              <div>
                <span>—</span>
                <span>□</span>
                <span>×</span>
              </div>
            </div>

            <div className="window-content">
              <div className="mystery-box">
                <span>?</span>
              </div>

              <p>Secret file detected...</p>

              <div className="loading-track">
                <span />
              </div>

              <strong>Rare charm loading</strong>
            </div>
          </div>
        </div>
      </section>

      <PromotionalVideo />

      <section className="page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              COLLECTION_DIRECTORY
            </p>

            <h2>Which collection will choose you?</h2>
          </div>

          <Link
            className="text-link"
            to="/collections"
          >
            View all collections →
          </Link>
        </div>

        <div className="collection-grid">
          {collections.map((collection) => (
            <article
              className={`collection-card ${collection.className}`}
              key={collection.id}
            >
              <p className="product-category">
                {collection.label}
              </p>

              <div className="collection-card-media">
                {collection.isSecret ? (
                  <div
                    className="secret-collection-placeholder"
                    aria-label="The secret HaloWhimpz collection image is hidden"
                  >
                    <span aria-hidden="true">?</span>
                    <strong>CLASSIFIED</strong>
                  </div>
                ) : (
                  <img
                    src={collection.image}
                    alt={collection.imageAlt}
                  />
                )}
              </div>

              <h3>{collection.name}</h3>

              <p>{collection.description}</p>

              <Link
                className="collection-link"
                to={`/collections#${collection.id}`}
                >
                {collection.isSecret
                    ? "View secret file →"
                    : "Explore collection →"}
                </Link>
            </article>
          ))}
        </div>
      </section>

      <PromotionalPoster />

      <section className="page-section steps-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              QUICK_START_GUIDE
            </p>

            <h2>How the blind box works</h2>
          </div>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <article
              className="step-card"
              key={step.number}
            >
              <span>{step.number}</span>

              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </article>
          ))}
        </div>
        <div className="home-process-link">
        <Link
            className="button button-secondary"
            to="/how-it-works"
        >
            View the Complete Ordering Process
        </Link>
        </div>
      </section>

      <section className="shop-information page-section">
        <div>
          <p className="eyebrow">
            LOOPIFY_PRODUCT_INFO
          </p>

          <h2>One box, one surprise</h2>

          <p>
            Loopify sells one mystery blind-box product.
            Every box costs RM7 and contains one randomly
            selected phone charm from the current collection.
          </p>

          <Link
            className="button button-primary"
            to="/shop"
          >
            Shop the Mystery Box
          </Link>
        </div>

        <div className="shop-information-grid">
          {benefits.map((benefit) => (
            <article key={benefit.title}>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section secret-section">
        <div>
          <p className="eyebrow">CLASSIFIED FILE</p>

          <h2>HaloWhimpz.exe</h2>

          <p>
            A rare cyber angel has entered the Loopify
            system. Its complete appearance remains hidden
            until somebody discovers it inside a mystery
            box.
          </p>

          <Link
            className="button button-primary"
            to="/shop"
          >
            Try Your Luck
          </Link>
        </div>

        <div
          className="secret-symbol"
          aria-hidden="true"
        >
          ?
        </div>
      </section>

      <section className="page-section">
        <div className="computer-window">
          <div className="window-title-bar">
            <span>loopify_social_network.exe</span>

            <div aria-hidden="true">
              <span>—</span>
              <span>□</span>
              <span>×</span>
            </div>
          </div>

          <div className="placeholder-content">
            <p className="eyebrow">JOIN_THE_LOOP</p>

            <h2>Follow our latest charm updates</h2>

            <p>
              Visit Loopify Charmies on Instagram for
              collection reveals, blind-box teasers,
              customer unboxings, and campus pickup
              announcements.
            </p>

            <div className="home-community-actions">
                <Link
                    className="button button-secondary"
                    to="/about"
                >
                    Meet Loopify
                </Link>

                <Link
                    className="button button-secondary"
                    to="/community"
                >
                    Explore the Community
                </Link>

                <Link
                    className="button button-secondary"
                    to="/faq"
                >
                    Read the FAQ
                </Link>

                <a
                    className="button button-primary"
                    href="https://www.instagram.com/loopify_charmies/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Follow @loopify_charmies ↗
                </a>
                </div>
          </div>
        </div>
      </section>
    </>
  );
}