import {
  collections,
  regularCollections,
} from "../data/collections.js";
import { useState } from "react";
import { Link, useParams } from "react-router";

import { useCart } from "../context/CartContext.jsx";
import { getProductBySlug } from "../data/products.js";
import { formatCurrency } from "../utils/formatCurrency.js";

export default function ProductDetails() {
  const { productSlug } = useParams();
  const product = getProductBySlug(productSlug);

  const {
    addItem,
    totalBoxes,
    remainingCapacity,
    maxCartBoxes,
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [lastAddedQuantity, setLastAddedQuantity] =
    useState(0);

  if (!product) {
    return (
      <section className="placeholder-page page-section">
        <div className="placeholder-content">
          <p className="eyebrow">ERROR 404</p>

          <h1>Product file not found</h1>

          <p>
            This Loopify product may have been moved or
            removed.
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

  const maximumReached = remainingCapacity <= 0;

  const maximumSelectableQuantity = Math.max(
    1,
    remainingCapacity,
  );

  const safeQuantity = Math.min(
    quantity,
    maximumSelectableQuantity,
  );

  function decreaseQuantity() {
    setQuantity((currentQuantity) =>
      Math.max(1, currentQuantity - 1),
    );
  }

  function increaseQuantity() {
    if (maximumReached) {
      return;
    }

    setQuantity((currentQuantity) =>
      Math.min(
        maximumSelectableQuantity,
        currentQuantity + 1,
      ),
    );
  }

  function handleQuantityInput(event) {
    if (maximumReached) {
      return;
    }

    const requestedQuantity = Number(
      event.target.value,
    );

    if (!Number.isFinite(requestedQuantity)) {
      return;
    }

    const wholeQuantity = Math.floor(
      requestedQuantity,
    );

    setQuantity(
      Math.min(
        maximumSelectableQuantity,
        Math.max(1, wholeQuantity),
      ),
    );
  }

  function handleAddToCart() {
    if (maximumReached) {
      return;
    }

    const quantityToAdd = Math.min(
      safeQuantity,
      remainingCapacity,
    );

    if (quantityToAdd <= 0) {
      return;
    }

    addItem(product, quantityToAdd);

    setLastAddedQuantity(quantityToAdd);
    setAdded(true);
    setQuantity(1);

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
        >
          <span className="product-window-label">
            {product.badge}
          </span>

          <div className="product-details-photo-grid">
            {regularCollections.map((collection) => (
                <figure key={collection.id}>
                <img
                    src={collection.image}
                    alt={collection.imageAlt}
                />

                <figcaption>
                    {collection.name}
                </figcaption>
                </figure>
            ))}

            <div className="product-details-secret">
                <span aria-hidden="true">?</span>
                <strong>Secret Charm</strong>
                <small>HaloWhimpz.exe</small>
            </div>
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
              Each box contains one randomly selected
              charm. Exact designs cannot be chosen
              before opening. Duplicate charms are
              possible.
            </p>
          </div>

          <div className="product-notice">
            <strong>Purchase limit</strong>

            <p>
              Each customer can purchase a maximum of{" "}
              {maxCartBoxes} boxes per order. Your bag
              currently contains {totalBoxes}{" "}
              {totalBoxes === 1 ? "box" : "boxes"}.
            </p>
          </div>

          <div className="quantity-section">
            <label htmlFor="product-quantity">
              Number of boxes
            </label>

            <div className="quantity-control">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={
                  maximumReached || safeQuantity <= 1
                }
                onClick={decreaseQuantity}
              >
                −
              </button>

              <input
                id="product-quantity"
                type="number"
                min="1"
                max={maximumSelectableQuantity}
                disabled={maximumReached}
                value={safeQuantity}
                onChange={handleQuantityInput}
              />

              <button
                type="button"
                aria-label="Increase quantity"
                disabled={
                  maximumReached ||
                  safeQuantity >=
                    maximumSelectableQuantity
                }
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>

            {!maximumReached && (
              <p className="quantity-helper-text">
                You may add up to {remainingCapacity} more{" "}
                {remainingCapacity === 1
                  ? "box"
                  : "boxes"}{" "}
                to this order.
              </p>
            )}

            {maximumReached && (
              <p className="quantity-helper-text">
                Your bag already contains the maximum of{" "}
                {maxCartBoxes} boxes.
              </p>
            )}
          </div>

          <div className="product-purchase-summary">
            <span>
              Boxes to add:
              <strong> {safeQuantity}</strong>
            </span>

            <span>
              Total:
              <strong>
                {" "}
                {formatCurrency(
                  safeQuantity * product.price,
                )}
              </strong>
            </span>
          </div>

          <button
            className="button button-primary product-add-button"
            type="button"
            disabled={maximumReached}
            onClick={handleAddToCart}
          >
            {maximumReached
              ? `Maximum ${maxCartBoxes} Boxes Reached`
              : added
                ? "Added to Cart!"
                : `Add to Cart — ${formatCurrency(
                    safeQuantity * product.price,
                  )}`}
          </button>

          <p
            className="product-add-feedback"
            aria-live="polite"
          >
            {added &&
              `${lastAddedQuantity} ${
                lastAddedQuantity === 1
                  ? "box was"
                  : "boxes were"
              } added successfully.`}

            {!added &&
              maximumReached &&
              `Your bag already contains the maximum of ${maxCartBoxes} boxes.`}
          </p>

          <div className="product-details-section">
            <h2>Possible collections</h2>

            <div className="collection-pill-list">
              <div className="collection-showcase-grid">
                {collections.map((collection) => (
                    <article
                    className="collection-showcase-card"
                    key={collection.id}
                    >
                    {collection.isSecret ? (
                        <div className="collection-showcase-secret">
                        <span aria-hidden="true">?</span>
                        <strong>Image Locked</strong>
                        </div>
                    ) : (
                        <img
                        src={collection.image}
                        alt={collection.imageAlt}
                        />
                    )}

                    <h3>{collection.name}</h3>
                    <p>{collection.label}</p>
                    </article>
                ))}
                </div>
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