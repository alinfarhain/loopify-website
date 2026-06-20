import { useEffect } from "react";
import { Link } from "react-router";

import { products } from "../data/products.js";
import { formatCurrency } from "../utils/formatCurrency.js";

const LAST_UPDATED = "21 June 2026";
const MAX_BOXES_PER_ORDER = 3;

const termsDirectory = [
  {
    id: "acceptance",
    label: "Acceptance of Terms",
  },
  {
    id: "prototype-status",
    label: "Prototype Status",
  },
  {
    id: "product-information",
    label: "Product Information",
  },
  {
    id: "pricing-quantity",
    label: "Pricing and Quantity",
  },
  {
    id: "orders",
    label: "Orders",
  },
  {
    id: "payment",
    label: "Payment",
  },
  {
    id: "campus-pickup",
    label: "Campus Pickup",
  },
  {
    id: "changes-cancellations",
    label: "Changes and Cancellations",
  },
  {
    id: "damaged-products",
    label: "Damaged or Faulty Products",
  },
  {
    id: "duplicates",
    label: "Duplicates and Preferences",
  },
  {
    id: "product-care",
    label: "Product Care and Safety",
  },
  {
    id: "community-content",
    label: "Community Content",
  },
  {
    id: "website-use",
    label: "Acceptable Website Use",
  },
  {
    id: "external-services",
    label: "External Services",
  },
  {
    id: "intellectual-property",
    label: "Intellectual Property",
  },
  {
    id: "privacy",
    label: "Privacy",
  },
  {
    id: "responsibility",
    label: "Responsibility and Consumer Rights",
  },
  {
    id: "changes-to-terms",
    label: "Changes to These Terms",
  },
  {
    id: "contact",
    label: "Contact Loopify",
  },
];

