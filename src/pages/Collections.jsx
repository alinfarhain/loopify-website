import { useState } from "react";
import { Link } from "react-router";

import { useCart } from "../context/CartContext.jsx";
import { collections } from "../data/collections.js";
import { products } from "../data/products.js";
import { formatCurrency } from "../utils/formatCurrency.js";

function StarRating({ rating }) {
  if (!rating) {
    return (
      <span className="collection-review-locked">
        Review file locked
      </span>
    );
  }

  return (
    <span
      className="collection-rating"
      aria-label={`${rating} out of 5 stars`}
    >
      {"★".repeat(rating)}
    </span>
  );
}

export default function Collections() {
  const mysteryProduct = products[0];

  const {
    addItem,
    totalBoxes,
    remainingCapacity,
    maxCartBoxes,
  } = useCart();

  const [feedback, setFeedback] = useState("");
  const [lastAddedCollection, setLastAddedCollection] =
    useState("");

  const maximumReached = remainingCapacity <= 0;

  function handleAddToCart(collection) {
    if (!mysteryProduct || maximumReached) {
      return;
    }

    addItem(mysteryProduct, 1);

    setLastAddedCollection(collection.name);

    setFeedback(
      `One mystery blind box was added. ${collection.name} is a possible collection but is not guaranteed.`,
    );

    window.setTimeout(() => {
      setFeedback("");
      setLastAddedCollection("");
    }, 3000);
  }

  function getAddButtonText(collection) {
    if (maximumReached) {
      return `Maximum ${maxCartBoxes} Reached`;
    }

    if (lastAddedCollection === collection.name) {
      return "Added to Bag!";
    }

    return `Add 1 Blind Box — ${formatCurrency(
      mysteryProduct.price,
    )}`;
  }

  return (
    <>
      <section className="collections-hero page-section">
        <div className="collections-hero-copy">
          <p className="eyebrow">
            COLLECTION_DIRECTORY.EXE
          </p>

          <h1>Explore the Loopify Collections</h1>

          <p className="collections-hero-description">
            Discover three regular cyber-Y2K charm
            collections and one classified secret file.
            Every Loopify blind box contains one randomly
            selected charm.
          </p>

          <div className="collections-hero-actions">
            <Link
              className="button button-primary"
              to="/shop"
            >
              Get a Blind Box — RM7
            </Link>

            <a
              className="button button-secondary"
              href="#collection-files"
            >
              Open Collection Files
            </a>
          </div>

          <div className="collections-hero-facts">
            <span>RM7 per box</span>
            <span>Maximum 3 per order</span>
            <span>Campus pickup only</span>
            <span>Random design</span>
          </div>
        </div>

        <div
          className="collections-hero-window"
          aria-hidden="true"
        >
          <div className="computer-window">
            <div className="window-title-bar">
              <span>collection_scanner.exe</span>

              <div>
                <span>—</span>
                <span>□</span>
                <span>×</span>
              </div>
            </div>

            <div className="collections-scanner-content">
              <div className="collections-scanner-icons">
                <span>✿</span>
                <span>★</span>
                <span>≋</span>
                <span>?</span>
              </div>

              <p>Scanning available charm files...</p>

              <div className="loading-track">
                <span />
              </div>

              <strong>4 collection files detected</strong>
            </div>
          </div>
        </div>
      </section>

      <section
        id="collection-files"
        className="collections-overview page-section"
        aria-labelledby="collection-files-heading"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              AVAILABLE_COLLECTION_FILES
            </p>

            <h2 id="collection-files-heading">
              Which collection matches your style?
            </h2>
          </div>

          <p>
            Three visible files · One classified file
          </p>
        </div>

        <div className="collections-overview-grid">
          {collections.map((collection) => (
            <article
              className={`collections-overview-card ${collection.className}`}
              key={collection.id}
            >
              <div className="collections-overview-card-top">
                <span>{collection.label}</span>

                <span>
                  {collection.isSecret
                    ? "LOCKED"
                    : "AVAILABLE"}
                </span>
              </div>

              <div className="collections-overview-media">
                {collection.isSecret ? (
                  <div className="collections-secret-file">
                    <span aria-hidden="true">?</span>
                    <strong>IMAGE CLASSIFIED</strong>
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

              <a
                className="collection-link"
                href={`#${collection.id}`}
              >
                {collection.isSecret
                  ? "Open classified file →"
                  : "Explore collection →"}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="collection-random-notice page-section">
        <div className="computer-window">
          <div className="window-title-bar">
            <span>important_notice.txt</span>

            <div aria-hidden="true">
              <span>—</span>
              <span>□</span>
              <span>×</span>
            </div>
          </div>

          <div className="collection-random-notice-content">
            <div
              className="collection-notice-icon"
              aria-hidden="true"
            >
              !
            </div>

            <div>
              <h2>Collection selection is random</h2>

              <p>
                The collection pages help you discover the
                possible charm styles. Purchasing a blind
                box does not allow you to select or
                guarantee a particular collection.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="collection-feedback-region"
        aria-live="polite"
        aria-atomic="true"
      >
        {feedback && (
          <div className="collection-feedback-toast">
            <strong>Added to your charm bag</strong>
            <span>{feedback}</span>
          </div>
        )}
      </div>

      <section
        className="collection-details-directory"
        aria-label="Individual collection details"
      >
        {collections.map((collection, index) => (
          <article
            id={collection.id}
            className={`collection-detail-section ${collection.className}`}
            key={collection.id}
          >
            <div className="collection-detail-inner page-section">
              <nav
                className="collection-detail-navigation"
                aria-label={`${collection.name} position`}
              >
                <span>
                  File {String(index + 1).padStart(2, "0")}
                  /04
                </span>

                <a href="#collection-files">
                  Back to directory ↑
                </a>
              </nav>

              <div className="collection-detail-layout">
                <div className="collection-detail-visual-column">
                  <div className="collection-detail-window">
                    <div className="window-title-bar">
                      <span>
                        {collection.id}_preview.exe
                      </span>

                      <div aria-hidden="true">
                        <span>—</span>
                        <span>□</span>
                        <span>×</span>
                      </div>
                    </div>

                    <div className="collection-detail-media">
                      {collection.isSecret ? (
                        <div className="collection-secret-large">
                          <span aria-hidden="true">?</span>

                          <strong>
                            SECRET FILE DETECTED
                          </strong>

                          <small>
                            Complete design hidden
                          </small>
                        </div>
                      ) : (
                        <img
                          src={collection.image}
                          alt={collection.imageAlt}
                        />
                      )}
                    </div>
                  </div>

                  <div className="collection-mood-panel">
                    <p className="eyebrow">
                      VISUAL_MOOD
                    </p>

                    <div className="collection-mood-list">
                      {collection.moodWords.map(
                        (word) => (
                          <span key={word}>{word}</span>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="collection-detail-copy">
                  <p className="eyebrow">
                    {collection.label}
                  </p>

                  <h2>{collection.name}</h2>

                  <p className="collection-detail-theme">
                    Theme: {collection.theme}
                  </p>

                  <p className="collection-detail-description">
                    {collection.description}
                  </p>

                  <div className="collection-story">
                    <h3>Collection Story</h3>
                    <p>{collection.story}</p>
                  </div>

                  <div className="collection-features">
                    <h3>Visual Characteristics</h3>

                    <ul>
                      {collection.visualFeatures.map(
                        (feature) => (
                          <li key={feature}>
                            {feature}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  <div className="collection-product-panel">
                    <div>
                      <p className="product-category">
                        Available Product
                      </p>

                      <h3>
                        Loopify Mystery Blind Box
                      </h3>

                      <p>
                        One randomly selected phone charm
                        with a chance of receiving a design
                        from this collection.
                      </p>

                      <div className="collection-product-price">
                        <strong>
                          {formatCurrency(
                            mysteryProduct.price,
                          )}
                        </strong>

                        <span>per mystery box</span>
                      </div>
                    </div>

                    <button
                      className="button button-primary"
                      type="button"
                      disabled={maximumReached}
                      onClick={() =>
                        handleAddToCart(collection)
                      }
                    >
                      {getAddButtonText(collection)}
                    </button>

                    <p className="collection-product-limit">
                      Your bag contains {totalBoxes} of{" "}
                      {maxCartBoxes} allowed boxes.
                    </p>

                    <p className="collection-product-warning">
                      {collection.isSecret
                        ? "Adding a blind box does not guarantee the secret HaloWhimpz charm."
                        : `Adding a blind box does not guarantee ${collection.name}.`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="collection-support-grid">
                <section className="collection-unboxing-card">
                  <p className="eyebrow">
                    RELATED_UNBOXING_MEDIA
                  </p>

                  <h3>Unboxing Preview</h3>

                  <div className="collection-media-preview">
                    {collection.isSecret ? (
                      <div className="collection-media-locked">
                        <span aria-hidden="true">?</span>
                        <strong>MEDIA LOCKED</strong>
                      </div>
                    ) : (
                      <img
                        src={collection.image}
                        alt=""
                        aria-hidden="true"
                      />
                    )}

                    <span className="collection-play-button">
                      ▶
                    </span>
                  </div>

                  <p>{collection.mediaCaption}</p>

                  <a
                    className="text-link"
                    href="https://www.instagram.com/loopify_charmies/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Loopify on Instagram ↗
                  </a>
                </section>

                <section className="collection-review-card">
                  <div className="collection-review-heading">
                    <div>
                      <p className="eyebrow">
                        CUSTOMER_REVIEW
                      </p>

                      <h3>
                        Prototype Customer Review
                      </h3>
                    </div>

                    <StarRating
                      rating={
                        collection.review.rating
                      }
                    />
                  </div>

                  <blockquote>
                    “{collection.review.quote}”
                  </blockquote>

                  <div className="collection-review-customer">
                    <div
                      className="collection-review-avatar"
                      aria-hidden="true"
                    >
                      {collection.review.customer
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <strong>
                        {collection.review.customer}
                      </strong>

                      <span>
                        {collection.review.role}
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="collections-final-cta page-section">
        <div>
          <p className="eyebrow">
            MYSTERY_BOX_READY
          </p>

          <h2>Your next charm is hiding</h2>

          <p>
            Choose between one and three Loopify mystery
            blind boxes. Every box costs RM7 and every
            design remains a surprise until unboxing.
          </p>
        </div>

        <div className="collections-final-actions">
          <Link
            className="button button-primary"
            to="/shop"
          >
            Shop the Mystery Box
          </Link>

          <Link
            className="button button-secondary"
            to="/how-it-works"
          >
            See How It Works
          </Link>
        </div>
      </section>
    </>
  );
}