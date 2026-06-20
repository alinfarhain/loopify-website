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
          element={
            <PlaceholderPage
              title="Collections"
              description="Explore HyperBloomz, CosmicGlitz, AquaSurfz and the secret HaloWhimpz collection."
            />
          }
        />

        <Route
          path="how-it-works"
          element={
            <PlaceholderPage
              title="How It Works"
              description="Learn how to choose, order, collect and unbox your mystery charm."
            />
          }
        />

        <Route
          path="community"
          element={
            <PlaceholderPage
              title="Community"
              description="View customer reviews, unboxing posts, guessing polls and collection updates."
            />
          }
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
          element={
            <PlaceholderPage
              title="About Loopify"
              description="Discover Loopify's story, vision, mission and cyber-Y2K brand identity."
            />
          }
        />

        <Route
          path="faq"
          element={
            <PlaceholderPage
              title="Frequently Asked Questions"
              description="Find information about ordering, payment, pickup, and duplicate charms."
            />
          }
        />

        <Route
          path="contact"
          element={
            <PlaceholderPage
              title="Contact Loopify"
              description="Contact the team through WhatsApp, Instagram, Telegram or the support form."
            />
          }
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
          element={<PlaceholderPage title="Privacy Policy" />}
        />

        <Route
          path="terms"
          element={
            <PlaceholderPage title="Terms and Conditions" />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}