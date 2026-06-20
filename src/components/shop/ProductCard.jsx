import { regularCollections } from "../../data/collections.js";
import { useState } from "react";
import { Link } from "react-router";

import { useCart } from "../../context/CartContext.jsx";
import { formatCurrency } from "../../utils/formatCurrency.js";

export default function ProductCard({ product }) {
  const {
    addItem,
    remainingCapacity,
    maxCartBoxes,
  } = useCart();

  const [added, setAdded] = useState(false);

  const maximumReached = remainingCapacity <= 0;

  function handleAddToCart() {
    if (maximumReached) {
      return;
    }

    addItem(product, 1);
    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1800);
  }

  function getButtonText() {
    if (!product.inStock) {
      return "Sold Out";
    }

    if (maximumReached) {
      return `Maximum ${maxCartBoxes} Reached`;
    }

    if (added) {
      return "Added!";
    }

    return "Add to Cart";
  }

  return (
    <article className="product-card">
      <Link
        className="product-card-image-link"
        to={`/product/${product.slug}`}
        aria-label={`View ${product.name}`}
      >
        <div
          className={`product-visual product-theme-${product.theme}`}
        >
          <span className="product-window-label">
            {product.badge}
          </span>

          <div className="product-photo-collage">
            {regularCollections.map((collection) => (
                <img
                key={collection.id}
                src={collection.image}
                alt={collection.imageAlt}
                />
            ))}
            </div>

          <span className="product-box-count">
            1 blind box
          </span>
        </div>
      </Link>

      <div className="product-card-content">
        <p className="product-category">
          Mystery Blind Box
        </p>

        <h2 className="product-card-title">
          <Link to={`/product/${product.slug}`}>
            {product.name}
          </Link>
        </h2>

        <p>{product.description}</p>

        <div className="product-card-price-row">
          <strong className="product-price">
            {formatCurrency(product.price)}
          </strong>

          <span>1 charm</span>
        </div>

        <p className="mystery-disclosure">
          Exact charm designs are randomly selected.
          Maximum three boxes per order.
        </p>

        <div className="product-card-actions">
          <Link
            className="button button-secondary"
            to={`/product/${product.slug}`}
          >
            View Details
          </Link>

          <button
            className="button button-primary"
            type="button"
            disabled={
              !product.inStock || maximumReached
            }
            onClick={handleAddToCart}
          >
            {getButtonText()}
          </button>
        </div>

        <p
          className="product-add-feedback"
          aria-live="polite"
        >
          {added &&
            `${product.shortName} was added to your cart.`}

          {!added &&
            maximumReached &&
            `Your bag already contains the maximum of ${maxCartBoxes} boxes.`}
        </p>
      </div>
    </article>
  );
}