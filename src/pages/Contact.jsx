import { useEffect, useState } from "react";
import { Link } from "react-router";

const WHATSAPP_NUMBER = "60129717470";

const WHATSAPP_DIRECT_URL =
  `https://wa.me/${WHATSAPP_NUMBER}`;

const INSTAGRAM_URL =
  "https://www.instagram.com/loopify_charmies/";

const initialForm = {
  name: "",
  whatsappNumber: "",
  orderNumber: "",
  category: "",
  message: "",
  consent: false,
};

const inquiryCategories = [
  "Order status",
  "Campus pickup",
  "DuitNow payment",
  "Cash payment",
  "Damaged charm",
  "Faulty attachment",
  "Duplicate charm",
  "Product question",
  "Other support",
];

function FieldError({ message }) {
  if (!message) {
    return null;
  }

  return (
    <span className="field-error" role="alert">
      {message}
    </span>
  );
}

function cleanPhoneNumber(value) {
  return value.replace(/[^\d]/g, "");
}

export default function Contact() {
  const [formData, setFormData] =
    useState(initialForm);

  const [formErrors, setFormErrors] =
    useState({});

  const [submissionMessage, setSubmissionMessage] =
    useState("");

  useEffect(() => {
    const previousTitle = document.title;

    document.title =
      "Contact and Support | Loopify Charmies";

    return () => {
      document.title = previousTitle;
    };
  }, []);

  function updateField(event) {
    const {
      name,
      type,
      checked,
      value,
    } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    if (formErrors[name]) {
      setFormErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }

    if (submissionMessage) {
      setSubmissionMessage("");
    }
  }

  function validateForm() {
    const nextErrors = {};

    if (formData.name.trim().length < 2) {
      nextErrors.name =
        "Enter your name.";
    }

    const cleanedNumber =
      cleanPhoneNumber(
        formData.whatsappNumber,
      );

    if (!cleanedNumber) {
      nextErrors.whatsappNumber =
        "Enter your WhatsApp number.";
    } else if (
      cleanedNumber.length < 9 ||
      cleanedNumber.length > 15
    ) {
      nextErrors.whatsappNumber =
        "Enter a valid WhatsApp number using 9 to 15 digits.";
    }

    if (!formData.category) {
      nextErrors.category =
        "Select an inquiry category.";
    }

    if (
      formData.message.trim().length < 15
    ) {
      nextErrors.message =
        "Explain your inquiry using at least 15 characters.";
    }

    if (!formData.consent) {
      nextErrors.consent =
        "Confirm that you understand the message must be sent through WhatsApp.";
    }

    return nextErrors;
  }

  function createWhatsAppMessage() {
    const orderNumber =
      formData.orderNumber.trim() ||
      "Not provided";

    return [
      "Hello Loopify Charmies! I need support.",
      "",
      `Name: ${formData.name.trim()}`,
      `Customer WhatsApp: ${formData.whatsappNumber.trim()}`,
      `Order number: ${orderNumber}`,
      `Inquiry category: ${formData.category}`,
      "",
      "Message:",
      formData.message.trim(),
      "",
      "This message was prepared through the Loopify website support form.",
    ].join("\n");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateForm();

    if (
      Object.keys(nextErrors).length > 0
    ) {
      setFormErrors(nextErrors);
      setSubmissionMessage("");

      const firstInvalidField =
        Object.keys(nextErrors)[0];

      document
        .querySelector(
          `[name="${firstInvalidField}"]`,
        )
        ?.focus();

      return;
    }

    const supportMessage =
      createWhatsAppMessage();

    const whatsappUrl =
      `${WHATSAPP_DIRECT_URL}?text=` +
      encodeURIComponent(
        supportMessage,
      );

    setFormErrors({});

    setSubmissionMessage(
      "Your support message is ready. WhatsApp has been opened—review the message and tap Send.",
    );

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer",
    );
  }

  function resetForm() {
    setFormData(initialForm);
    setFormErrors({});
    setSubmissionMessage("");
  }

  return (
    <>
      <section className="contact-hero page-section">
        <div className="contact-hero-copy">
          <p className="eyebrow">
            LOOPIFY_SUPPORT.EXE
          </p>

          <h1>Contact and Support</h1>

          <p className="contact-hero-description">
            Need help with an order, payment,
            campus pickup, or charm? Contact the
            Loopify student team through WhatsApp,
            Instagram, or the support form.
          </p>

          <div className="contact-hero-actions">
            <a
              className="button button-primary"
              href={WHATSAPP_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp ↗
            </a>

            <a
              className="button button-secondary"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message on Instagram ↗
            </a>
          </div>

          <div className="contact-hero-facts">
            <span>WhatsApp support</span>
            <span>Instagram messages</span>
            <span>Order assistance</span>
            <span>Campus pickup help</span>
          </div>
        </div>

        <div className="contact-hero-window">
          <div className="computer-window">
            <div className="window-title-bar">
              <span>
                support_connection.exe
              </span>

              <div aria-hidden="true">
                <span>—</span>
                <span>□</span>
                <span>×</span>
              </div>
            </div>

            <div className="contact-hero-visual">
              <div className="contact-support-symbols">
                <div>
                  <span aria-hidden="true">
                    WA
                  </span>

                  <strong>WhatsApp</strong>
                </div>

                <div>
                  <span aria-hidden="true">
                    @
                  </span>

                  <strong>Instagram</strong>
                </div>

                <div>
                  <span aria-hidden="true">
                    ✎
                  </span>

                  <strong>Support Form</strong>
                </div>
              </div>

              <p>
                Connecting to Loopify support...
              </p>

              <div
                className="contact-loading-track"
                aria-hidden="true"
              >
                <span />
              </div>

              <strong>
                Support channels online
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section
        className="contact-channel-section page-section"
        aria-labelledby="contact-channel-heading"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              SUPPORT_CHANNELS
            </p>

            <h2 id="contact-channel-heading">
              Choose how to reach us
            </h2>
          </div>

          <p>
            The Loopify team is student-run,
            so response times may vary.
          </p>
        </div>

        <div className="contact-channel-grid">
          <article className="contact-channel-card contact-whatsapp-card">
            <div
              className="contact-channel-icon"
              aria-hidden="true"
            >
              WA
            </div>

            <p className="eyebrow">
              WHATSAPP_SUPPORT
            </p>

            <h3>Chat with Loopify</h3>

            <p>
              Use WhatsApp for order questions,
              pickup assistance, payment support,
              damaged charms, or faulty attachments.
            </p>

            <dl className="contact-channel-details">
              <div>
                <dt>Number</dt>
                <dd>+60 12-971 7470</dd>
              </div>

              <div>
                <dt>Best for</dt>
                <dd>
                  Orders, payment, and pickup
                </dd>
              </div>
            </dl>

            <a
              className="button button-primary"
              href={WHATSAPP_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open WhatsApp ↗
            </a>
          </article>

          <article className="contact-channel-card contact-instagram-card">
            <div
              className="contact-channel-icon"
              aria-hidden="true"
            >
              @
            </div>

            <p className="eyebrow">
              INSTAGRAM_SUPPORT
            </p>

            <h3>
              Message @loopify_charmies
            </h3>

            <p>
              Use Instagram for product questions,
              collection updates, unboxing posts,
              community content, and general messages.
            </p>

            <dl className="contact-channel-details">
              <div>
                <dt>Account</dt>
                <dd>@loopify_charmies</dd>
              </div>

              <div>
                <dt>Best for</dt>
                <dd>
                  Products and community updates
                </dd>
              </div>
            </dl>

            <a
              className="button button-secondary"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Instagram ↗
            </a>
          </article>
        </div>
      </section>

      <section
        id="support-form"
        className="contact-form-section page-section"
        aria-labelledby="contact-form-heading"
      >
        <div className="contact-form-introduction">
          <p className="eyebrow">
            SUPPORT_FORM.EXE
          </p>

          <h2 id="contact-form-heading">
            Prepare a support message
          </h2>

          <p>
            Complete this form and the website
            will prepare a structured WhatsApp
            message for the Loopify team.
          </p>

          <div className="contact-form-explanation">
            <strong>
              How this form works
            </strong>

            <ol>
              <li>
                Enter your support information.
              </li>

              <li>
                Select the inquiry category.
              </li>

              <li>
                Submit the form to open WhatsApp.
              </li>

              <li>
                Review the message and tap Send.
              </li>
            </ol>
          </div>

          <div className="contact-privacy-notice">
            <strong>
              Protect your information
            </strong>

            <p>
              Do not include passwords, banking
              login details, identification
              documents, or other sensitive
              personal information.
            </p>
          </div>
        </div>

        <form
          className="contact-support-form"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="window-title-bar">
            <span>
              new_support_request.exe
            </span>

            <div aria-hidden="true">
              <span>—</span>
              <span>□</span>
              <span>×</span>
            </div>
          </div>

          <div className="contact-support-form-content">
            <div className="form-grid contact-form-grid">
              <div className="form-field">
                <label htmlFor="support-name">
                  Full name *
                </label>

                <input
                  id="support-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  aria-invalid={Boolean(
                    formErrors.name,
                  )}
                  onChange={updateField}
                />

                <FieldError
                  message={formErrors.name}
                />
              </div>

              <div className="form-field">
                <label htmlFor="support-whatsapp">
                  Your WhatsApp number *
                </label>

                <input
                  id="support-whatsapp"
                  name="whatsappNumber"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="Example: 60123456789"
                  value={
                    formData.whatsappNumber
                  }
                  aria-invalid={Boolean(
                    formErrors.whatsappNumber,
                  )}
                  onChange={updateField}
                />

                <small>
                  Include the country code where
                  possible.
                </small>

                <FieldError
                  message={
                    formErrors.whatsappNumber
                  }
                />
              </div>

              <div className="form-field">
                <label htmlFor="support-order-number">
                  Order number
                </label>

                <input
                  id="support-order-number"
                  name="orderNumber"
                  type="text"
                  placeholder="Optional"
                  value={
                    formData.orderNumber
                  }
                  onChange={updateField}
                />

                <small>
                  Include this for existing order
                  inquiries.
                </small>
              </div>

              <div className="form-field">
                <label htmlFor="support-category">
                  Inquiry category *
                </label>

                <select
                  id="support-category"
                  name="category"
                  value={formData.category}
                  aria-invalid={Boolean(
                    formErrors.category,
                  )}
                  onChange={updateField}
                >
                  <option value="">
                    Select a category
                  </option>

                  {inquiryCategories.map(
                    (category) => (
                      <option
                        value={category}
                        key={category}
                      >
                        {category}
                      </option>
                    ),
                  )}
                </select>

                <FieldError
                  message={
                    formErrors.category
                  }
                />
              </div>

              <div className="form-field form-field-full">
                <label htmlFor="support-message">
                  How can we help? *
                </label>

                <textarea
                  id="support-message"
                  name="message"
                  rows="7"
                  maxLength="800"
                  placeholder="Describe the order, payment, pickup, or product issue clearly."
                  value={formData.message}
                  aria-invalid={Boolean(
                    formErrors.message,
                  )}
                  onChange={updateField}
                />

                <div className="contact-character-count">
                  <small>
                    Minimum 15 characters
                  </small>

                  <small>
                    {formData.message.length}/800
                  </small>
                </div>

                <FieldError
                  message={
                    formErrors.message
                  }
                />
              </div>
            </div>

            <label className="contact-consent">
              <input
                name="consent"
                type="checkbox"
                checked={formData.consent}
                onChange={updateField}
              />

              <span>
                I understand that this form
                prepares a WhatsApp message and
                that I must review and send the
                message through WhatsApp.
              </span>
            </label>

            <FieldError
              message={formErrors.consent}
            />

            <div className="contact-form-actions">
              <button
                className="button button-primary"
                type="submit"
              >
                Open Support Message in WhatsApp
              </button>

              <button
                className="button button-secondary"
                type="button"
                onClick={resetForm}
              >
                Clear Form
              </button>
            </div>

            <div
              className="contact-submission-status"
              aria-live="polite"
              aria-atomic="true"
            >
              {submissionMessage && (
                <>
                  <strong>
                    Support message prepared
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

      <section className="contact-help-section page-section">
        <div className="computer-window">
          <div className="window-title-bar">
            <span>
              before_contacting.txt
            </span>

            <div aria-hidden="true">
              <span>—</span>
              <span>□</span>
              <span>×</span>
            </div>
          </div>

          <div className="contact-help-content">
            <div
              className="contact-help-symbol"
              aria-hidden="true"
            >
              !
            </div>

            <div>
              <p className="eyebrow">
                SUPPORT_CHECKLIST
              </p>

              <h2>
                Help us understand the issue
              </h2>

              <ul>
                <li>
                  Include your order number when
                  asking about an existing order.
                </li>

                <li>
                  Explain what happened and when
                  the issue occurred.
                </li>

                <li>
                  For damaged products, send a
                  clear photo through WhatsApp.
                </li>

                <li>
                  Never send passwords or banking
                  login details.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-final-cta page-section">
        <div>
          <p className="eyebrow">
            SUPPORT_READY
          </p>

          <h2>
            Need a quick answer first?
          </h2>

          <p>
            Read the FAQ for information about
            mystery charms, payment, campus
            pickup, duplicates, and damaged
            products.
          </p>
        </div>

        <div className="contact-final-actions">
          <Link
            className="button button-primary"
            to="/faq"
          >
            Read the FAQ
          </Link>

          <a
            className="button button-secondary"
            href={WHATSAPP_DIRECT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open WhatsApp ↗
          </a>
        </div>
      </section>
    </>
  );
}