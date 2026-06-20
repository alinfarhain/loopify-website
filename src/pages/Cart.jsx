import { Link } from "react-router";

import { useCart } from "../context/CartContext.jsx";
import { formatCurrency } from "../utils/formatCurrency.js";

export default function Cart() {
  const {
    cartItems,
    subtotal,
    totalBoxes,
    remainingCapacity,
    maxCartBoxes,
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

  function handleRemoveItem(itemId, itemName) {
    const confirmed = window.confirm(
      `Remove ${itemName} from your cart?`,
    );

    if (confirmed) {
      removeItem(itemId);
    }
  }

  if (cartItems.length === 0) {
    return (
      <section className="empty-cart-page page-section">
        <div
          className="empty-cart-symbol"
          aria-hidden="true"
        >
          ?
        </div>

        <p className="eyebrow">SHOPPING_BAG_EMPTY</p>

        <h1>Your charm bag is empty</h1>

        <p>
          Add between one and three Loopify mystery blind
          boxes to begin searching for your lucky charm.
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

          <p>
            You may purchase a maximum of {maxCartBoxes}{" "}
            mystery boxes per order.
          </p>
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
          {cartItems.map((item) => {
            const otherBoxes =
              totalBoxes -
              item.quantity * item.boxCount;

            const maximumQuantityForItem = Math.floor(
              (maxCartBoxes - otherBoxes) /
                item.boxCount,
            );

            const itemTotalBoxes =
              item.quantity * item.boxCount;

            const maximumReached =
              totalBoxes >= maxCartBoxes;

            return (
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
                    Loopify Mystery Blind Box
                  </p>

                  <h2>
                    <Link
                      to={`/product/${item.slug}`}
                    >
                      {item.name}
                    </Link>
                  </h2>

                  <p>
                    One randomly selected Y2K phone charm
                    per box.
                  </p>

                  <p>
                    <strong>
                      {formatCurrency(item.price)}
                    </strong>{" "}
                    per box
                  </p>

                  <p className="mystery-disclosure">
                    Exact charm designs are randomly
                    selected.
                  </p>

                  <button
                    className="cart-remove-button"
                    type="button"
                    onClick={() =>
                      handleRemoveItem(
                        item.id,
                        item.name,
                      )
                    }
                  >
                    Remove item
                  </button>
                </div>

                <div className="cart-item-actions">
                  <label
                    className="visually-hidden"
                    htmlFor={`cart-quantity-${item.id}`}
                  >
                    Quantity for {item.name}
                  </label>

                  <div className="quantity-control">
                    <button
                      type="button"
                      aria-label={`Decrease ${item.name} quantity`}
                      disabled={item.quantity <= 1}
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
                      id={`cart-quantity-${item.id}`}
                      type="number"
                      min="1"
                      max={maximumQuantityForItem}
                      aria-label={`${item.name} quantity`}
                      value={item.quantity}
                      onChange={(event) => {
                        const enteredValue =
                          event.target.value;

                        if (enteredValue === "") {
                          return;
                        }

                        updateQuantity(
                          item.id,
                          Number(enteredValue),
                        );
                      }}
                    />

                    <button
                      type="button"
                      aria-label={`Increase ${item.name} quantity`}
                      disabled={
                        item.quantity >=
                        maximumQuantityForItem
                      }
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
                    {itemTotalBoxes}{" "}
                    {itemTotalBoxes === 1
                      ? "mystery box"
                      : "mystery boxes"}
                  </span>

                  {maximumReached && (
                    <span className="cart-limit-message">
                      Maximum of {maxCartBoxes} boxes
                      reached
                    </span>
                  )}

                  {!maximumReached && (
                    <span className="cart-limit-message">
                      You may add {remainingCapacity} more{" "}
                      {remainingCapacity === 1
                        ? "box"
                        : "boxes"}
                    </span>
                  )}
                </div>
              </article>
            );
          })}

          <div className="cart-mystery-notice">
            <strong>Blind-box reminder</strong>

            <p>
              You are purchasing mystery charms. The
              exact collection and design will only be
              revealed when each package is opened.
              Duplicate charms are possible.
            </p>
          </div>

          <div className="cart-mystery-notice">
            <strong>Purchase limit</strong>

            <p>
              Each customer may purchase a maximum of{" "}
              {maxCartBoxes} Loopify mystery boxes in one
              order.
            </p>
          </div>
        </div>

        <aside className="cart-summary">
          <div className="window-title-bar">
            <span>order_summary.exe</span>

            <div aria-hidden="true">
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
              <span>Maximum allowed</span>
              <strong>{maxCartBoxes} boxes</strong>
            </div>

            <div className="summary-row">
              <span>Remaining capacity</span>
              <strong>
                {remainingCapacity}{" "}
                {remainingCapacity === 1
                  ? "box"
                  : "boxes"}
              </strong>
            </div>

            <div className="summary-row">
              <span>Price per box</span>
              <strong>
                {cartItems.length > 0
                    ? formatCurrency(cartItems[0].price)
                    : formatCurrency(7)}
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
              Payment is selected during checkout. Do
              not include passwords or sensitive banking
              information in the order notes.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}