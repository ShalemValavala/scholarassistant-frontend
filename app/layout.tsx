import "./globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
})  {
  return (
    <html>
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}