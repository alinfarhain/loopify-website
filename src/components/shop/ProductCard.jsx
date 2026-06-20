import { useState } from "react";
import { Link } from "react-router";

import { useCart } from "../../context/CartContext.jsx";
import { formatCurrency } from "../../utils/formatCurrency.js";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem(product, 1);
    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1800);
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
          aria-hidden="true"
        >
          <span className="product-window-label">
            {product.badge}
          </span>

          <div className="product-box-art">
            <span>?</span>
          </div>

          <span className="product-box-count">
            {product.boxCount}{" "}
            {product.boxCount === 1 ? "blind box" : "blind boxes"}
          </span>
        </div>
      </Link>

      <div className="product-card-content">
        <p className="product-category">
          {product.category === "bundle"
            ? "Mystery Bundle"
            : "Mystery Blind Box"}
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

          <span>
            {product.boxCount === 1
              ? "1 charm"
              : `${product.boxCount} charms`}
          </span>
        </div>

        <p className="mystery-disclosure">
          Exact charm designs are randomly selected.
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
            disabled={!product.inStock}
            onClick={handleAddToCart}
          >
            {product.inStock
              ? added
                ? "Added!"
                : "Add to Cart"
              : "Sold Out"}
          </button>
        </div>

        <p
          className="product-add-feedback"
          aria-live="polite"
        >
          {added
            ? `${product.shortName} was added to your cart.`
            : ""}
        </p>
      </div>
    </article>
  );
}