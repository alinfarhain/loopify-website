import { useEffect, useState } from "react";
import { Link } from "react-router";

const faqCategories = [
  {
    id: "all",
    label: "All Questions",
    icon: "★",
  },
  {
    id: "product",
    label: "Product",
    icon: "?",
  },
  {
    id: "orders",
    label: "Orders & Pickup",
    icon: "P",
  },
  {
    id: "payment",
    label: "Payment",
    icon: "RM",
  },
  {
    id: "support",
    label: "Support",
    icon: "!",
  },
];

const faqItems = [
  {
    id: "what-is-loopify-blind-box",
    category: "product",
    question: "What is a Loopify blind box?",
    answer:
      "A Loopify blind box contains one randomly selected Y2K-inspired phone charm. The charm is packed inside mystery packaging, so the exact design remains hidden until the customer opens it.",
  },
  {
    id: "what-is-included",
    category: "product",
    question: "What is included in one blind box?",
    answer:
      "Each blind box includes one randomly selected Loopify phone charm, Loopify mystery packaging, a branded sticker where available, a quality-checked attachment loop, and a chance to receive the secret HaloWhimpz charm.",
  },
  {
    id: "choose-exact-charm",
    category: "product",
    question: "Can I choose the exact charm?",
    answer:
      "No. Loopify is a mystery blind-box product, so customers cannot choose or guarantee a particular charm or collection before opening the package.",
  },
  {
    id: "possible-collections",
    category: "product",
    question: "Which collections can I receive?",
    answer:
      "The regular collection possibilities are HyperBloomz.exe, CosmicGlitz.exe, and AquaSurfz.exe. Selected blind boxes may also contain the classified HaloWhimpz.exe secret charm.",
  },
  {
    id: "secret-charm",
    category: "product",
    question: "What is the secret charm?",
    answer:
      "HaloWhimpz.exe is Loopify's ultra-rare secret cyber-angel charm. Its full appearance remains hidden to preserve the surprise of the blind-box experience.",
  },
  {
    id: "secret-probability",
    category: "product",
    question: "What is the secret charm probability?",
    answer:
      "The estimated chance of receiving the secret charm is approximately 14% for the current drop. This is an estimate and does not guarantee that a particular order will contain HaloWhimpz.",
  },
  {
    id: "duplicate-charms",
    category: "product",
    question: "Can I receive duplicate charms?",
    answer:
      "Yes. Every box is randomly selected, so customers who purchase more than one box or place repeated orders may receive duplicate charms.",
  },
  {
    id: "phone-compatibility",
    category: "product",
    question: "Can the charm be used on any phone?",
    answer:
      "The charm can be used with most phone cases that include a suitable attachment opening or charm loop. Customers should confirm that their phone case can securely support a phone charm before attaching it.",
  },
  {
    id: "care-instructions",
    category: "product",
    question: "How should I care for my Loopify charm?",
    answer:
      "Keep the charm away from excessive force, sharp objects, prolonged moisture, and extreme heat. Check the attachment regularly and avoid pulling the charm with excessive force.",
  },
  {
    id: "price",
    category: "orders",
    question: "How much does one blind box cost?",
    answer:
      "One Loopify Mystery Blind Box costs RM7. The price is shown before checkout and the total updates automatically based on the selected quantity.",
  },
  {
    id: "maximum-quantity",
    category: "orders",
    question: "How many boxes can I purchase?",
    answer:
      "Customers may purchase between one and three blind boxes in a single order. The website prevents the cart quantity from exceeding three boxes.",
  },
  {
    id: "order-total",
    category: "orders",
    question: "What are the possible order totals?",
    answer:
      "One box costs RM7, two boxes cost RM14, and three boxes cost RM21. Campus pickup is free.",
  },
  {
    id: "account-required",
    category: "orders",
    question: "Do I need an account to order?",
    answer:
      "No. Loopify supports guest checkout, so customers can place an order without creating an account.",
  },
  {
    id: "pickup-location",
    category: "orders",
    question: "Where can I collect my order?",
    answer:
      "All orders are collected at EDU Café, near the Kulliyyah of Engineering and Education buildings. The selected pickup date and time are shown during checkout and on the order confirmation.",
  },
  {
    id: "pickup-schedule",
    category: "orders",
    question: "How do I choose a pickup schedule?",
    answer:
      "During checkout, select an available campus pickup date and time. Review the selected schedule carefully before placing the order.",
  },
  {
    id: "delivery-available",
    category: "orders",
    question: "Is delivery available?",
    answer:
      "No. Loopify currently provides campus pickup at EDU Café only. Delivery and shipping options are not available.",
  },
  {
    id: "missed-pickup",
    category: "orders",
    question: "What happens if I miss my pickup time?",
    answer:
      "Contact Loopify through Instagram as soon as possible and provide your order number. The team will advise whether another pickup arrangement is available.",
  },
  {
    id: "order-changes",
    category: "orders",
    question: "Can I change my order after placing it?",
    answer:
      "Contact Loopify immediately with your order number. Changes are not guaranteed once the mystery boxes have been prepared, but the team will review the request where possible.",
  },
  {
    id: "accepted-payments",
    category: "payment",
    question: "Which payment methods are accepted?",
    answer:
      "Loopify accepts DuitNow QR payment and cash at pickup. FPX, card payments, and other e-wallet payment options are not currently offered through the website.",
  },
  {
    id: "duitnow-process",
    category: "payment",
    question: "How does DuitNow QR payment work?",
    answer:
      "Select DuitNow QR during checkout, scan the displayed Loopify QR code, pay the exact order amount, and upload a clear payment receipt before continuing to the review step.",
  },
  {
    id: "receipt-required",
    category: "payment",
    question: "Do I need to upload a DuitNow receipt?",
    answer:
      "Yes. A receipt is required when DuitNow QR is selected. The website accepts JPG, JPEG, PNG, or PDF files up to 5 MB.",
  },
  {
    id: "cash-payment",
    category: "payment",
    question: "How does cash at pickup work?",
    answer:
      "Select Cash at Pickup during checkout. No receipt upload is required. Prepare the exact order amount and pay when collecting the order at EDU Café.",
  },
  {
    id: "payment-verification",
    category: "payment",
    question: "Is a DuitNow payment confirmed immediately?",
    answer:
      "Uploading a receipt submits payment proof for verification. The Loopify team may need to review the receipt before treating the payment as confirmed.",
  },
  {
    id: "wrong-payment",
    category: "payment",
    question: "What should I do if I pay the wrong amount?",
    answer:
      "Contact Loopify immediately and provide your order number and payment receipt. Do not make another payment until the team responds with instructions.",
  },
  {
    id: "damaged-charm",
    category: "support",
    question: "What should I do if my charm is damaged?",
    answer:
      "Contact Loopify as soon as possible. Provide your order number, a clear description of the issue, and photographs of the charm and packaging. The team will review the problem and advise the available solution.",
  },
  {
    id: "faulty-attachment",
    category: "support",
    question: "What if the attachment loop is faulty?",
    answer:
      "Stop using the charm to avoid losing it. Contact Loopify with your order number and a clear photograph or video showing the attachment problem.",
  },
  {
    id: "return-exchange",
    category: "support",
    question: "Can I return a charm because I do not like the design?",
    answer:
      "A change of preference is generally not accepted because the product is sold as a random blind box. However, significant damage or a faulty attachment should be reported to Loopify for review.",
  },
  {
    id: "duplicate-support",
    category: "support",
    question: "What can I do if I receive a duplicate?",
    answer:
      "Duplicates are possible. Customers can connect with the Loopify community, share their collection, or use the Charm Swap feature when arranging a consent-based trade with another collector.",
  },
  {
    id: "contact-loopify",
    category: "support",
    question: "How can I contact Loopify?",
    answer:
      "You can contact Loopify through the Contact and Support page or send a direct message to the official Instagram account, @loopify_charmies.",
  },
  {
    id: "next-collection",
    category: "support",
    question: "When will the next collection launch?",
    answer:
      "Future collection announcements, polls, secret hints, and campus updates will be shared through the Loopify Community page and the official Instagram account.",
  },
];

