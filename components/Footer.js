import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaVimeoV,
  FaInstagram,
  FaLinkedin,
  FaSnapchatGhost,
  FaHandshake,
  FaHome,
  FaEnvelope,
  FaClock,
  FaPhone,
} from "react-icons/fa";
import footerLogo from "@/public/img/water-can-transparent.png";

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/charitywater", label: "Facebook", Icon: FaFacebookF },
  { href: "https://x.com/charitywater", label: "X (Twitter)", Icon: FaTwitter },
  { href: "https://vimeo.com/charitywater", label: "Vimeo", Icon: FaVimeoV },
  { href: "https://www.instagram.com/charitywater/", label: "Instagram", Icon: FaInstagram },
  { href: "https://www.linkedin.com/company/charitywater/", label: "LinkedIn", Icon: FaLinkedin },
  { href: "https://www.snapchat.com/@charitywater", label: "Snapchat", Icon: FaSnapchatGhost },
];

const SITE_LINKS = [
  { href: "https://www.charitywater.org/", label: "Main Site" },
  { href: "https://www.charitywater.org/donate", label: "Donate" },
  { href: "https://www.charitywater.org/about/jobs", label: "Careers" },
  { href: "https://www.charitywater.org/our-work", label: "Our Work" },
];

// Server component: the footer is static, so it ships no JavaScript.
export default function Footer() {
  return (
    <footer className="footer-section text-center text-lg-start">
      <section id="social-links" className="d-flex justify-content-center p-4">
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 py-3">
          <span id="getConnected" className="d-none d-lg-inline">
            Get connected with us on social networks:
          </span>
          <div>
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`charity: water on ${label}`}
                className="underlineFix me-4 text-reset"
              >
                <Icon className="fa-icon" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <div className="footer-logo-row d-flex align-items-center justify-content-center justify-content-md-start mb-2">
                <Image
                  id="footerLogo"
                  src={footerLogo}
                  alt="Charity: Water logo only"
                  sizes="160px"
                />
                <span className="footer-title">charity: water</span>
              </div>
              <p id="footerBodyTxt">
                All sound effects are copyright free and sourced from YouTube Audio Library.
                Game developed by Jacob Martinez as a project.
                <br />
                Art crafted by my amazing girlfriend,{" "}
                <span id="footerTxt">
                  <a
                    href="https://www.instagram.com/bheofthelily?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    className="text-reset"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    KZ.
                  </a>
                </span>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h2 className="h6 text-uppercase mb-4">See What We&apos;re About</h2>
              {SITE_LINKS.map(({ href, label }) => (
                <p key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-reset">
                    {label}
                  </a>
                </p>
              ))}
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h2 className="h6 text-uppercase mb-4">Contact</h2>
              <p>
                <span className="me-3">
                  <FaHandshake className="fa-icon" aria-hidden="true" />{" "}
                  <a href="https://www.charitywater.org/contact" target="_blank" rel="noopener noreferrer" className="text-reset">
                    Connect
                  </a>
                </span>
              </p>
              <p>
                <a href="https://maps.app.goo.gl/7W9Gjbf9aT7f6whM6" target="_blank" rel="noopener noreferrer" className="text-reset">
                  {" "}
                  <FaHome className="fa-icon me-3" aria-hidden="true" />
                  230 Franklin Rd Suite 11ii, Franklin, TN 37064
                </a>
              </p>
              <p>
                <FaEnvelope className="fa-icon me-3" aria-hidden="true" />
                info@charitywater.org
              </p>
              <p>
                <FaClock className="fa-icon me-3" aria-hidden="true" /> Mon-Fri 8:30 a.m. - 5:00 p.m. ET
              </p>
              <p>
                <FaPhone className="fa-icon me-3" aria-hidden="true" /> 646-688-2323
              </p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
