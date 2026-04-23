import "./globals.css";
import React from "react";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
<meta name="google-site-verification" content="h9NT6PjWz7_w2qIcIwqZhzzyKJN129RygjJ9xeB-bO0" />
</head>
      <body>
        {/* ✅ Razorpay Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
        
        {children}
      </body>
    </html>
  );
}