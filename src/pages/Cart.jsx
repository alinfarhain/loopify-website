import { Link } from "react-router";

import { useCart } from "../context/CartContext.jsx";
import { formatCurrency } from "../utils/formatCurrency.js";

export default function Cart() {
  const {
    cartItems,
    subtotal,
    totalBoxes,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  function handleClearCart() {
    const confirmed = window.confirm(
      "Remove all items from your Loopify cart?",
    );

    if (confirmed) {
      clearCart();
    }
  }

  if (cartItems.length === 0) {
    return (
      <section className="empty-cart-page page-section">
        <div className="empty-cart-symbol" aria-hidden="true">
          ?
        </div>

        <p className="eyebrow">SHOPPING_BAG_EMPTY</p>
        <h1>Your charm bag is empty</h1>

        <p>
          Add a mystery blind box and begin searching for your
          lucky charm.
        </p>

        <Link
          className="button button-primary"
          to="/shop"
        >
          Explore the Shop
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-page page-section">
      <div className="cart-page-heading">
        <div>
          <p className="eyebrow">SHOPPING_BAG.EXE</p>
          <h1>Your Charm Bag</h1>
        </div>

        <button
          className="cart-clear-button"
          type="button"
          onClick={handleClearCart}
        >
          Clear cart
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <article
              className="cart-item"
              key={item.id}
            >
              <div
                className={`cart-item-visual product-theme-${item.theme}`}
                aria-hidden="true"
              >
                <span>?</span>
              </div>

              <div className="cart-item-details">
                <p className="product-category">
                  Loopify Mystery Product
                </p>

                <h2>
                  <Link to={`/product/${item.slug}`}>
                    {item.name}
                  </Link>
                </h2>

                <p>
                  {item.boxCount}{" "}
                  {item.boxCount === 1
                    ? "blind box"
                    : "blind boxes"}{" "}
                  per pack
                </p>

                <p>
                  {formatCurrency(item.price)} per pack
                </p>

                <button
                  className="cart-remove-button"
                  type="button"
                  onClick={() => removeItem(item.id)}
                >
                  Remove item
                </button>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-control">
                  <button
                    type="button"
                    aria-label={`Decrease ${item.name} quantity`}
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity - 1,
                      )
                    }
                  >
                    −
                  </button>

                  <input
                    type="number"
                    min="1"
                    max="20"
                    aria-label={`${item.name} quantity`}
                    value={item.quantity}
                    onChange={(event) =>
                      updateQuantity(
                        item.id,
                        Number(event.target.value),
                      )
                    }
                  />

                  <button
                    type="button"
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity + 1,
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <strong className="cart-line-total">
                  {formatCurrency(
                    item.price * item.quantity,
                  )}
                </strong>

                <span>
                  {item.quantity * item.boxCount} total{" "}
                  {item.quantity * item.boxCount === 1
                    ? "box"
                    : "boxes"}
                </span>
              </div>
            </article>
          ))}

          <div className="cart-mystery-notice">
            <strong>Remember:</strong>
            <p>
              You are purchasing mystery charms. The exact
              collection and design will only be revealed when
              each package is opened.
            </p>
          </div>
        </div>

        <aside className="cart-summary">
          <div className="window-title-bar">
            <span>order_summary.exe</span>

            <div>
              <span>—</span>
              <span>□</span>
              <span>×</span>
            </div>
          </div>

          <div className="cart-summary-content">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Total mystery boxes</span>
              <strong>{totalBoxes}</strong>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>
                {formatCurrency(subtotal)}
              </strong>
            </div>

            <div className="summary-row">
              <span>Campus pickup</span>
              <strong>Free</strong>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>
                {formatCurrency(subtotal)}
              </strong>
            </div>

            <Link
              className="button button-primary cart-checkout-button"
              to="/checkout"
            >
              Continue to Checkout
            </Link>

            <Link
              className="continue-shopping-link"
              to="/shop"
            >
              ← Continue shopping
            </Link>

            <p className="cart-security-note">
              Payment is selected during checkout. Do not
              include sensitive banking information in the
              order notes.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}