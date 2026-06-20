import ProductCard from "../components/shop/ProductCard.jsx";
import { products } from "../data/products.js";

export default function Shop() {
  return (
    <>
      <section className="shop-hero page-section">
        <p className="eyebrow">LOOPIFY_SHOP.EXE</p>

        <h1>Pick Your Mystery</h1>

        <p>
          Each Loopify mystery blind box costs RM7 and
          contains one randomly selected phone charm.
          Customers may purchase a maximum of three boxes
          per order.
        </p>
      </section>

      <section
        className="shop-section page-section"
        aria-labelledby="shop-products-heading"
      >
        <div className="shop-result-heading">
          <div>
            <p className="eyebrow">
              CURRENT_PRODUCT_FILE
            </p>

            <h2 id="shop-products-heading">
              Loopify Mystery Blind Box
            </h2>
          </div>

          <p>1 product</p>
        </div>

        <div className="product-grid product-grid-single">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      <section className="shop-information page-section">
        <div>
          <p className="eyebrow">
            IMPORTANT_INFORMATION
          </p>

          <h2>
            The mystery is part of the experience
          </h2>
        </div>

        <div className="shop-information-grid">
          <article>
            <h3>RM7 Per Box</h3>

            <p>
              Every Loopify mystery box is sold at the
              student-friendly price of RM7.
            </p>
          </article>

          <article>
            <h3>Maximum Three Boxes</h3>

            <p>
              Each customer can add no more than three
              mystery boxes to one order.
            </p>
          </article>

          <article>
            <h3>Random Selection</h3>

            <p>
              Customers cannot select the exact charm before
              opening the mystery package.
            </p>
          </article>

          <article>
            <h3>Secret Charm</h3>

            <p>
              Selected packages may contain the ultra-rare
              HaloWhimpz cyber-angel charm.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}