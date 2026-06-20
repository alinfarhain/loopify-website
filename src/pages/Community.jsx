import { useEffect, useState } from "react";
import { Link } from "react-router";

import {
  collections,
  regularCollections,
} from "../data/collections.js";
import { products } from "../data/products.js";
import { formatCurrency } from "../utils/formatCurrency.js";

const REVIEW_STORAGE_KEY =
  "loopify-community-reviews";

const POLL_STORAGE_KEY =
  "loopify-community-poll-selections";

const initialReviewForm = {
  name: "",
  collection: "",
  rating: "",
  review: "",
  consent: false,
};

const prototypeReviews = [
  {
    id: "prototype-review-1",
    customer: "Aina",
    role: "IIUM Student",
    collection: "CosmicGlitz.exe",
    rating: 5,
    quote:
      "The packaging was so cute, and I got CosmicGlitz on my first try!",
    verified: true,
    submitted: false,
  },
  {
    id: "prototype-review-2",
    customer: "Nadia",
    role: "IIUM Student",
    collection: "HyperBloomz.exe",
    rating: 5,
    quote:
      "The flower design is bright, playful, and matches my phone case really well.",
    verified: true,
    submitted: false,
  },
  {
    id: "prototype-review-3",
    customer: "Sarah",
    role: "Loopify Customer",
    collection: "AquaSurfz.exe",
    rating: 4,
    quote:
      "I love the blue colour and the charm feels lightweight when attached to my phone.",
    verified: true,
    submitted: false,
  },
];

const communityPolls = [
  {
    id: "favourite-collection",
    eyebrow: "COLLECTION_VOTE.EXE",
    title: "Which collection matches your style?",
    description:
      "Vote for the Loopify collection that best matches your current phone aesthetic.",
    options: [
      {
        id: "hyperbloomz",
        label: "HyperBloomz.exe",
        baseVotes: 32,
      },
      {
        id: "cosmicglitz",
        label: "CosmicGlitz.exe",
        baseVotes: 41,
      },
      {
        id: "aquasurfz",
        label: "AquaSurfz.exe",
        baseVotes: 27,
      },
    ],
  },
  {
    id: "future-drop",
    eyebrow: "FUTURE_DROP_VOTE.EXE",
    title: "What theme should Loopify explore next?",
    description:
      "Help shape a possible future charm collection by selecting your favourite concept.",
    options: [
      {
        id: "pixel-hearts",
        label: "Pixel Hearts",
        baseVotes: 38,
      },
      {
        id: "cyber-fruits",
        label: "Cyber Fruits",
        baseVotes: 29,
      },
      {
        id: "retro-sweets",
        label: "Retro Sweets",
        baseVotes: 33,
      },
    ],
  },
];

const campusUpdates = [
  {
    id: "pickup",
    status: "ACTIVE",
    title: "Campus Pickup",
    description:
      "Choose an available date and time during checkout, then collect your order at EDU Café.",
    actionLabel: "See How It Works",
    actionTo: "/how-it-works",
  },
  {
    id: "unboxing",
    status: "COMMUNITY",
    title: "Unboxing Features",
    description:
      "Share your Loopify unboxing on Instagram and tag @loopify_charmies for a chance to be featured.",
    actionLabel: "Open Instagram",
    actionHref:
      "https://www.instagram.com/loopify_charmies/",
  },
  {
    id: "next-drop",
    status: "COMING SOON",
    title: "Future Collection Updates",
    description:
      "New collection announcements, polls, and secret-charm clues will be shared through the Loopify Instagram account.",
    actionLabel: "Follow Loopify",
    actionHref:
      "https://www.instagram.com/loopify_charmies/",
  },
];

function readSavedReviews() {
  try {
    const storedReviews =
      localStorage.getItem(
        REVIEW_STORAGE_KEY,
      );

    if (!storedReviews) {
      return [];
    }

    const parsedReviews =
      JSON.parse(storedReviews);

    return Array.isArray(parsedReviews)
      ? parsedReviews
      : [];
  } catch (error) {
    console.error(
      "Unable to load community reviews:",
      error,
    );

    return [];
  }
}

