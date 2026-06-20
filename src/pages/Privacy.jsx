import { useEffect } from "react";
import { Link } from "react-router";

const LAST_UPDATED = "21 June 2026";

const policyDirectory = [
  {
    id: "overview",
    label: "Privacy Overview",
  },
  {
    id: "information-collected",
    label: "Information We Collect",
  },
  {
    id: "browser-storage",
    label: "Browser Storage",
  },
  {
    id: "information-use",
    label: "How Information Is Used",
  },
  {
    id: "payment-information",
    label: "Payment Information",
  },
  {
    id: "external-services",
    label: "External Services",
  },
  {
    id: "cookies-analytics",
    label: "Cookies and Analytics",
  },
  {
    id: "retention-security",
    label: "Retention and Security",
  },
  {
    id: "privacy-choices",
    label: "Your Privacy Choices",
  },
  {
    id: "policy-changes",
    label: "Changes to This Policy",
  },
  {
    id: "privacy-contact",
    label: "Contact Loopify",
  },
];

export default function Privacy() {
  useEffect(() => {
    const previousTitle = document.title;

    document.title =
      "Privacy Policy | Loopify Charmies";

    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <>
      <section className="privacy-hero page-section">
        <div className="privacy-hero-copy">
          <p className="eyebrow">
            PRIVACY_POLICY.TXT
          </p>

          <h1>Privacy Policy</h1>

          <p className="privacy-hero-description">
            This page explains what information the
            Loopify website uses, why it is needed,
            where it may be stored, and the choices
            available to customers.
          </p>

          <div className="privacy-hero-actions">
            <a
              className="button button-primary"
              href="#privacy-directory"
            >
              Read the Policy
            </a>

            <Link
              className="button button-secondary"
              to="/contact"
            >
              Contact Support
            </Link>
          </div>

          <div className="privacy-hero-facts">
            <span>Academic prototype</span>
            <span>No account required</span>
            <span>Browser-based storage</span>
            <span>Clear privacy information</span>
          </div>
        </div>

        <div className="privacy-hero-window">
          <div className="computer-window">
            <div className="window-title-bar">
              <span>
                privacy_status.exe
              </span>

              <div aria-hidden="true">
                <span>—</span>
                <span>□</span>
                <span>×</span>
              </div>
            </div>

            <div className="privacy-hero-visual">
              <div
                className="privacy-lock-symbol"
                aria-hidden="true"
              >
                <span>●</span>
                <strong>PRIVACY</strong>
              </div>

              <p>
                Checking Loopify privacy files...
              </p>

              <div
                className="privacy-loading-track"
                aria-hidden="true"
              >
                <span />
              </div>

              <strong>
                Privacy information available
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className="privacy-summary page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              PRIVACY_SUMMARY
            </p>

            <h2>Important information at a glance</h2>
          </div>

          <p>
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        <div className="privacy-summary-grid">
          <article className="privacy-summary-card">
            <span aria-hidden="true">01</span>

            <h3>Guest Checkout</h3>

            <p>
              Customers do not need to create an
              account before purchasing a mystery
              blind box.
            </p>
          </article>

          <article className="privacy-summary-card">
            <span aria-hidden="true">02</span>

            <h3>Limited Information</h3>

            <p>
              The website requests only information
              needed for orders, campus pickup,
              payment, support, or community features.
            </p>
          </article>

          <article className="privacy-summary-card">
            <span aria-hidden="true">03</span>

            <h3>Browser Storage</h3>

            <p>
              Some prototype data, such as the cart,
              reviews, and poll selections, may be
              saved locally in the customer’s browser.
            </p>
          </article>

          <article className="privacy-summary-card">
            <span aria-hidden="true">04</span>

            <h3>External Services</h3>

            <p>
              WhatsApp, Instagram, and the website
              hosting provider may process information
              under their own privacy terms.
            </p>
          </article>
        </div>
      </section>

      <section
        id="privacy-directory"
        className="privacy-directory page-section"
      >
        <aside
          className="privacy-navigation"
          aria-label="Privacy Policy sections"
        >
          <div className="window-title-bar">
            <span>
              policy_directory.exe
            </span>

            <div aria-hidden="true">
              <span>—</span>
              <span>□</span>
              <span>×</span>
            </div>
          </div>

          <div className="privacy-navigation-content">
            <p className="eyebrow">
              CONTENTS
            </p>

            <ol>
              {policyDirectory.map(
                (section, index) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>
                      <span>
                        {String(index + 1).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      {section.label}
                    </a>
                  </li>
                ),
              )}
            </ol>
          </div>
        </aside>

        <article className="privacy-policy-content">
          <section
            id="overview"
            className="privacy-policy-section"
          >
            <p className="eyebrow">
              SECTION_01
            </p>

            <h2>Privacy Overview</h2>

            <p>
              Loopify Charmies is a student-run
              lifestyle brand selling mystery
              blind-box phone charms. This Privacy
              Policy explains how information may be
              collected and used when a customer
              browses the website, places an order,
              participates in the community, or
              contacts the Loopify team.
            </p>

            <p>
              The current website is an academic
              e-commerce prototype. Some functions
              demonstrate the intended customer
              experience without connecting to a
              permanent production database.
            </p>

            <div className="privacy-highlight">
              <strong>Prototype notice</strong>

              <p>
                Features such as community reviews,
                polls, shopping-cart information, and
                other preferences may be stored only
                in the visitor’s own browser.
              </p>
            </div>
          </section>

          <section
            id="information-collected"
            className="privacy-policy-section"
          >
            <p className="eyebrow">
              SECTION_02
            </p>

            <h2>Information We Collect</h2>

            <p>
              The website may request information
              when customers complete checkout, submit
              a community review, participate in a
              poll, or prepare a support message.
            </p>

            <h3>Checkout information</h3>

            <ul>
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone or WhatsApp number</li>
              <li>Optional IIUM matric number</li>
              <li>Optional order notes</li>
              <li>Selected campus pickup date and time</li>
              <li>Selected payment method</li>
              <li>
                Payment receipt file when DuitNow QR
                is selected
              </li>
            </ul>

            <h3>Support information</h3>

            <ul>
              <li>Customer name</li>
              <li>Customer WhatsApp number</li>
              <li>Optional order number</li>
              <li>Inquiry category</li>
              <li>Support message</li>
            </ul>

            <h3>Community information</h3>

            <ul>
              <li>Display name</li>
              <li>Collection received</li>
              <li>Customer rating</li>
              <li>Review text</li>
              <li>Poll selections</li>
            </ul>

            <p>
              Customers should not submit passwords,
              banking login credentials, identity
              documents, or other unnecessary
              sensitive information.
            </p>
          </section>

          <section
            id="browser-storage"
            className="privacy-policy-section"
          >
            <p className="eyebrow">
              SECTION_03
            </p>

            <h2>Information Stored in Your Browser</h2>

            <p>
              The Loopify prototype uses browser
              storage, including local storage, to
              support interactive features without
              requiring a customer account.
            </p>

            <p>
              Information that may be stored locally
              includes:
            </p>

            <ul>
              <li>Shopping-cart contents</li>
              <li>Selected quantities</li>
              <li>Community review submissions</li>
              <li>Community poll selections</li>
              <li>
                Limited preferences required for
                prototype interactions
              </li>
            </ul>

            <p>
              This information stays on the device and
              browser where it was created unless the
              customer clears the browser’s site data,
              uses private browsing, or removes the
              information through browser settings.
            </p>

            <div className="privacy-browser-example">
              <div aria-hidden="true">DEVICE</div>

              <div>
                <strong>
                  Stored locally
                </strong>

                <p>
                  Browser storage is separate for each
                  device and browser. A cart created on
                  one phone may not appear on another
                  device.
                </p>
              </div>
            </div>
          </section>

          <section
            id="information-use"
            className="privacy-policy-section"
          >
            <p className="eyebrow">
              SECTION_04
            </p>

            <h2>How Information Is Used</h2>

            <p>
              Customer information may be used for the
              following purposes:
            </p>

            <ul>
              <li>
                To prepare and manage mystery-box
                orders
              </li>

              <li>
                To calculate the correct order quantity
                and total
              </li>

              <li>
                To arrange campus pickup at EDU Café
              </li>

              <li>
                To identify and respond to customer
                support requests
              </li>

              <li>
                To review DuitNow payment evidence
              </li>

              <li>
                To display community reviews submitted
                with consent
              </li>

              <li>
                To record prototype poll selections
              </li>

              <li>
                To improve the website experience and
                understand common customer questions
              </li>
            </ul>

            <p>
              Loopify should not use customer
              information for unrelated purposes
              without informing the customer.
            </p>
          </section>

          <section
            id="payment-information"
            className="privacy-policy-section"
          >
            <p className="eyebrow">
              SECTION_05
            </p>

            <h2>Payment Information</h2>

            <p>
              Loopify currently provides two payment
              options: DuitNow QR and cash at campus
              pickup.
            </p>

            <h3>DuitNow QR</h3>

            <p>
              Customers selecting DuitNow QR may be
              asked to upload a payment receipt. A
              receipt may contain the payer’s name,
              payment amount, transaction time, or
              transaction reference.
            </p>

            <p>
              Customers should upload only the receipt
              required to verify the order and should
              avoid including unrelated account
              information.
            </p>

            <h3>Cash at pickup</h3>

            <p>
              Customers selecting cash at pickup do
              not need to upload payment evidence.
              Payment is made when collecting the order
              at EDU Café.
            </p>

            <div className="privacy-warning">
              <strong>Important</strong>

              <p>
                Loopify does not ask customers to
                provide online-banking passwords,
                security codes, card PINs, or banking
                login credentials.
              </p>
            </div>
          </section>

          <section
            id="external-services"
            className="privacy-policy-section"
          >
            <p className="eyebrow">
              SECTION_06
            </p>

            <h2>External Services</h2>

            <p>
              The website contains links to services
              operated by other companies. When a
              customer opens an external service, that
              provider may collect information under
              its own terms and privacy policy.
            </p>

            <div className="privacy-service-grid">
              <article>
                <span aria-hidden="true">
                  WA
                </span>

                <h3>WhatsApp</h3>

                <p>
                  The support form prepares a WhatsApp
                  message. The customer must review and
                  send the message through WhatsApp.
                </p>
              </article>

              <article>
                <span aria-hidden="true">
                  @
                </span>

                <h3>Instagram</h3>

                <p>
                  Customers may open Instagram to
                  follow, message, or view content from
                  @loopify_charmies.
                </p>
              </article>

              <article>
                <span aria-hidden="true">
                  WEB
                </span>

                <h3>Website Hosting</h3>

                <p>
                  The website is hosted through Vercel,
                  which may process technical
                  information needed to deliver the
                  website.
                </p>
              </article>
            </div>

            <p>
              Loopify does not control the independent
              privacy practices of external services.
            </p>
          </section>

          <section
            id="cookies-analytics"
            className="privacy-policy-section"
          >
            <p className="eyebrow">
              SECTION_07
            </p>

            <h2>Cookies and Analytics</h2>

            <p>
              The current Loopify prototype does not
              intentionally use advertising cookies or
              behavioural advertising tools.
            </p>

            <p>
              Browser local storage is used for
              selected interactive features. Local
              storage is different from a traditional
              advertising cookie, but it still stores
              information on the customer’s device.
            </p>

            <p>
              Basic technical information may also be
              handled automatically by the hosting
              service when the website is loaded. This
              can include information such as browser
              type, device type, request time, and
              general technical logs.
            </p>

            <p>
              If analytics, advertising tools, or
              additional cookies are added later, this
              policy and any cookie notice should be
              updated before those tools are used.
            </p>
          </section>

          <section
            id="retention-security"
            className="privacy-policy-section"
          >
            <p className="eyebrow">
              SECTION_08
            </p>

            <h2>Data Retention and Security</h2>

            <h3>Browser data</h3>

            <p>
              Information stored in the customer’s
              browser remains there until it is
              removed, cleared through browser
              settings, or automatically deleted by
              the browser.
            </p>

            <h3>WhatsApp and Instagram messages</h3>

            <p>
              Messages sent through WhatsApp or
              Instagram remain subject to the storage
              and retention practices of those
              services and the Loopify team’s account
              management.
            </p>

            <h3>Prototype information</h3>

            <p>
              The current prototype does not provide a
              complete production database or
              long-term order-management system.
              Features may therefore behave
              differently from a final commercial
              website.
            </p>

            <p>
              Reasonable care should be taken to
              protect customer information, but no
              online service can guarantee absolute
              security.
            </p>
          </section>

          <section
            id="privacy-choices"
            className="privacy-policy-section"
          >
            <p className="eyebrow">
              SECTION_09
            </p>

            <h2>Your Privacy Choices</h2>

            <p>
              Customers may take the following actions:
            </p>

            <ul>
              <li>
                Choose not to submit optional
                information
              </li>

              <li>
                Clear Loopify site data through browser
                settings
              </li>

              <li>
                Use private browsing to reduce local
                storage persistence
              </li>

              <li>
                Contact Loopify to correct an order or
                support message
              </li>

              <li>
                Ask Loopify about information submitted
                through WhatsApp or Instagram
              </li>

              <li>
                Avoid submitting a public community
                review
              </li>
            </ul>

            <p>
              Some information is necessary to prepare
              an order or answer a support request. If
              required information is not provided,
              Loopify may be unable to complete that
              service.
            </p>

            <Link
              className="button button-secondary"
              to="/contact"
            >
              Contact Loopify About Privacy
            </Link>
          </section>

          <section
            id="policy-changes"
            className="privacy-policy-section"
          >
            <p className="eyebrow">
              SECTION_10
            </p>

            <h2>Changes to This Policy</h2>

            <p>
              This policy may be updated when the
              website adds new features, changes how
              information is handled, or introduces
              new third-party services.
            </p>

            <p>
              The latest revision date will be shown
              near the top of the page. Customers
              should review the updated policy when
              major website changes are introduced.
            </p>
          </section>

          <section
            id="privacy-contact"
            className="privacy-policy-section"
          >
            <p className="eyebrow">
              SECTION_11
            </p>

            <h2>Contact Loopify</h2>

            <p>
              Questions about this Privacy Policy can
              be submitted through the Loopify Contact
              and Support page.
            </p>

            <div className="privacy-contact-options">
              <a
                className="button button-primary"
                href="https://wa.me/60129717470"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Support ↗
              </a>

              <a
                className="button button-secondary"
                href="https://www.instagram.com/loopify_charmies/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram ↗
              </a>

              <Link
                className="button button-secondary"
                to="/contact"
              >
                Support Form
              </Link>
            </div>
          </section>
        </article>
      </section>

      <section className="privacy-prototype-notice page-section">
        <div className="computer-window">
          <div className="window-title-bar">
            <span>
              legal_notice.txt
            </span>

            <div aria-hidden="true">
              <span>—</span>
              <span>□</span>
              <span>×</span>
            </div>
          </div>

          <div className="privacy-notice-content">
            <div
              className="privacy-notice-symbol"
              aria-hidden="true"
            >
              !
            </div>

            <div>
              <p className="eyebrow">
                ACADEMIC_PROTOTYPE
              </p>

              <h2>
                This policy supports the current
                prototype
              </h2>

              <p>
                The wording describes the features
                currently demonstrated by the Loopify
                website. It should be reviewed and
                updated before the website processes
                real customer information at a larger
                commercial scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="privacy-final-cta page-section">
        <div>
          <p className="eyebrow">
            PRIVACY_SUPPORT
          </p>

          <h2>Need more information?</h2>

          <p>
            Contact the Loopify team if you have a
            question about your order, browser data,
            support message, or community submission.
          </p>
        </div>

        <div className="privacy-final-actions">
          <Link
            className="button button-primary"
            to="/contact"
          >
            Contact Support
          </Link>

          <Link
            className="button button-secondary"
            to="/faq"
          >
            Read the FAQ
          </Link>
        </div>
      </section>
    </>
  );
}