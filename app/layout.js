import localFont from "next/font/local";
// Order matters: our styles first, then Bootstrap, exactly like the old
// index.html. Bootstrap wins ties, so the site looks the same as before.
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// next/font serves Montserrat from this site (no request to Google),
// preloads it, and uses font-display: swap. The files are the same Google
// Fonts Montserrat (latin), committed in app/fonts so the build never
// depends on reaching Google. Only 400 and 700 are loaded, same as the old
// Google Fonts link, so text renders at the same weights as before.
const montserrat = localFont({
  src: [
    { path: "./fonts/montserrat-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/montserrat-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-montserrat",
});

// Fail the build if anything ever makes this site render per request.
export const ensureStatic = "navigation";

export const metadata = {
  title: "Charity: Water Aqua Blaster",
  description:
    "Aqua Blaster: a fast arcade game for charity: water. Hit clean water targets, avoid dirty water, and unlock real facts about the global water crisis.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
