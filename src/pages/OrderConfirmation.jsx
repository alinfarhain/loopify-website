import { Link } from "react-router";

import { formatCurrency } from "../utils/formatCurrency.js";

function readLastOrder() {
  try {
    const storedOrder = localStorage.getItem(
      "loopify-last-order",
    );

    return storedOrder
      ? JSON.parse(storedOrder)
      : null;
  } catch (error) {
    console.error("Unable to read the last order:", error);
    return null;
  }
}

export default function OrderConfirmation() {
  const order = readLastOrder();

  if (!order) {
    return (
      <section className="empty-cart-page page-section">
        <div className="empty-cart-symbol" aria-hidden="true">
          ?
        </div>

        <p className="eyebrow">NO_ORDER_FILE</p>
        <h1>No recent order found</h1>

        <p>
          Complete a Loopify order to see its confirmation
          details here.
        </p>

        <Link
          className="button button-primary"
          to="/shop"
        >
          Visit the Shop
        </Link>
      </section>
    );
  }

  const orderDate = new Date(
    order.createdAt,
  ).toLocaleString("en-MY", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <section className="confirmation-page page-section">
      <div className="confirmation-animation" aria-hidden="true">
        ✓
      </div>

      <p className="eyebrow">ORDER_CONFIRMED</p>
      <h1>Your Lucky Charm Is Loading!</h1>

      <p className="confirmation-introduction">
        Thank you, {order.customer.fullName}. Your Loopify
        mystery order has been successfully created.
      </p>

      <div className="confirmation-grid">
        <article className="confirmation-card">
          <h2>Order Information</h2>

          <dl className="confirmation-list">
            <div>
              <dt>Order number</dt>
              <dd>{order.orderNumber}</dd>
            </div>

            <div>
              <dt>Order date</dt>
              <dd>{orderDate}</dd>
            </div>

            <div>
              <dt>Status</dt>
              <dd>{order.status}</dd>
            </div>

            <div>
              <dt>Mystery boxes</dt>
              <dd>{order.totalBoxes}</dd>
            </div>

            <div>
              <dt>Total</dt>
              <dd>
                {formatCurrency(order.subtotal)}
              </dd>
            </div>
          </dl>
        </article>

        <article className="confirmation-card">
          <h2>Fulfilment</h2>

          {order.fulfilment.method === "pickup" ? (
            <>
              <p>
                <strong>Campus Pickup</strong>
              </p>
              <p>EDU Café</p>
              <p>{order.fulfilment.pickupDate}</p>
              <p>{order.fulfilment.pickupTime}</p>
            </>
          ) : (
            <>
              <p>
                <strong>Delivery</strong>
              </p>
              <p>{order.fulfilment.addressLine}</p>
              <p>
                {order.fulfilment.postcode}{" "}
                {order.fulfilment.city},{" "}
                {order.fulfilment.state}
              </p>
            </>
          )}

          <p>
            Confirmation details should also be sent to:
          </p>

          <strong>{order.customer.email}</strong>
        </article>
      </div>

      <div className="order-progress">
        <div className="order-progress-item is-active">
          <span>1</span>
          <strong>Order confirmed</strong>
        </div>

        <div className="order-progress-line" />

        <div className="order-progress-item">
          <span>2</span>
          <strong>Preparing mystery pack</strong>
        </div>

        <div className="order-progress-line" />

        <div className="order-progress-item">
          <span>3</span>
          <strong>
            Ready for pickup or delivery
          </strong>
        </div>
      </div>

      <div className="confirmation-actions">
        <Link
          className="button button-primary"
          to="/shop"
        >
          Continue Shopping
        </Link>

        <Link
          className="button button-secondary"
          to="/"
        >
          Return Home
        </Link>
      </div>

      <div className="confirmation-notice">
        <strong>Prototype notice</strong>

        <p>
          This front-end prototype saves the order only in the
          current browser. A real public website requires a
          backend database, secure authentication, inventory
          management, email service, and verified payment
          gateway.
        </p>
      </div>
    </section>
  );
}