export default function Terms() {
  const mysteryProduct = products[0];
  const productPrice = mysteryProduct?.price ?? 7;

  useEffect(() => {
    const previousTitle = document.title;

    document.title =
      "Terms and Conditions | Loopify Charmies";

    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <>
      <section className="terms-hero page-section">
        <div className="terms-hero-copy">
          <p className="eyebrow">
            TERMS_AND_CONDITIONS.TXT
          </p>

          <h1>Terms and Conditions</h1>

          <p className="terms-hero-description">
            These Terms explain the rules that apply
            when browsing the Loopify website,
            purchasing a mystery blind box, arranging
            campus pickup, making payment, or using
            community features.
          </p>

          <div className="terms-hero-actions">
            <a
              className="button button-primary"
              href="#terms-directory"
            >
              Read the Terms
            </a>

            <Link
              className="button button-secondary"
              to="/contact"
            >
              Contact Support
            </Link>
          </div>

          <div className="terms-hero-facts">
            <span>
              {formatCurrency(productPrice)} per box
            </span>

            <span>
              Maximum {MAX_BOXES_PER_ORDER} boxes
            </span>

            <span>Random charm selection</span>
            <span>Campus pickup only</span>
          </div>
        </div>

        <div className="terms-hero-window">
          <div className="computer-window">
            <div className="window-title-bar">
              <span>
                customer_agreement.exe
              </span>

              <div aria-hidden="true">
                <span>—</span>
                <span>□</span>
                <span>×</span>
              </div>
            </div>

            <div className="terms-hero-visual">
              <div
                className="terms-document-symbol"
                aria-hidden="true"
              >
                <span>✓</span>
                <strong>TERMS</strong>
              </div>

              <p>
                Loading customer terms...
              </p>

              <div
                className="terms-loading-track"
                aria-hidden="true"
              >
                <span />
              </div>

              <strong>
                Agreement file available
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className="terms-summary page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              TERMS_SUMMARY
            </p>

            <h2>
              Important rules at a glance
            </h2>
          </div>

          <p>
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        <div className="terms-summary-grid">
          <article className="terms-summary-card">
            <span aria-hidden="true">01</span>

            <h3>Mystery Product</h3>

            <p>
              Each box contains one randomly
              selected charm. Exact designs cannot
              be selected before opening.
            </p>
          </article>

          <article className="terms-summary-card">
            <span aria-hidden="true">02</span>

            <h3>Order Limit</h3>

            <p>
              Customers may order between one and{" "}
              {MAX_BOXES_PER_ORDER} mystery boxes
              per order.
            </p>
          </article>

          <article className="terms-summary-card">
            <span aria-hidden="true">03</span>

            <h3>Payment</h3>

            <p>
              Payment is made through DuitNow QR
              with receipt evidence or cash at
              pickup.
            </p>
          </article>

          <article className="terms-summary-card">
            <span aria-hidden="true">04</span>

            <h3>Campus Pickup</h3>

            <p>
              Orders must be collected at EDU Café
              during the selected pickup schedule.
            </p>
          </article>
        </div>
      </section>

      <section
        id="terms-directory"
        className="terms-directory page-section"
      >
        <aside
          className="terms-navigation"
          aria-label="Terms and Conditions sections"
        >
          <div className="window-title-bar">
            <span>
              terms_directory.exe
            </span>

            <div aria-hidden="true">
              <span>—</span>
              <span>□</span>
              <span>×</span>
            </div>
          </div>

          <div className="terms-navigation-content">
            <p className="eyebrow">
              CONTENTS
            </p>

            <ol>
              {termsDirectory.map(
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

        <article className="terms-policy-content">
          <section
            id="acceptance"
            className="terms-policy-section"
          >
            <p className="eyebrow">
              SECTION_01
            </p>

            <h2>Acceptance of These Terms</h2>

            <p>
              By accessing the Loopify Charmies
              website, adding a product to the cart,
              submitting an order, or using a
              community or support feature, the user
              agrees to follow these Terms and
              Conditions.
            </p>

            <p>
              Customers should read the Terms before
              placing an order. A customer who does
              not agree with these Terms should not
              submit an order through the website.
            </p>
          </section>

          <section
            id="prototype-status"
            className="terms-policy-section"
          >
            <p className="eyebrow">
              SECTION_02
            </p>

            <h2>Academic Prototype Status</h2>

            <p>
              The current Loopify website is
              developed as an IIUM Technopreneurship
              Project. It demonstrates a complete
              customer-facing e-commerce experience
              for a student-run mystery phone-charm
              business.
            </p>

            <p>
              Certain features operate as front-end
              prototype interactions. This may include
              browser-stored cart information,
              community reviews, polls, checkout
              information, and order-status examples.
            </p>

            <div className="terms-highlight">
              <strong>Prototype reminder</strong>

              <p>
                The website should not be treated as
                a full production order-management,
                payment-processing, or database
                platform unless those systems are
                connected separately.
              </p>
            </div>
          </section>

          <section
            id="product-information"
            className="terms-policy-section"
          >
            <p className="eyebrow">
              SECTION_03
            </p>

            <h2>Product Information</h2>

            <p>
              Loopify sells Y2K-themed mystery
              blind-box phone charms. Each box
              contains one randomly selected phone
              charm.
            </p>

            <p>
              Possible regular collections include:
            </p>

            <ul>
              <li>HyperBloomz.exe</li>
              <li>CosmicGlitz.exe</li>
              <li>AquaSurfz.exe</li>
            </ul>

            <p>
              Selected boxes may contain the
              HaloWhimpz.exe secret charm. The secret
              charm is rare and is not guaranteed in
              any individual order.
            </p>

            <div className="terms-warning">
              <strong>Important blind-box disclosure</strong>

              <p>
                The exact charm design and collection
                cannot be selected before opening the
                package.
              </p>
            </div>

            <p>
              Product photographs and illustrations
              are intended to represent possible
              styles. Small differences in colour,
              finish, shape, packaging, or appearance
              may occur.
            </p>
          </section>

          <section
            id="pricing-quantity"
            className="terms-policy-section"
          >
            <p className="eyebrow">
              SECTION_04
            </p>

            <h2>Pricing and Quantity Limits</h2>

            <p>
              One Loopify Mystery Blind Box costs{" "}
              {formatCurrency(productPrice)}.
            </p>

            <ul>
              <li>
                One box:{" "}
                {formatCurrency(productPrice)}
              </li>

              <li>
                Two boxes:{" "}
                {formatCurrency(productPrice * 2)}
              </li>

              <li>
                Three boxes:{" "}
                {formatCurrency(productPrice * 3)}
              </li>
            </ul>

            <p>
              Customers may purchase a maximum of{" "}
              {MAX_BOXES_PER_ORDER} boxes in one
              order. The website may prevent the cart
              from exceeding this quantity.
            </p>

            <p>
              Prices may be updated for future
              collections or promotions. The price
              displayed during checkout applies to
              that order unless an obvious website or
              calculation error has occurred.
            </p>
          </section>

          <section
            id="orders"
            className="terms-policy-section"
          >
            <p className="eyebrow">
              SECTION_05
            </p>

            <h2>Orders</h2>

            <p>
              Customers must provide information that
              is accurate enough for the Loopify team
              to identify, prepare, and arrange pickup
              for the order.
            </p>

            <p>
              Required information may include:
            </p>

            <ul>
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Selected pickup date and time</li>
              <li>Selected payment method</li>
            </ul>

            <p>
              An optional IIUM matric number and order
              note may also be provided.
            </p>

            <p>
              Submitting the checkout form does not
              guarantee product availability. An order
              may need to be reviewed before it is
              prepared.
            </p>

            <p>
              Loopify may contact the customer if
              information is missing, unclear, or
              inconsistent.
            </p>
          </section>

          <section
            id="payment"
            className="terms-policy-section"
          >
            <p className="eyebrow">
              SECTION_06
            </p>

            <h2>Payment</h2>

            <p>
              Loopify currently accepts:
            </p>

            <ul>
              <li>DuitNow QR payment</li>
              <li>Cash at campus pickup</li>
            </ul>

            <h3>DuitNow QR</h3>

            <p>
              Customers selecting DuitNow QR should
              pay the exact checkout total and upload
              a clear payment receipt in the accepted
              file format.
            </p>

            <p>
              Uploading a receipt does not by itself
              guarantee that payment has been
              verified. The Loopify team may review
              the receipt before confirming payment.
            </p>

            <h3>Cash at pickup</h3>

            <p>
              Customers selecting cash at pickup
              should prepare the exact order amount
              and pay when collecting the order at
              EDU Café.
            </p>

            <div className="terms-warning">
              <strong>Payment safety</strong>

              <p>
                Loopify does not request online-banking
                passwords, card PINs, one-time security
                codes, or banking login credentials.
              </p>
            </div>
          </section>

          <section
            id="campus-pickup"
            className="terms-policy-section"
          >
            <p className="eyebrow">
              SECTION_07
            </p>

            <h2>Campus Pickup</h2>

            <p>
              Loopify currently provides campus
              pickup at EDU Café, near the Kulliyyah
              of Engineering and Education buildings.
            </p>

            <p>
              Delivery and shipping are not currently
              available through the website.
            </p>

            <p>
              Customers are responsible for:
            </p>

            <ul>
              <li>
                Selecting an available pickup date
                and time
              </li>

              <li>
                Reviewing the pickup schedule before
                confirming the order
              </li>

              <li>
                Arriving at the agreed pickup point
              </li>

              <li>
                Providing sufficient order details
                during collection
              </li>
            </ul>

            <p>
              Customers who cannot attend the selected
              pickup schedule should contact Loopify
              as early as possible. An alternative
              arrangement is not guaranteed.
            </p>
          </section>

          <section
            id="changes-cancellations"
            className="terms-policy-section"
          >
            <p className="eyebrow">
              SECTION_08
            </p>

            <h2>Order Changes and Cancellations</h2>

            <p>
              Customers who need to change or cancel
              an order should contact Loopify through
              WhatsApp as soon as possible and provide
              the order number.
            </p>

            <p>
              A requested change or cancellation may
              not be possible after:
            </p>

            <ul>
              <li>
                The mystery boxes have been prepared
              </li>

              <li>
                The payment has been reviewed
              </li>

              <li>
                The order has been marked ready for
                pickup
              </li>
            </ul>

            <p>
              Any approved refund or alternative
              arrangement should be communicated
              directly by the Loopify team.
            </p>
          </section>

          <section
            id="damaged-products"
            className="terms-policy-section"
          >
            <p className="eyebrow">
              SECTION_09
            </p>

            <h2>Damaged or Faulty Products</h2>

            <p>
              Customers should inspect the charm and
              attachment after opening the package.
            </p>

            <p>
              A customer who receives a significantly
              damaged product or faulty attachment
              should contact Loopify as soon as
              reasonably possible and provide:
            </p>

            <ul>
              <li>The order number</li>
              <li>A description of the problem</li>
              <li>
                Clear photographs or video of the
                charm
              </li>
              <li>
                Photographs of the packaging where
                relevant
              </li>
            </ul>

            <p>
              Loopify will review the information and
              communicate the available solution.
              Solutions may depend on the nature of
              the issue and available replacement
              stock.
            </p>
          </section>

          <section
            id="duplicates"
            className="terms-policy-section"
          >
            <p className="eyebrow">
              SECTION_10
            </p>

            <h2>Duplicates and Design Preferences</h2>

            <p>
              Because each box is randomly selected,
              customers may receive duplicate charms
              when purchasing multiple boxes or
              placing repeated orders.
            </p>

            <p>
              Receiving a duplicate, a particular
              colour, or a design that does not match
              the customer’s personal preference does
              not automatically mean the product is
              faulty.
            </p>

            <p>
              Customers may use the Loopify community
              or Charm Swap feature to explore a
              voluntary trade with another collector.
            </p>

            <p>
              Loopify does not guarantee that a trade
              partner or preferred charm will be
              available.
            </p>
          </section>

          <section
            id="product-care"
            className="terms-policy-section"
          >
            <p className="eyebrow">
              SECTION_11
            </p>

            <h2>Product Care and Safety</h2>

            <p>
              Customers should use the charm carefully
              and check that the phone case or device
              has a suitable attachment point.
            </p>

            <p>
              Customers should:
            </p>

            <ul>
              <li>
                Avoid pulling the charm with excessive
                force
              </li>

              <li>
                Keep the charm away from sharp objects
                and extreme heat
              </li>

              <li>
                Avoid prolonged exposure to moisture
              </li>

              <li>
                Check the attachment loop regularly
              </li>

              <li>
                Stop using the charm if the attachment
                becomes loose or damaged
              </li>
            </ul>

            <p>
              The charm is an accessory and should not
              be treated as protective equipment for
              the phone.
            </p>
          </section>

          <section
            id="community-content"
            className="terms-policy-section"
          >
            <p className="eyebrow">
              SECTION_12
            </p>

            <h2>Community Reviews and Submissions</h2>

            <p>
              Customers may submit reviews, ratings,
              poll selections, unboxing content, or
              other community contributions.
            </p>

            <p>
              Submitted content should:
            </p>

            <ul>
              <li>Be honest and relevant</li>
              <li>Be respectful to other users</li>
              <li>
                Avoid abusive, discriminatory, or
                threatening language
              </li>

              <li>
                Avoid disclosing another person’s
                private information
              </li>

              <li>
                Avoid sharing banking details,
                passwords, or identity documents
              </li>

              <li>
                Avoid infringing another person’s
                copyright or other rights
              </li>
            </ul>

            <p>
              Loopify may choose not to display or may
              remove community content that does not
              follow these rules.
            </p>

            <p>
              Prototype community submissions may be
              stored only in the user’s browser and
              may not be visible to other visitors.
            </p>
          </section>

          <section
            id="website-use"
            className="terms-policy-section"
          >
            <p className="eyebrow">
              SECTION_13
            </p>

            <h2>Acceptable Website Use</h2>

            <p>
              Users must not intentionally:
            </p>

            <ul>
              <li>
                Interfere with the operation or
                security of the website
              </li>

              <li>
                Submit false, misleading, or harmful
                information
              </li>

              <li>
                Attempt to access another customer’s
                information
              </li>

              <li>
                Use automated tools to overload or
                misuse website features
              </li>

              <li>
                Copy or republish Loopify content as
                though it belongs to another brand
              </li>

              <li>
                Use the support form for spam,
                harassment, or unlawful activity
              </li>
            </ul>

            <p>
              Access to a feature may be limited where
              necessary to protect the website, the
              Loopify team, or other users.
            </p>
          </section>

          <section
            id="external-services"
            className="terms-policy-section"
          >
            <p className="eyebrow">
              SECTION_14
            </p>

            <h2>External Services and Links</h2>

            <p>
              The website may provide links to
              services operated by other providers,
              including:
            </p>

            <ul>
              <li>WhatsApp</li>
              <li>Instagram</li>
              <li>Vercel website hosting</li>
            </ul>

            <p>
              External services operate under their
              own terms, privacy policies, technical
              availability, and account requirements.
            </p>

            <p>
              Loopify does not control the operation
              or content of independent third-party
              services.
            </p>
          </section>

          <section
            id="intellectual-property"
            className="terms-policy-section"
          >
            <p className="eyebrow">
              SECTION_15
            </p>

            <h2>Intellectual Property</h2>

            <p>
              The Loopify name, LC logo, collection
              names, original text, graphics, page
              design, and other original brand
              materials belong to their respective
              owners or creators.
            </p>

            <p>
              Website visitors may view the content
              for personal and academic demonstration
              purposes.
            </p>

            <p>
              Users should not reproduce, sell,
              falsely claim ownership of, or create
              misleading copies of Loopify materials
              without permission.
            </p>
          </section>

          <section
            id="privacy"
            className="terms-policy-section"
          >
            <p className="eyebrow">
              SECTION_16
            </p>

            <h2>Privacy</h2>

            <p>
              Information submitted through checkout,
              community features, WhatsApp support,
              Instagram, or browser storage is
              addressed in the Loopify Privacy Policy.
            </p>

            <p>
              Customers should review the Privacy
              Policy before providing personal
              information.
            </p>

            <Link
              className="button button-secondary"
              to="/privacy"
            >
              Read the Privacy Policy
            </Link>
          </section>

          <section
            id="responsibility"
            className="terms-policy-section"
          >
            <p className="eyebrow">
              SECTION_17
            </p>

            <h2>
              Responsibility and Consumer Rights
            </h2>

            <p>
              Loopify aims to provide accurate
              product, price, payment, and pickup
              information. However, temporary website
              errors, unavailable stock, incorrect
              customer information, or external
              service interruptions may affect the
              experience.
            </p>

            <p>
              Customers are responsible for checking
              their order information, payment method,
              pickup schedule, and contact details
              before placing an order.
            </p>

            <p>
              Nothing in these Terms is intended to
              exclude, restrict, or remove any
              consumer right or responsibility that
              cannot lawfully be excluded under
              applicable Malaysian law.
            </p>
          </section>

          <section
            id="changes-to-terms"
            className="terms-policy-section"
          >
            <p className="eyebrow">
              SECTION_18
            </p>

            <h2>Changes to These Terms</h2>

            <p>
              Loopify may update these Terms when the
              website, products, pricing, payment
              process, pickup arrangements, or
              community features change.
            </p>

            <p>
              The latest revision date will appear
              near the top of this page.
            </p>

            <p>
              Customers should review the current
              Terms before placing a new order.
            </p>
          </section>

          <section
            id="contact"
            className="terms-policy-section"
          >
            <p className="eyebrow">
              SECTION_19
            </p>

            <h2>Contact Loopify</h2>

            <p>
              Questions about these Terms, an order,
              payment, product problem, or campus
              pickup can be submitted through the
              Loopify Contact and Support page.
            </p>

            <div className="terms-contact-options">
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

      <section className="terms-prototype-notice page-section">
        <div className="computer-window">
          <div className="window-title-bar">
            <span>
              terms_notice.txt
            </span>

            <div aria-hidden="true">
              <span>—</span>
              <span>□</span>
              <span>×</span>
            </div>
          </div>

          <div className="terms-notice-content">
            <div
              className="terms-notice-symbol"
              aria-hidden="true"
            >
              !
            </div>

            <div>
              <p className="eyebrow">
                IIUM_PROJECT_NOTICE
              </p>

              <h2>
                Terms for the current prototype
              </h2>

              <p>
                These Terms describe the current
                Loopify website and business concept
                developed for an IIUM
                Technopreneurship Project. They should
                be reviewed before the website is used
                as a larger commercial platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="terms-final-cta page-section">
        <div>
          <p className="eyebrow">
            CUSTOMER_SUPPORT
          </p>

          <h2>Have a question about an order?</h2>

          <p>
            Read the FAQ or contact the Loopify team
            through WhatsApp, Instagram, or the
            website support form.
          </p>
        </div>

        <div className="terms-final-actions">
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