function readSavedPollSelections() {
  try {
    const storedSelections =
      localStorage.getItem(
        POLL_STORAGE_KEY,
      );

    if (!storedSelections) {
      return {};
    }

    const parsedSelections =
      JSON.parse(storedSelections);

    return parsedSelections &&
      typeof parsedSelections === "object"
      ? parsedSelections
      : {};
  } catch (error) {
    console.error(
      "Unable to load community poll selections:",
      error,
    );

    return {};
  }
}

function getPollResults(
  poll,
  selectedOptionId,
) {
  const totalBaseVotes =
    poll.options.reduce(
      (total, option) =>
        total + option.baseVotes,
      0,
    );

  const totalVotes =
    totalBaseVotes +
    (selectedOptionId ? 1 : 0);

  return poll.options.map((option) => {
    const votes =
      option.baseVotes +
      (selectedOptionId === option.id
        ? 1
        : 0);

    return {
      ...option,
      votes,
      percentage: Math.round(
        (votes / totalVotes) * 100,
      ),
    };
  });
}

function FieldError({ message }) {
  if (!message) {
    return null;
  }

  return (
    <span
      className="field-error"
      role="alert"
    >
      {message}
    </span>
  );
}

function StarRating({ rating }) {
  return (
    <span
      className="community-star-rating"
      aria-label={`${rating} out of 5 stars`}
    >
      {"★".repeat(rating)}
      <span aria-hidden="true">
        {"☆".repeat(5 - rating)}
      </span>
    </span>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="community-review-card">
      <div className="community-review-top">
        <StarRating
          rating={review.rating}
        />

        <span
          className={
            review.verified
              ? "community-review-badge is-verified"
              : "community-review-badge"
          }
        >
          {review.verified
            ? "Verified Buyer"
            : "Community Submission"}
        </span>
      </div>

      <blockquote>
        “{review.quote}”
      </blockquote>

      <div className="community-review-meta">
        <div
          className="community-review-avatar"
          aria-hidden="true"
        >
          {review.customer
            .charAt(0)
            .toUpperCase()}
        </div>

        <div>
          <strong>
            {review.customer}
          </strong>

          <span>{review.role}</span>

          <small>
            Received: {review.collection}
          </small>
        </div>
      </div>

      {review.submitted && (
        <p className="community-prototype-label">
          Saved in this browser for prototype
          demonstration.
        </p>
      )}
    </article>
  );
}

