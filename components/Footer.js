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
import footerLogo from "@/assets/img/water-can.webp";

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
    <footer className="footer-section">
      <section id="social-links" className="social-row">
        <div className="social-inner">
          <span id="getConnected" className="social-label">
            Get connected with us on social networks
          </span>
          <div className="social-icons">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`charity: water on ${label}`}
                className="social-link"
              >
                <Icon className="fa-icon" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="footer-main">
        <div className="footer-grid">
          <div className="footer-col footer-about">
            <div className="footer-logo-row">
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
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  KZ.
                </a>
              </span>
            </p>
          </div>

          <div className="footer-col">
            <h2 className="footer-heading">See what we&apos;re about</h2>
            {SITE_LINKS.map(({ href, label }) => (
              <p key={href}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {label}
                </a>
              </p>
            ))}
          </div>

          <div className="footer-col">
            <h2 className="footer-heading">Contact</h2>
            <p className="contact-row">
              <FaHandshake className="fa-icon" aria-hidden="true" />
              <a href="https://www.charitywater.org/contact" target="_blank" rel="noopener noreferrer">
                Connect
              </a>
            </p>
            <p className="contact-row">
              <FaHome className="fa-icon" aria-hidden="true" />
              <a href="https://maps.app.goo.gl/7W9Gjbf9aT7f6whM6" target="_blank" rel="noopener noreferrer">
                230 Franklin Rd Suite 11ii, Franklin, TN 37064
              </a>
            </p>
            <p className="contact-row">
              <FaEnvelope className="fa-icon" aria-hidden="true" />
              info@charitywater.org
            </p>
            <p className="contact-row">
              <FaClock className="fa-icon" aria-hidden="true" />
              Mon-Fri 8:30 a.m. - 5:00 p.m. ET
            </p>
            <p className="contact-row">
              <FaPhone className="fa-icon" aria-hidden="true" />
              646-688-2323
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
