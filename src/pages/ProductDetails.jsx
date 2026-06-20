import { useState } from "react";
import { Link, useParams } from "react-router";

import { useCart } from "../context/CartContext.jsx";
import { getProductBySlug } from "../data/products.js";
import { formatCurrency } from "../utils/formatCurrency.js";

export default function ProductDetails() {
  const { productSlug } = useParams();
  const product = getProductBySlug(productSlug);
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <section className="placeholder-page page-section">
        <div className="placeholder-content">
          <p className="eyebrow">ERROR 404</p>
          <h1>Product file not found</h1>
          <p>
            This Loopify product may have been moved or removed.
          </p>

          <Link
            className="button button-primary"
            to="/shop"
          >
            Return to Shop
          </Link>
        </div>
      </section>
    );
  }

  function decreaseQuantity() {
    setQuantity((currentQuantity) =>
      Math.max(1, currentQuantity - 1),
    );
  }

  function increaseQuantity() {
    setQuantity((currentQuantity) =>
      Math.min(10, currentQuantity + 1),
    );
  }

  function handleAddToCart() {
    addItem(product, quantity);
    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  return (
    <section className="product-details-page page-section">
      <nav
        className="breadcrumbs"
        aria-label="Breadcrumb"
      >
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/shop">Shop</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">
          {product.shortName}
        </span>
      </nav>

      <div className="product-details-layout">
        <div
          className={`product-details-visual product-theme-${product.theme}`}
          aria-hidden="true"
        >
          <span className="product-window-label">
            {product.badge}
          </span>

          <div className="product-box-art product-box-art-large">
            <span>?</span>
          </div>

          <p>
            secret_charm_status:
            <strong> UNKNOWN</strong>
          </p>
        </div>

        <div className="product-details-content">
          <p className="eyebrow">
            LOOPIFY_PRODUCT_FILE
          </p>

          <h1>{product.name}</h1>

          <p className="product-details-price">
            {formatCurrency(product.price)}
          </p>

          <p className="product-details-description">
            {product.longDescription}
          </p>

          <div className="product-notice">
            <strong>Blind-box disclosure</strong>
            <p>
              Each box contains a randomly selected charm.
              Exact designs cannot be chosen before opening.
              Duplicate charms are possible.
            </p>
          </div>

          <div className="quantity-section">
            <label htmlFor="product-quantity">
              Number of packs
            </label>

            <div className="quantity-control">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={decreaseQuantity}
              >
                −
              </button>

              <input
                id="product-quantity"
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(event) => {
                  const nextQuantity = Number(
                    event.target.value,
                  );

                  if (Number.isFinite(nextQuantity)) {
                    setQuantity(
                      Math.min(
                        10,
                        Math.max(1, nextQuantity),
                      ),
                    );
                  }
                }}
              />

              <button
                type="button"
                aria-label="Increase quantity"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
          </div>

          <div className="product-purchase-summary">
            <span>
              Total mystery boxes:
              <strong>
                {" "}
                {quantity * product.boxCount}
              </strong>
            </span>

            <span>
              Total:
              <strong>
                {" "}
                {formatCurrency(
                  quantity * product.price,
                )}
              </strong>
            </span>
          </div>

          <button
            className="button button-primary product-add-button"
            type="button"
            onClick={handleAddToCart}
          >
            {added
              ? "Added to Cart!"
              : `Add to Cart — ${formatCurrency(
                  quantity * product.price,
                )}`}
          </button>

          <p
            className="product-add-feedback"
            aria-live="polite"
          >
            {added
              ? `${quantity} pack${
                  quantity > 1 ? "s" : ""
                } added successfully.`
              : ""}
          </p>

          <div className="product-details-section">
            <h2>Possible collections</h2>

            <div className="collection-pill-list">
              {product.collectionPossibilities.map(
                (collection) => (
                  <span key={collection}>
                    {collection}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="product-details-section">
            <h2>What is included?</h2>

            <ul className="feature-list">
              {product.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}