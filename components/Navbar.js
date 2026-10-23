import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/img/cw_logo_horizontal.webp";

// Server component: plain HTML, no JavaScript sent to the browser.
export default function Navbar() {
  return (
    <div id="navbar" className="navbar">
      <div className="container-fluid d-flex flex-column align-items-center">
        <Link className="navbar-brand mx-auto m-3" href="/">
          <Image
            src={logo}
            alt="Charity: Water logo and name"
            sizes="(max-width: 600px) 140px, 320px"
            loading="eager"
            fetchPriority="high"
          />
        </Link>
      </div>
    </div>
  );
}
