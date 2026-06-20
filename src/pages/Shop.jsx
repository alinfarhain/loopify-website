import { useMemo, useState } from "react";

import ProductCard from "../components/shop/ProductCard.jsx";
import { products } from "../data/products.js";

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOption, setSortOption] = useState("featured");

  const visibleProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filteredProducts = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesCategory =
        category === "all" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    return [...filteredProducts].sort((firstProduct, secondProduct) => {
      if (sortOption === "price-low") {
        return firstProduct.price - secondProduct.price;
      }

      if (sortOption === "price-high") {
        return secondProduct.price - firstProduct.price;
      }

      if (sortOption === "boxes-high") {
        return secondProduct.boxCount - firstProduct.boxCount;
      }

      return Number(secondProduct.featured) - Number(firstProduct.featured);
    });
  }, [category, searchTerm, sortOption]);

  return (
    <>
      <section className="shop-hero page-section">
        <p className="eyebrow">LOOPIFY_SHOP.EXE</p>
        <h1>Pick Your Mystery</h1>

        <p>
          Select one blind box or choose a bundle for more
          unboxing excitement. Every charm is selected randomly,
          and the secret HaloWhimpz design remains hidden.
        </p>
      </section>

      <section
        className="shop-section page-section"
        aria-labelledby="shop-products-heading"
      >
        <div className="shop-toolbar">
          <div className="shop-search">
            <label htmlFor="shop-search-input">
              Search products
            </label>

            <input
              id="shop-search-input"
              type="search"
              value={searchTerm}
              placeholder="Search Loopify products"
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />
          </div>

          <div className="shop-filter">
            <label htmlFor="shop-category-filter">
              Product type
            </label>

            <select
              id="shop-category-filter"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
            >
              <option value="all">All products</option>
              <option value="single">Single box</option>
              <option value="bundle">Bundles</option>
            </select>
          </div>

          <div className="shop-filter">
            <label htmlFor="shop-sort">
              Sort by
            </label>

            <select
              id="shop-sort"
              value={sortOption}
              onChange={(event) =>
                setSortOption(event.target.value)
              }
            >
              <option value="featured">Featured</option>
              <option value="price-low">
                Price: low to high
              </option>
              <option value="price-high">
                Price: high to low
              </option>
              <option value="boxes-high">
                Most blind boxes
              </option>
            </select>
          </div>
        </div>

        <div className="shop-result-heading">
          <div>
            <p className="eyebrow">AVAILABLE_FILES</p>
            <h2 id="shop-products-heading">
              Loopify Blind Boxes
            </h2>
          </div>

          <p>
            {visibleProducts.length}{" "}
            {visibleProducts.length === 1
              ? "product"
              : "products"}
          </p>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="shop-empty-state">
            <span aria-hidden="true">?</span>
            <h2>No charm files found</h2>
            <p>
              Try using a different search word or product
              filter.
            </p>

            <button
              className="button button-primary"
              type="button"
              onClick={() => {
                setSearchTerm("");
                setCategory("all");
              }}
            >
              Reset Search
            </button>
          </div>
        )}
      </section>

      <section className="shop-information page-section">
        <div>
          <p className="eyebrow">IMPORTANT_INFORMATION</p>
          <h2>The mystery is part of the experience</h2>
        </div>

        <div className="shop-information-grid">
          <article>
            <h3>Random Selection</h3>
            <p>
              Customers cannot select the exact charm design
              before opening the mystery package.
            </p>
          </article>

          <article>
            <h3>Secret Charm</h3>
            <p>
              Selected packages may contain the ultra-rare
              HaloWhimpz cyber-angel charm.
            </p>
          </article>

          <article>
            <h3>Quality Checked</h3>
            <p>
              Every phone charm is checked before being placed
              inside its opaque Loopify packaging.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}