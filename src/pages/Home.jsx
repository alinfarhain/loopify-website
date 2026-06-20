import { Link } from "react-router";

const collections = [
  {
    name: "HyperBloomz.exe",
    label: "Flower Collection",
    description:
      "A cyber-botanical drop where digital pixels meet glossy flower power.",
    className: "hyper-bloomz",
  },
  {
    name: "CosmicGlitz.exe",
    label: "Star Collection",
    description:
      "A sparkling space-age collection inspired by chrome stars and cosmic glitter.",
    className: "cosmic-glitz",
  },
  {
    name: "AquaSurfz.exe",
    label: "Beach Collection",
    description:
      "A translucent aqua collection inspired by liquid glass and retro surf culture.",
    className: "aqua-surfz",
  },
  {
    name: "HaloWhimpz.exe",
    label: "Secret File",
    description:
      "An ultra-rare cyber angel is hiding inside selected Loopify blind boxes.",
    className: "halo-whimpz",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose your quantity",
    description: "Select how many RM7 mystery blind boxes you want to try.",
  },
  {
    number: "02",
    title: "Complete your order",
    description: "Enter your details and choose campus pickup or delivery.",
  },
  {
    number: "03",
    title: "Unbox your charm",
    description: "Open your mystery package and discover your collection.",
  },
  {
    number: "04",
    title: "Collect and trade",
    description: "Share your unboxing or swap duplicate charms with friends.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero page-section">
        <div className="hero-content">
          <p className="eyebrow">LOOPIFY_SYSTEM.EXE</p>

          <h1>Find Your Lucky Charms!</h1>

          <p className="hero-description">
            Unbox a surprise Y2K phone charm made for your style, your phone
            and your campus adventures.
          </p>

          <div className="hero-actions">
            <Link className="button button-primary" to="/shop">
              Get a Blind Box — RM7
            </Link>

            <Link className="button button-secondary" to="/collections">
              Explore Collections
            </Link>
          </div>

          <p className="trust-line">
            Cute ★ Functional ★ Collectible ★ Student-friendly
          </p>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="computer-window">
            <div className="window-title-bar">
              <span>lucky_charm_finder.exe</span>

              <div>
                <span>—</span>
                <span>□</span>
                <span>×</span>
              </div>
            </div>

            <div className="window-content">
              <div className="mystery-box">
                <span>?</span>
              </div>

              <p>Secret file detected...</p>

              <div className="loading-track">
                <span />
              </div>

              <strong>Rare charm loading</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">COLLECTION_DIRECTORY</p>
            <h2>Which collection will choose you?</h2>
          </div>

          <Link className="text-link" to="/collections">
            View all collections →
          </Link>
        </div>

        <div className="collection-grid">
          {collections.map((collection) => (
            <article
              className={`collection-card ${collection.className}`}
              key={collection.name}
            >
              <p>{collection.label}</p>
              <h3>{collection.name}</h3>
              <p>{collection.description}</p>

              <Link className="collection-link" to="/collections">
                Open file →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section steps-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">QUICK_START_GUIDE</p>
            <h2>How the blind box works</h2>
          </div>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <article className="step-card" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section secret-section">
        <div>
          <p className="eyebrow">CLASSIFIED FILE</p>
          <h2>HaloWhimpz.exe</h2>

          <p>
            A rare cyber angel has entered the Loopify system. Its complete
            design remains locked until somebody finds it.
          </p>

          <Link className="button button-primary" to="/shop">
            Try Your Luck
          </Link>
        </div>

        <div className="secret-symbol" aria-hidden="true">
          ?
        </div>
      </section>
    </>
  );
}