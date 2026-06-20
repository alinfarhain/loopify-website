import { Route, Routes } from "react-router";

import SiteLayout from "./components/layout/SiteLayout.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import PlaceholderPage from "./pages/PlaceholderPage.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Shop from "./pages/Shop.jsx";
import Collections from "./pages/Collections.jsx";
import HowItWorks from "./pages/HowItWorks.jsx";
import Community from "./pages/Community.jsx";
import About from "./pages/About.jsx";
import FAQ from "./pages/FAQ.jsx";
import Contact from "./pages/Contact.jsx";
import Privacy from "./pages/Privacy.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />

        <Route path="shop" element={<Shop />} />

        <Route
          path="product/:productSlug"
          element={<ProductDetails />}
        />

        <Route
          path="collections"
          element={<Collections />}
        />

        <Route
          path="how-it-works"
          element={<HowItWorks />}
        />

        <Route
          path="community"
          element={<Community />}
        />

        <Route
          path="charm-swap"
          element={
            <PlaceholderPage
              title="Charm Swap"
              description="Find other collectors who may want to trade duplicate charms."
            />
          }
        />

        <Route
          path="about"
          element={<About />}
        />

        <Route
          path="faq"
          element={<FAQ />}
        />

        <Route
          path="contact"
          element={<Contact />}
        />

        <Route path="cart" element={<Cart />} />

        <Route path="checkout" element={<Checkout />} />

        <Route
          path="order-confirmation"
          element={<OrderConfirmation />}
        />

        <Route
          path="track-order"
          element={
            <PlaceholderPage
              title="Track Your Order"
              description="Check whether your order is confirmed, packed or ready for collection."
            />
          }
        />

        <Route
          path="privacy"
          element={<Privacy />}
        />

        <Route
          path="privacy-policy"
          element={<Privacy />}
        />

        <Route
          path="terms"
          element={
            <PlaceholderPage title="Terms and Conditions" />
          }
        />

        <Route
          path="contact"
          element={
            <PlaceholderPage
              title="Contact and Support"
              description="Contact Loopify for order, payment, pickup or product support."
            />
          }
        />

        <Route
          path="charm-swap"
          element={
            <PlaceholderPage
              title="Charm Swap"
              description="Connect with other Loopify collectors and arrange consent-based duplicate charm trades."
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}