import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Forward Falls Initiative | Democratizing Education",
    template: "%s | Forward Falls Initiative",
  },
  description: "A youth-led non-profit dedicated to democratizing access to post-secondary education and quality learning opportunities.",
  metadataBase: new URL("https://forwardfallsinitiative.org"),
  icons: { icon: "/FFI.png" },
  openGraph: {
    type: "website",
    siteName: "Forward Falls Initiative",
    title: "Forward Falls Initiative | Democratizing Education",
    description: "A youth-led non-profit dedicated to democratizing access to post-secondary education and quality learning opportunities.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forward Falls Initiative",
    description: "A youth-led non-profit dedicated to democratizing access to post-secondary education and quality learning opportunities.",
    images: ["/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
