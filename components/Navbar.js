import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/img/cw_logo_horizontal_light.webp";

// Server component: plain HTML, no JavaScript sent to the browser.
export default function Navbar() {
  return (
    <nav id="navbar" className="site-nav" aria-label="Site">
      <Link className="site-nav-brand" href="/">
        <Image
          src={logo}
          alt="Charity: Water logo and name"
          sizes="(max-width: 600px) 160px, 260px"
          loading="eager"
          fetchPriority="high"
        />
      </Link>
    </nav>
  );
}
