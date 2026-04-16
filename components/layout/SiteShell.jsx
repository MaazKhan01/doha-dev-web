"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

/**
 * SiteShell — wraps inner pages with the shared Navbar + Footer.
 * The homepage manages its own Navbar (needs onSectionClick prop)
 * and its own Footer (embedded inside the gallery slide), so we
 * skip injection there.
 */
export default function SiteShell({ children, lang }) {
  const pathname = usePathname();

  // Homepage paths: /en  /ar  /en/  /ar/
  const isHomepage = /^\/[a-z]{2}\/?$/.test(pathname);

  if (isHomepage) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}
