import { useState } from "react";
import { Link } from "react-router";

import { regularCollections } from "../data/collections.js";
import { products } from "../data/products.js";
import { formatCurrency } from "../utils/formatCurrency.js";

const MAX_BOXES_PER_ORDER = 3;

const processSteps = [
  {
    id: "browse",
    number: "01",
    icon: "⌕",
    title: "Browse the Collections",
    shortDescription:
      "Explore the three visible charm collections and the classified secret file.",
    details: [
      "View HyperBloomz, CosmicGlitz, and AquaSurfz.",
      "Discover the theme and visual style of each collection.",
      "HaloWhimpz remains hidden as the ultra-rare secret charm.",
    ],
    tip:
      "The collection pages show the possible styles, but they do not let you choose an exact charm.",
    actionLabel: "Explore Collections",
    actionTo: "/collections",
  },
  {
    id: "quantity",
    number: "02",
    icon: "□",
    title: "Choose Your Quantity",
    shortDescription:
      `Select between one and ${MAX_BOXES_PER_ORDER} mystery blind boxes.`,
    details: [
      "Each blind box contains one randomly selected phone charm.",
      "One box costs RM7.",
      `A customer can purchase a maximum of ${MAX_BOXES_PER_ORDER} boxes in one order.`,
    ],
    tip:
      "The possible order totals are RM7, RM14, or RM21.",
    actionLabel: "Shop the Mystery Box",
    actionTo: "/shop",
  },
  {
    id: "cart",
    number: "03",
    icon: "+",
    title: "Add to Your Charm Bag",
    shortDescription:
      "Add your selected quantity and review the order before checkout.",
    details: [
      "The Bag count shows the total number of mystery boxes.",
      `The cart automatically prevents quantities above ${MAX_BOXES_PER_ORDER}.`,
      "You can increase, decrease, or remove boxes before checkout.",
    ],
    tip:
      "Your cart remains saved in the same browser until you clear it or complete the order.",
    actionLabel: "View Your Bag",
    actionTo: "/cart",
  },
  {
    id: "details",
    number: "04",
    icon: "✎",
    title: "Enter Your Details",
    shortDescription:
      "Provide the information required to prepare and identify your order.",
    details: [
      "Enter your full name, email address, and phone number.",
      "IIUM matric number and order notes are optional.",
      "Guest checkout is allowed, so no customer account is required.",
    ],
    tip:
      "Use an active email address and phone number so the Loopify team can contact you about pickup.",
  },
  {
    id: "pickup",
    number: "05",
    icon: "P",
    title: "Select Campus Pickup",
    shortDescription:
      "Choose an available date and time to collect your order.",
    details: [
      "All orders use campus pickup only.",
      "The pickup point is EDU Café.",
      "Choose an available pickup date and time during checkout.",
    ],
    tip:
      "Delivery is not currently available. Check your selected date and time carefully before placing the order.",
  },
  {
    id: "payment",
    number: "06",
    icon: "RM",
    title: "Choose Your Payment",
    shortDescription:
      "Pay using DuitNow QR or select cash payment during pickup.",
    details: [
      "For DuitNow QR, scan the displayed QR and pay the exact order total.",
      "Upload a JPG, PNG, or PDF receipt as payment proof.",
      "For cash, prepare the exact amount and pay when collecting the order.",
    ],
    tip:
      "A DuitNow order cannot continue without a valid receipt file. Cash-at-pickup orders do not require an upload.",
  },
  {
    id: "unbox",
    number: "07",
    icon: "?",
    title: "Collect and Unbox",
    shortDescription:
      "Collect your mystery package and discover your lucky charm.",
    details: [
      "Present your order information during campus pickup.",
      "Open the opaque Loopify packaging to reveal the collection.",
      "Your charm may be HyperBloomz, CosmicGlitz, AquaSurfz, or the secret HaloWhimpz.",
    ],
    tip:
      "Duplicate charms are possible because every box is randomly selected.",
    actionLabel: "Follow Unboxings on Instagram",
    actionHref:
      "https://www.instagram.com/loopify_charmies/",
  },
];

const orderChecklist = [
  {
    title: "Price",
    description: "RM7 for one mystery blind box.",
  },
  {
    title: "Purchase Limit",
    description: `Maximum ${MAX_BOXES_PER_ORDER} boxes per order.`,
  },
  {
    title: "Charm Selection",
    description:
      "The exact collection and design cannot be selected.",
  },
  {
    title: "Pickup",
    description: "Campus pickup at EDU Café only.",
  },
  {
    title: "Payment",
    description:
      "DuitNow QR with receipt upload or cash at pickup.",
  },
  {
    title: "Secret Charm",
    description:
      "HaloWhimpz is rare and is not guaranteed.",
  },
];