export default function Community() {
  const mysteryProduct = products[0];
  const productPrice =
    mysteryProduct?.price ?? 7;

  const [
    submittedReviews,
    setSubmittedReviews,
  ] = useState(readSavedReviews);

  const [
    pollSelections,
    setPollSelections,
  ] = useState(
    readSavedPollSelections,
  );

  const [reviewForm, setReviewForm] =
    useState(initialReviewForm);

  const [formErrors, setFormErrors] =
    useState({});

  const [
    submissionMessage,
    setSubmissionMessage,
  ] = useState("");

  const allReviews = [
    ...submittedReviews,
    ...prototypeReviews,
  ];

  useEffect(() => {
    try {
      localStorage.setItem(
        REVIEW_STORAGE_KEY,
        JSON.stringify(
          submittedReviews,
        ),
      );
    } catch (error) {
      console.error(
        "Unable to save community reviews:",
        error,
      );
    }
  }, [submittedReviews]);

  useEffect(() => {
    try {
      localStorage.setItem(
        POLL_STORAGE_KEY,
        JSON.stringify(
          pollSelections,
        ),
      );
    } catch (error) {
      console.error(
        "Unable to save poll selections:",
        error,
      );
    }
  }, [pollSelections]);

  function updateReviewField(event) {
    const {
      name,
      type,
      checked,
      value,
    } = event.target;

    setReviewForm(
      (currentForm) => ({
        ...currentForm,
        [name]:
          type === "checkbox"
            ? checked
            : value,
      }),
    );

    if (formErrors[name]) {
      setFormErrors(
        (currentErrors) => ({
          ...currentErrors,
          [name]: "",
        }),
      );
    }

    if (submissionMessage) {
      setSubmissionMessage("");
    }
  }

  function validateReviewForm() {
    const nextErrors = {};

    if (
      reviewForm.name.trim().length < 2
    ) {
      nextErrors.name =
        "Enter your name.";
    }

    if (!reviewForm.collection) {
      nextErrors.collection =
        "Select the collection you received.";
    }

    if (!reviewForm.rating) {
      nextErrors.rating =
        "Select a rating.";
    }

    if (
      reviewForm.review.trim().length <
      15
    ) {
      nextErrors.review =
        "Write at least 15 characters about your experience.";
    }

    if (!reviewForm.consent) {
      nextErrors.consent =
        "Confirm that Loopify may display this review in the prototype.";
    }

    return nextErrors;
  }

  function handleReviewSubmit(event) {
    event.preventDefault();

    const nextErrors =
      validateReviewForm();

    if (
      Object.keys(nextErrors).length >
      0
    ) {
      setFormErrors(nextErrors);
      setSubmissionMessage("");
      return;
    }

    const selectedCollection =
      collections.find(
        (collection) =>
          collection.id ===
          reviewForm.collection,
      );

    const newReview = {
      id: `community-review-${Date.now()}`,
      customer:
        reviewForm.name.trim(),
      role: "Community Member",
      collection:
        selectedCollection?.name ??
        "Loopify Mystery Charm",
      rating: Number(
        reviewForm.rating,
      ),
      quote:
        reviewForm.review.trim(),
      verified: false,
      submitted: true,
    };

    setSubmittedReviews(
      (currentReviews) => [
        newReview,
        ...currentReviews,
      ],
    );

    setReviewForm(
      initialReviewForm,
    );

    setFormErrors({});

    setSubmissionMessage(
      "Your review was added to the Community page in this browser.",
    );
  }

  function handlePollVote(
    pollId,
    optionId,
  ) {
    setPollSelections(
      (currentSelections) => ({
        ...currentSelections,
        [pollId]: optionId,
      }),
    );
  }

  return (
    <>
      <section className="community-hero page-section">
        <div className="community-hero-copy">
          <p className="eyebrow">
            LOOPIFY_COMMUNITY.EXE
          </p>

          <h1>Join the Loop</h1>

          <p className="community-hero-description">
            Discover customer reviews,
            unboxing moments, collection
            votes, campus updates, and the
            people collecting Loopify charms.
          </p>

          <div className="community-hero-actions">
            <a
              className="button button-primary"
              href="https://www.instagram.com/loopify_charmies/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow @loopify_charmies ↗
            </a>

            <a
              className="button button-secondary"
              href="#submit-review"
            >
              Submit Your Review
            </a>
          </div>

          <div className="community-hero-facts">
            <span>Customer reviews</span>
            <span>Collection polls</span>
            <span>Unboxing gallery</span>
            <span>Campus updates</span>
          </div>
        </div>

        <div className="community-hero-window">
          <div className="computer-window">
            <div className="window-title-bar">
              <span>
                community_feed.exe
              </span>

              <div aria-hidden="true">
                <span>—</span>
                <span>□</span>
                <span>×</span>
              </div>
            </div>

            <div className="community-hero-gallery">
              {regularCollections.map(
                (collection) => (
                  <div
                    className="community-hero-image"
                    key={collection.id}
                  >
                    <img
                      src={
                        collection.image
                      }
                      alt=""
                      aria-hidden="true"
                    />

                    <span>
                      {
                        collection.shortName
                      }
                    </span>
                  </div>
                ),
              )}

              <div className="community-hero-secret">
                <span aria-hidden="true">
                  ?
                </span>

                <strong>
                  SECRET FILE
                </strong>
              </div>

              <p>
                New community files detected...
              </p>

              <div className="community-feed-loader">
                <span />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="community-reviews page-section"
        aria-labelledby="community-reviews-heading"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              CUSTOMER_REVIEWS
            </p>

            <h2 id="community-reviews-heading">
              What collectors are saying
            </h2>
          </div>

          <a
            className="text-link"
            href="#submit-review"
          >
            Write a review ↓
          </a>
        </div>

        <p className="community-prototype-notice">
          Reviews labelled “Prototype
          Review” or “Community Submission”
          are included for website
          demonstration purposes.
        </p>

        <div className="community-review-grid">
          {allReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
            />
          ))}
        </div>
      </section>

      <section className="community-gallery page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              UNBOXING_GALLERY
            </p>

            <h2>
              Mystery charms in the wild
            </h2>
          </div>

          <a
            className="text-link"
            href="https://www.instagram.com/loopify_charmies/"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Instagram ↗
          </a>
        </div>

        <div className="community-gallery-grid">
          {regularCollections.map(
            (collection, index) => (
              <article
                className={`community-gallery-card ${collection.className}`}
                key={collection.id}
              >
                <div className="community-gallery-media">
                  <img
                    src={collection.image}
                    alt={`${collection.name} Loopify unboxing preview`}
                  />

                  <span className="community-gallery-number">
                    POST_0{index + 1}
                  </span>
                </div>

                <div className="community-gallery-copy">
                  <span className="community-post-label">
                    Prototype Community Post
                  </span>

                  <h3>
                    {collection.name}
                  </h3>

                  <p>
                    A mystery-box reveal
                    featuring the{" "}
                    {collection.label.toLowerCase()}.
                  </p>

                  <span>
                    #LoopifyCharmies
                    #FindYourLuckyCharm
                  </span>
                </div>
              </article>
            ),
          )}

          <article className="community-gallery-card community-secret-post">
            <div className="community-gallery-media">
              <div className="community-gallery-secret">
                <span aria-hidden="true">
                  ?
                </span>

                <strong>
                  IMAGE LOCKED
                </strong>
              </div>

              <span className="community-gallery-number">
                POST_04
              </span>
            </div>

            <div className="community-gallery-copy">
              <span className="community-post-label">
                Classified Post
              </span>

              <h3>HaloWhimpz.exe</h3>

              <p>
                The secret charm remains hidden
                until a lucky customer discovers
                it.
              </p>

              <span>
                #SecretCharm #RareDrop
              </span>
            </div>
          </article>
        </div>

        <div className="community-share-banner">
          <div>
            <p className="eyebrow">
              SHARE_YOUR_UNBOXING
            </p>

            <h3>
              Got your lucky charm?
            </h3>

            <p>
              Share your unboxing on Instagram,
              tag @loopify_charmies, and use
              #LoopifyCharmies for a chance to
              appear in the community gallery.
            </p>
          </div>

          <a
            className="button button-primary"
            href="https://www.instagram.com/loopify_charmies/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Share Your Unboxing ↗
          </a>
        </div>
      </section>

      <section className="community-instagram page-section">
        <div className="computer-window">
          <div className="window-title-bar">
            <span>
              instagram_feed_preview.exe
            </span>

            <div aria-hidden="true">
              <span>—</span>
              <span>□</span>
              <span>×</span>
            </div>
          </div>

          <div className="community-instagram-content">
            <div className="community-instagram-header">
              <div className="community-instagram-avatar">
                LC
              </div>

              <div>
                <strong>
                  @loopify_charmies
                </strong>

                <span>
                  Collection teasers ·
                  Unboxings · Campus updates
                </span>
              </div>

              <a
                className="button button-primary"
                href="https://www.instagram.com/loopify_charmies/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow ↗
              </a>
            </div>

            <div className="community-instagram-grid">
              {regularCollections.map(
                (collection) => (
                  <a
                    className="community-instagram-post"
                    href="https://www.instagram.com/loopify_charmies/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View Loopify Instagram for ${collection.name}`}
                    key={collection.id}
                  >
                    <img
                      src={
                        collection.image
                      }
                      alt=""
                      aria-hidden="true"
                    />

                    <span>
                      View post ↗
                    </span>
                  </a>
                ),
              )}
            </div>

            <p className="community-instagram-note">
              This is a visual website preview.
              The latest real posts are available
              through the Loopify Instagram
              account.
            </p>
          </div>
        </div>
      </section>

      <section
        className="community-polls page-section"
        aria-labelledby="community-polls-heading"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              COMMUNITY_POLLS
            </p>

            <h2 id="community-polls-heading">
              Help shape the Loop
            </h2>
          </div>

          <p>
            Select one answer in each poll.
          </p>
        </div>

        <div className="community-poll-grid">
          {communityPolls.map((poll) => {
            const selectedOptionId =
              pollSelections[poll.id];

            const results =
              getPollResults(
                poll,
                selectedOptionId,
              );

            return (
              <article
                className="community-poll-card"
                key={poll.id}
              >
                <p className="eyebrow">
                  {poll.eyebrow}
                </p>

                <h3>{poll.title}</h3>

                <p>{poll.description}</p>

                <div
                  className="community-poll-options"
                  role="group"
                  aria-label={poll.title}
                >
                  {results.map(
                    (option) => {
                      const isSelected =
                        selectedOptionId ===
                        option.id;

                      return (
                        <button
                          className={`community-poll-option ${
                            isSelected
                              ? "is-selected"
                              : ""
                          }`}
                          type="button"
                          aria-pressed={
                            isSelected
                          }
                          onClick={() =>
                            handlePollVote(
                              poll.id,
                              option.id,
                            )
                          }
                          key={option.id}
                        >
                          <span className="community-poll-option-heading">
                            <strong>
                              {
                                option.label
                              }
                            </strong>

                            <span>
                              {
                                option.percentage
                              }
                              %
                            </span>
                          </span>

                          <span className="community-poll-bar">
                            <span
                              style={{
                                width: `${option.percentage}%`,
                              }}
                            />
                          </span>

                          <small>
                            {option.votes} prototype
                            votes
                          </small>
                        </button>
                      );
                    },
                  )}
                </div>

                <p
                  className="community-poll-feedback"
                  aria-live="polite"
                >
                  {selectedOptionId
                    ? "Your selection has been saved in this browser."
                    : "Select an option to view your saved choice."}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="community-updates page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              CAMPUS_EVENT_UPDATES
            </p>

            <h2>
              What is happening in the Loop?
            </h2>
          </div>
        </div>

        <div className="community-update-grid">
          {campusUpdates.map((update) => (
            <article
              className="community-update-card"
              key={update.id}
            >
              <span className="community-update-status">
                {update.status}
              </span>

              <h3>{update.title}</h3>

              <p>{update.description}</p>

              {update.actionTo && (
                <Link
                  className="text-link"
                  to={update.actionTo}
                >
                  {update.actionLabel} →
                </Link>
              )}

              {update.actionHref && (
                <a
                  className="text-link"
                  href={update.actionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {update.actionLabel} ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section
        id="submit-review"
        className="community-review-form-section page-section"
      >
        <div className="community-review-form-intro">
          <p className="eyebrow">
            SUBMIT_REVIEW.EXE
          </p>

          <h2>Share your Loopify experience</h2>

          <p>
            Tell other collectors about your
            mystery-box experience. Do not
            include phone numbers, addresses,
            banking details, or other private
            information in your review.
          </p>

          <div className="community-review-guidelines">
            <strong>
              Review guidelines
            </strong>

            <ul>
              <li>
                Describe your real product
                experience.
              </li>

              <li>
                Keep the review respectful and
                relevant.
              </li>

              <li>
                Do not reveal another person’s
                private information.
              </li>

              <li>
                Do not upload or describe banking
                receipts here.
              </li>
            </ul>
          </div>
        </div>

        <form
          className="community-review-form"
          noValidate
          onSubmit={handleReviewSubmit}
        >
          <div className="window-title-bar">
            <span>
              new_review_form.exe
            </span>

            <div aria-hidden="true">
              <span>—</span>
              <span>□</span>
              <span>×</span>
            </div>
          </div>

          <div className="community-review-form-content">
            <div className="form-field">
              <label htmlFor="review-name">
                Display name *
              </label>

              <input
                id="review-name"
                name="name"
                type="text"
                autoComplete="name"
                value={reviewForm.name}
                aria-invalid={Boolean(
                  formErrors.name,
                )}
                onChange={
                  updateReviewField
                }
              />

              <FieldError
                message={
                  formErrors.name
                }
              />
            </div>

            <div className="form-grid community-review-select-grid">
              <div className="form-field">
                <label htmlFor="review-collection">
                  Collection received *
                </label>

                <select
                  id="review-collection"
                  name="collection"
                  value={
                    reviewForm.collection
                  }
                  aria-invalid={Boolean(
                    formErrors.collection,
                  )}
                  onChange={
                    updateReviewField
                  }
                >
                  <option value="">
                    Select a collection
                  </option>

                  {collections.map(
                    (collection) => (
                      <option
                        value={
                          collection.id
                        }
                        key={
                          collection.id
                        }
                      >
                        {collection.name}
                      </option>
                    ),
                  )}
                </select>

                <FieldError
                  message={
                    formErrors.collection
                  }
                />
              </div>

              <div className="form-field">
                <label htmlFor="review-rating">
                  Rating *
                </label>

                <select
                  id="review-rating"
                  name="rating"
                  value={
                    reviewForm.rating
                  }
                  aria-invalid={Boolean(
                    formErrors.rating,
                  )}
                  onChange={
                    updateReviewField
                  }
                >
                  <option value="">
                    Select a rating
                  </option>

                  <option value="5">
                    5 — Excellent
                  </option>

                  <option value="4">
                    4 — Very good
                  </option>

                  <option value="3">
                    3 — Good
                  </option>

                  <option value="2">
                    2 — Fair
                  </option>

                  <option value="1">
                    1 — Poor
                  </option>
                </select>

                <FieldError
                  message={
                    formErrors.rating
                  }
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="review-message">
                Your review *
              </label>

              <textarea
                id="review-message"
                name="review"
                rows="6"
                maxLength="500"
                value={reviewForm.review}
                placeholder="Tell the community about your charm, packaging, or unboxing experience."
                aria-invalid={Boolean(
                  formErrors.review,
                )}
                onChange={
                  updateReviewField
                }
              />

              <div className="community-character-count">
                <small>
                  Minimum 15 characters
                </small>

                <small>
                  {
                    reviewForm.review
                      .length
                  }
                  /500
                </small>
              </div>

              <FieldError
                message={
                  formErrors.review
                }
              />
            </div>

            <label className="community-consent">
              <input
                type="checkbox"
                name="consent"
                checked={
                  reviewForm.consent
                }
                onChange={
                  updateReviewField
                }
              />

              <span>
                I confirm that this review may
                be displayed on the Loopify
                Community page for prototype
                demonstration.
              </span>
            </label>

            <FieldError
              message={
                formErrors.consent
              }
            />

            <button
              className="button button-primary community-review-submit"
              type="submit"
            >
              Submit Review
            </button>

            <div
              className="community-submission-message"
              aria-live="polite"
            >
              {submissionMessage && (
                <>
                  <strong>
                    Review submitted
                  </strong>

                  <span>
                    {submissionMessage}
                  </span>
                </>
              )}
            </div>
          </div>
        </form>
      </section>

      <section className="community-final-cta page-section">
        <div>
          <p className="eyebrow">
            JOIN_THE_LOOP
          </p>

          <h2>
            Your next charm is hiding
          </h2>

          <p>
            Choose between one and three
            mystery blind boxes at{" "}
            {formatCurrency(productPrice)} each,
            then share your unboxing with the
            Loopify community.
          </p>
        </div>

        <div className="community-final-actions">
          <Link
            className="button button-primary"
            to="/shop"
          >
            Shop the Mystery Box
          </Link>

          <a
            className="button button-secondary"
            href="https://www.instagram.com/loopify_charmies/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow on Instagram ↗
          </a>
        </div>
      </section>
    </>
  );
}