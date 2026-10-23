import "./globals.css";

export const metadata = {
  title: "Charity: Water Aqua Blaster",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