export default function HowItWorks() {
  const [activeStepIndex, setActiveStepIndex] =
    useState(0);

  const mysteryProduct = products[0];
  const productPrice = mysteryProduct?.price ?? 7;
  const activeStep = processSteps[activeStepIndex];

  const progressPercentage =
    ((activeStepIndex + 1) / processSteps.length) *
    100;

  return (
    <>
      <section className="how-hero page-section">
        <div className="how-hero-copy">
          <p className="eyebrow">
            LOOPIFY_PROCESS.EXE
          </p>

          <h1>How It Works</h1>

          <p className="how-hero-description">
            Click, collect, and unbox. Follow the
            complete Loopify journey from exploring the
            collections to revealing your mystery phone
            charm.
          </p>

          <div className="how-hero-actions">
            <Link
              className="button button-primary"
              to="/shop"
            >
              Get a Blind Box —{" "}
              {formatCurrency(productPrice)}
            </Link>

            <a
              className="button button-secondary"
              href="#complete-process"
            >
              View All Steps
            </a>
          </div>

          <div className="how-hero-facts">
            <span>RM7 per box</span>
            <span>Maximum {MAX_BOXES_PER_ORDER} boxes</span>
            <span>Campus pickup</span>
            <span>Random design</span>
          </div>
        </div>

        <div className="how-hero-window">
          <div className="computer-window">
            <div className="window-title-bar">
              <span>mystery_order_loading.exe</span>

              <div aria-hidden="true">
                <span>—</span>
                <span>□</span>
                <span>×</span>
              </div>
            </div>

            <div className="how-hero-visual">
              <div className="how-collection-preview">
                {regularCollections.map(
                  (collection) => (
                    <div
                      className="how-mini-collection"
                      key={collection.id}
                    >
                      <img
                        src={collection.image}
                        alt=""
                        aria-hidden="true"
                      />

                      <span>
                        {collection.shortName}
                      </span>
                    </div>
                  ),
                )}

                <div className="how-mini-collection how-mini-secret">
                  <span aria-hidden="true">?</span>
                  <strong>SECRET</strong>
                </div>
              </div>

              <p>Preparing your mystery journey...</p>

              <div
                className="how-loading-track"
                aria-hidden="true"
              >
                <span />
              </div>

              <strong>
                7 customer steps detected
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section
        id="complete-process"
        className="how-process page-section"
        aria-labelledby="how-process-heading"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              COMPLETE_ORDER_PROCESS
            </p>

            <h2 id="how-process-heading">
              From click to unbox
            </h2>
          </div>

          <p>
            Select a step to view its instructions.
          </p>
        </div>

        <div className="how-progress-panel">
          <div className="how-progress-heading">
            <span>
              Current step: {activeStep.number}
            </span>

            <span>
              {activeStepIndex + 1} of{" "}
              {processSteps.length}
            </span>
          </div>

          <div
            className="how-progress-track"
            role="progressbar"
            aria-label="Loopify order process progress"
            aria-valuemin="1"
            aria-valuemax={processSteps.length}
            aria-valuenow={activeStepIndex + 1}
          >
            <span
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>
        </div>

        <div className="how-process-layout">
          <ol
            className="how-step-list"
            aria-label="Loopify order steps"
          >
            {processSteps.map((step, index) => (
              <li key={step.id}>
                <button
                  className={[
                    "how-step-button",
                    index === activeStepIndex
                      ? "is-active"
                      : "",
                    index < activeStepIndex
                      ? "is-complete"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  type="button"
                  aria-pressed={
                    index === activeStepIndex
                  }
                  aria-controls="how-step-detail"
                  onClick={() =>
                    setActiveStepIndex(index)
                  }
                >
                  <span className="how-step-number">
                    {step.number}
                  </span>

                  <span className="how-step-icon">
                    {step.icon}
                  </span>

                  <span className="how-step-button-copy">
                    <strong>{step.title}</strong>
                    <small>
                      {step.shortDescription}
                    </small>
                  </span>

                  <span
                    className="how-step-arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <section
            id="how-step-detail"
            className="how-step-detail"
            aria-live="polite"
            aria-labelledby="active-step-heading"
          >
            <div className="window-title-bar">
              <span>
                step_{activeStep.number}.exe
              </span>

              <div aria-hidden="true">
                <span>—</span>
                <span>□</span>
                <span>×</span>
              </div>
            </div>

            <div className="how-step-detail-content">
              <div className="how-step-detail-header">
                <span aria-hidden="true">
                  {activeStep.icon}
                </span>

                <div>
                  <p className="eyebrow">
                    STEP_{activeStep.number}
                  </p>

                  <h3 id="active-step-heading">
                    {activeStep.title}
                  </h3>
                </div>
              </div>

              <p className="how-step-summary">
                {activeStep.shortDescription}
              </p>

              <ul className="how-detail-list">
                {activeStep.details.map(
                  (detail) => (
                    <li key={detail}>
                      {detail}
                    </li>
                  ),
                )}
              </ul>

              <div className="how-step-tip">
                <strong>Helpful note</strong>
                <p>{activeStep.tip}</p>
              </div>

              {activeStep.actionTo && (
                <Link
                  className="button button-primary"
                  to={activeStep.actionTo}
                >
                  {activeStep.actionLabel}
                </Link>
              )}

              {activeStep.actionHref && (
                <a
                  className="button button-primary"
                  href={activeStep.actionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {activeStep.actionLabel} ↗
                </a>
              )}

              <div className="how-detail-navigation">
                <button
                  className="button button-secondary"
                  type="button"
                  disabled={activeStepIndex === 0}
                  onClick={() =>
                    setActiveStepIndex(
                      (currentIndex) =>
                        Math.max(
                          0,
                          currentIndex - 1,
                        ),
                    )
                  }
                >
                  Previous Step
                </button>

                <button
                  className="button button-secondary"
                  type="button"
                  disabled={
                    activeStepIndex ===
                    processSteps.length - 1
                  }
                  onClick={() =>
                    setActiveStepIndex(
                      (currentIndex) =>
                        Math.min(
                          processSteps.length - 1,
                          currentIndex + 1,
                        ),
                    )
                  }
                >
                  Next Step
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section
        id="pickup-payment"
        className="how-pickup-payment page-section"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              PICKUP_AND_PAYMENT
            </p>

            <h2>Simple campus collection</h2>
          </div>
        </div>

        <div className="how-information-grid">
          <article className="how-information-card">
            <div
              className="how-information-icon"
              aria-hidden="true"
            >
              P
            </div>

            <h3>Campus Pickup Only</h3>

            <p>
              Collect your order from EDU Café near the
              Kulliyyah of Engineering and Education
              buildings.
            </p>

            <ul>
              <li>Select a pickup date.</li>
              <li>Select an available time.</li>
              <li>
                Bring your order information during
                collection.
              </li>
            </ul>
          </article>

          <article className="how-information-card">
            <div
              className="how-information-icon"
              aria-hidden="true"
            >
              QR
            </div>

            <h3>DuitNow QR</h3>

            <p>
              Scan the displayed Loopify QR code and pay
              the exact checkout total.
            </p>

            <ul>
              <li>Complete the payment.</li>
              <li>Save a clear payment receipt.</li>
              <li>
                Upload the receipt before continuing.
              </li>
            </ul>
          </article>

          <article className="how-information-card">
            <div
              className="how-information-icon"
              aria-hidden="true"
            >
              RM
            </div>

            <h3>Cash at Pickup</h3>

            <p>
              Select cash payment and pay when collecting
              your mystery boxes.
            </p>

            <ul>
              <li>No receipt upload is required.</li>
              <li>Prepare the exact order amount.</li>
              <li>Pay at the EDU Café pickup point.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="how-checklist page-section">
        <div className="how-checklist-heading">
          <div>
            <p className="eyebrow">
              BEFORE_YOU_ORDER.TXT
            </p>

            <h2>Important things to know</h2>
          </div>

          <p>
            Review these details before adding a mystery
            box to your bag.
          </p>
        </div>

        <div className="how-checklist-grid">
          {orderChecklist.map(
            (item, index) => (
              <article
                className="how-checklist-card"
                key={item.title}
              >
                <span>
                  {String(index + 1).padStart(
                    2,
                    "0",
                  )}
                </span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </article>
            ),
          )}
        </div>
      </section>

      <section className="how-random-reminder page-section">
        <div className="computer-window">
          <div className="window-title-bar">
            <span>blind_box_reminder.txt</span>

            <div aria-hidden="true">
              <span>—</span>
              <span>□</span>
              <span>×</span>
            </div>
          </div>

          <div className="how-random-reminder-content">
            <div
              className="how-reminder-symbol"
              aria-hidden="true"
            >
              ?
            </div>

            <div>
              <p className="eyebrow">
                MYSTERY_SELECTION
              </p>

              <h2>
                The surprise is part of the experience
              </h2>

              <p>
                Each blind box contains one randomly
                selected Loopify charm. The exact design
                and collection cannot be selected before
                opening, and duplicate charms are
                possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-final-cta page-section">
        <div>
          <p className="eyebrow">
            READY_TO_START
          </p>

          <h2>Your lucky charm is one click away</h2>

          <p>
            Choose between one and{" "}
            {MAX_BOXES_PER_ORDER} boxes at{" "}
            {formatCurrency(productPrice)} each, complete
            the pickup checkout, and prepare for the
            mystery reveal.
          </p>
        </div>

        <div className="how-final-actions">
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
            Explore Collections
          </Link>
        </div>
      </section>
    </>
  );
}