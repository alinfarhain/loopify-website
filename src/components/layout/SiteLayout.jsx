import { Outlet } from "react-router";

import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

export default function SiteLayout() {
  return (
    <div className="site-shell">
      <Header />

      <main id="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}