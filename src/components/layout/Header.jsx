import { useState } from "react";
import { Link, NavLink } from "react-router";

import { useCart } from "../../context/CartContext.jsx";

const navigationItems = [
  {
    label: "Home",
    to: "/",
    end: true,
  },
  {
    label: "Shop",
    to: "/shop",
  },
  {
    label: "Collections",
    to: "/collections",
  },
  {
    label: "How It Works",
    to: "/how-it-works",
  },
  {
    label: "Community",
    to: "/community",
  },
  {
    label: "About",
    to: "/about",
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalBoxes } = useCart();

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <div className="announcement-bar">
        RM7 mystery blind boxes ★ Find your lucky charm!
      </div>

      <header className="site-header">
        <Link className="brand" to="/" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">
            LC
          </span>

          <span className="brand-text">
            <strong>Loopify</strong>
            <small>Charmies</small>
          </span>
        </Link>

        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => {
            setMenuOpen((currentState) => !currentState);
          }}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <nav
          id="primary-navigation"
          className={`primary-navigation ${
            menuOpen ? "is-open" : ""
          }`}
          aria-label="Primary navigation"
        >
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "navigation-link is-active"
                  : "navigation-link"
              }
            >
              {item.label}
            </NavLink>
          ))}

          <Link
            className="cart-button"
            to="/cart"
            onClick={closeMenu}
            aria-label={`Shopping bag with ${totalBoxes} mystery boxes`}
          >
            Bag{" "}
            <span aria-hidden="true">({totalBoxes})</span>
          </Link>
        </nav>
      </header>
    </>
  );
}