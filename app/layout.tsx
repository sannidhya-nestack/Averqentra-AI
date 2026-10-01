import type { Metadata, Viewport } from "next";
import { Crimson_Text, Manrope, Fragment_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { PRODUCT } from "@/lib/product";

/* Type system:
   • Crimson Text  - display serif (headlines, wordmark).
   • Manrope       - humanist body sans (paragraphs, forms).
   • Fragment Mono - lowercase eyebrow / label face. */
const display = Crimson_Text({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});
const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const monoLabel = Fragment_Mono({
  variable: "--font-mono-label",
  subsets: ["latin"],
  weight: ["400"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#2e3231",
};

export const metadata: Metadata = {
  title: `${PRODUCT.name} - ${PRODUCT.tagline}`,
  description:
    "Averqentra AI is the AI-Powered Healthcare Transformation Intelligence Platform moving consulting work from Evidence to Analysis, Recommendation, Execution, and Measurable Outcome.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${monoLabel.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
