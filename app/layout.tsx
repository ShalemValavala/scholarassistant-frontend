import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "ScholarAssistant | AI Research Writing & Editing Services",
  description:
    "AI-powered research paper editing, plagiarism reduction, AI content rewriting, and academic guidance. Improve your research papers instantly.",
  keywords: [
    "research paper editing",
    "plagiarism removal",
    "AI rewriting tool",
    "academic writing help",
    "research assistant AI"
  ],
  openGraph: {
    title: "ScholarAssistant",
    description: "AI-powered research writing platform",
    url: "https://scholarassistant-frontend.vercel.app",
    siteName: "ScholarAssistant",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}