function normaliseText(value) {
  return value.trim().toLowerCase();
}

export default function FAQ() {
  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("all");

  const [openFaqId, setOpenFaqId] =
    useState(faqItems[0].id);

  const normalisedSearch =
    normaliseText(searchTerm);

  const filteredFaqs = faqItems.filter(
    (faq) => {
      const matchesCategory =
        selectedCategory === "all" ||
        faq.category === selectedCategory;

      const searchableText =
        `${faq.question} ${faq.answer} ${faq.category}`.toLowerCase();

      const matchesSearch =
        !normalisedSearch ||
        searchableText.includes(
          normalisedSearch,
        );

      return (
        matchesCategory &&
        matchesSearch
      );
    },
  );

  useEffect(() => {
    const previousTitle =
      document.title;

    document.title =
      "FAQ | Loopify Charmies";

    const existingSchema =
      document.getElementById(
        "loopify-faq-schema",
      );

    if (existingSchema) {
      existingSchema.remove();
    }

    const schemaScript =
      document.createElement("script");

    schemaScript.id =
      "loopify-faq-schema";

    schemaScript.type =
      "application/ld+json";

    schemaScript.textContent =
      JSON.stringify({
        "@context":
          "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map(
          (faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          }),
        ),
      });

    document.head.appendChild(
      schemaScript,
    );

    return () => {
      document.title =
        previousTitle;

      const currentSchema =
        document.getElementById(
          "loopify-faq-schema",
        );

      if (currentSchema) {
        currentSchema.remove();
      }
    };
  }, []);

  function toggleFaq(faqId) {
    setOpenFaqId(
      (currentFaqId) =>
        currentFaqId === faqId
          ? ""
          : faqId,
    );
  }

  function selectCategory(categoryId) {
    setSelectedCategory(categoryId);
    setOpenFaqId("");
  }

  function clearFilters() {
    setSearchTerm("");
    setSelectedCategory("all");
    setOpenFaqId(faqItems[0].id);
  }

  return (
    <>
      <section className="faq-hero page-section">
        <div className="faq-hero-copy">
          <p className="eyebrow">
            LOOPIFY_HELP_CENTER.EXE
          </p>

          <h1>Frequently Asked Questions</h1>

          <p className="faq-hero-description">
            Find clear answers about Loopify
            mystery boxes, campus pickup,
            payment, secret charms, and
            customer support.
          </p>

          <div className="faq-hero-actions">
            <a
              className="button button-primary"
              href="#faq-directory"
            >
              Browse Questions
            </a>

            <Link
              className="button button-secondary"
              to="/contact"
            >
              Contact Support
            </Link>
          </div>

          <div className="faq-hero-facts">
            <span>RM7 per box</span>
            <span>Maximum 3 boxes</span>
            <span>Campus pickup only</span>
            <span>DuitNow or cash</span>
          </div>
        </div>

        <div className="faq-hero-window">
          <div className="computer-window">
            <div className="window-title-bar">
              <span>
                help_search.exe
              </span>

              <div aria-hidden="true">
                <span>—</span>
                <span>□</span>
                <span>×</span>
              </div>
            </div>

            <div className="faq-hero-visual">
              <div
                className="faq-hero-symbol"
                aria-hidden="true"
              >
                ?
              </div>

              <p>
                Searching Loopify support
                files...
              </p>

              <div
                className="faq-loading-track"
                aria-hidden="true"
              >
                <span />
              </div>

              <strong>
                {faqItems.length} answers
                available
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-quick-guide page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              QUICK_ANSWER_FILES
            </p>

            <h2>
              Essential information
            </h2>
          </div>
        </div>

        <div className="faq-quick-grid">
          <article className="faq-quick-card">
            <div
              className="faq-quick-icon"
              aria-hidden="true"
            >
              ?
            </div>

            <h3>Mystery Product</h3>

            <p>
              Every RM7 box contains one
              randomly selected phone charm.
              Exact designs cannot be chosen.
            </p>

            <Link
              className="text-link"
              to="/collections"
            >
              View possible collections →
            </Link>
          </article>

          <article className="faq-quick-card">
            <div
              className="faq-quick-icon"
              aria-hidden="true"
            >
              P
            </div>

            <h3>Campus Pickup</h3>

            <p>
              All orders are collected at EDU
              Café. Delivery and shipping are
              not available.
            </p>

            <Link
              className="text-link"
              to="/how-it-works"
            >
              View the order process →
            </Link>
          </article>

          <article className="faq-quick-card">
            <div
              className="faq-quick-icon"
              aria-hidden="true"
            >
              QR
            </div>

            <h3>Payment</h3>

            <p>
              Pay using DuitNow QR with a
              receipt upload or select cash at
              pickup.
            </p>

            <a
              className="text-link"
              href="#payment-questions"
            >
              View payment questions →
            </a>
          </article>

          <article className="faq-quick-card">
            <div
              className="faq-quick-icon"
              aria-hidden="true"
            >
              !
            </div>

            <h3>Need Support?</h3>

            <p>
              Contact Loopify with your order
              number if your charm is damaged
              or your pickup needs attention.
            </p>

            <Link
              className="text-link"
              to="/contact"
            >
              Contact Loopify →
            </Link>
          </article>
        </div>
      </section>

      <section
        id="faq-directory"
        className="faq-directory page-section"
        aria-labelledby="faq-directory-heading"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              QUESTION_DIRECTORY
            </p>

            <h2 id="faq-directory-heading">
              How can we help?
            </h2>
          </div>

          <p>
            Search or select a category.
          </p>
        </div>

        <div className="faq-search-panel">
          <div className="faq-search-field">
            <label htmlFor="faq-search">
              Search FAQ
            </label>

            <div className="faq-search-input-row">
              <input
                id="faq-search"
                type="search"
                value={searchTerm}
                placeholder="Search pickup, payment, secret charm..."
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value,
                  )
                }
              />

              {searchTerm && (
                <button
                  type="button"
                  aria-label="Clear FAQ search"
                  onClick={() =>
                    setSearchTerm("")
                  }
                >
                  Clear
                </button>
              )}
            </div>

            <small>
              Search questions and answers
              using simple keywords.
            </small>
          </div>

          <div
            className="faq-category-list"
            aria-label="FAQ categories"
          >
            {faqCategories.map(
              (category) => (
                <button
                  className={`faq-category-button ${
                    selectedCategory ===
                    category.id
                      ? "is-active"
                      : ""
                  }`}
                  type="button"
                  aria-pressed={
                    selectedCategory ===
                    category.id
                  }
                  onClick={() =>
                    selectCategory(
                      category.id,
                    )
                  }
                  key={category.id}
                >
                  <span aria-hidden="true">
                    {category.icon}
                  </span>

                  <strong>
                    {category.label}
                  </strong>
                </button>
              ),
            )}
          </div>
        </div>

        <div className="faq-results-heading">
          <p aria-live="polite">
            Showing{" "}
            <strong>
              {filteredFaqs.length}
            </strong>{" "}
            {filteredFaqs.length === 1
              ? "question"
              : "questions"}
          </p>

          {(searchTerm ||
            selectedCategory !==
              "all") && (
            <button
              className="faq-clear-filter"
              type="button"
              onClick={clearFilters}
            >
              Clear search and filters
            </button>
          )}
        </div>

        {filteredFaqs.length > 0 ? (
          <div className="faq-accordion-list">
            {filteredFaqs.map(
              (faq, index) => {
                const isOpen =
                  openFaqId === faq.id;

                const answerId =
                  `faq-answer-${faq.id}`;

                const buttonId =
                  `faq-button-${faq.id}`;

                return (
                  <article
                    id={
                      faq.category ===
                        "payment" &&
                      index === 0
                        ? "payment-questions"
                        : undefined
                    }
                    className={`faq-accordion-item ${
                      isOpen
                        ? "is-open"
                        : ""
                    }`}
                    key={faq.id}
                  >
                    <h3>
                      <button
                        id={buttonId}
                        className="faq-accordion-button"
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={
                          answerId
                        }
                        onClick={() =>
                          toggleFaq(
                            faq.id,
                          )
                        }
                      >
                        <span className="faq-question-number">
                          {String(
                            faqItems.indexOf(
                              faq,
                            ) + 1,
                          ).padStart(2, "0")}
                        </span>

                        <span className="faq-question-text">
                          {faq.question}
                        </span>

                        <span
                          className="faq-accordion-symbol"
                          aria-hidden="true"
                        >
                          {isOpen
                            ? "−"
                            : "+"}
                        </span>
                      </button>
                    </h3>

                    <div
                      id={answerId}
                      className="faq-accordion-answer"
                      role="region"
                      aria-labelledby={
                        buttonId
                      }
                      hidden={!isOpen}
                    >
                      <p>{faq.answer}</p>

                      <span className="faq-answer-category">
                        Category:{" "}
                        {
                          faqCategories.find(
                            (category) =>
                              category.id ===
                              faq.category,
                          )?.label
                        }
                      </span>
                    </div>
                  </article>
                );
              },
            )}
          </div>
        ) : (
          <div className="faq-empty-state">
            <span aria-hidden="true">
              ?
            </span>

            <p className="eyebrow">
              NO_RESULTS_FOUND
            </p>

            <h3>
              We could not find that answer
            </h3>

            <p>
              Try a shorter keyword, choose a
              different category, or contact
              Loopify support.
            </p>

            <div className="faq-empty-actions">
              <button
                className="button button-secondary"
                type="button"
                onClick={clearFilters}
              >
                Show All Questions
              </button>

              <Link
                className="button button-primary"
                to="/contact"
              >
                Contact Support
              </Link>
            </div>
          </div>
        )}
      </section>

      <section className="faq-important-notice page-section">
        <div className="computer-window">
          <div className="window-title-bar">
            <span>
              mystery_box_notice.txt
            </span>

            <div aria-hidden="true">
              <span>—</span>
              <span>□</span>
              <span>×</span>
            </div>
          </div>

          <div className="faq-notice-content">
            <div
              className="faq-notice-symbol"
              aria-hidden="true"
            >
              !
            </div>

            <div>
              <p className="eyebrow">
                IMPORTANT_REMINDER
              </p>

              <h2>
                Every charm is a surprise
              </h2>

              <p>
                Each blind box contains one
                randomly selected charm. The
                exact design cannot be selected
                before opening, and duplicate
                charms are possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-support-options page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              SUPPORT_DIRECTORY
            </p>

            <h2>
              Still need help?
            </h2>
          </div>
        </div>

        <div className="faq-support-grid">
          <article className="faq-support-card">
            <span aria-hidden="true">
              @
            </span>

            <h3>Instagram Support</h3>

            <p>
              Send a direct message to the
              official Loopify Instagram
              account.
            </p>

            <a
              className="button button-secondary"
              href="https://www.instagram.com/loopify_charmies/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Instagram ↗
            </a>
          </article>

          <article className="faq-support-card">
            <span aria-hidden="true">
              ✎
            </span>

            <h3>Contact Form</h3>

            <p>
              Send an order, pickup, payment,
              or product-support inquiry through
              the website.
            </p>

            <Link
              className="button button-secondary"
              to="/contact"
            >
              Contact Loopify
            </Link>
          </article>

          <article className="faq-support-card">
            <span aria-hidden="true">
              ↔
            </span>

            <h3>Duplicate Charm</h3>

            <p>
              Visit the community or Charm Swap
              page to learn about consent-based
              collector trading.
            </p>

            <Link
              className="button button-secondary"
              to="/charm-swap"
            >
              Visit Charm Swap
            </Link>
          </article>
        </div>
      </section>

      <section className="faq-final-cta page-section">
        <div>
          <p className="eyebrow">
            READY_TO_UNBOX
          </p>

          <h2>
            Your next charm is hiding
          </h2>

          <p>
            Choose between one and three RM7
            mystery boxes, select your campus
            pickup schedule, and discover which
            Loopify collection chooses you.
          </p>
        </div>

        <div className="faq-final-actions">
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