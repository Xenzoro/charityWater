import localFont from "next/font/local";
// Bootstrap first, then our styles, so ours win any tie.
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// next/font serves these from this site (no request to Google), preloads
// them, and uses font-display: swap. Files are committed in app/fonts.
//
// Montserrat: body text (the free stand in for charity: water's Proxima Nova).
const montserrat = localFont({
  src: [
    { path: "./fonts/montserrat-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/montserrat-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-body",
});

// Lilita One: the chunky arcade face for the title, scoreboard and buttons.
const lilita = localFont({
  src: [{ path: "./fonts/lilita-one-latin-400-normal.woff2", weight: "400", style: "normal" }],
  display: "swap",
  variable: "--font-display",
});

export const metadata = {
  title: "Charity: Water Aqua Blaster",
  description:
    "Aqua Blaster: a fast arcade game for charity: water. Hit clean water targets, avoid dirty water, and unlock real facts about the global water crisis.",
};

export const viewport = {
  themeColor: "#061B3F",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${lilita.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
