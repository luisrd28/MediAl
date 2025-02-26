import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* You can add meta tags, title, etc. here */}
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

