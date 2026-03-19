import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AdminBar from "@/components/admin/AdminBar";
import { AdminProvider } from "@/lib/admin-context";
import config from "@/config/framework.config";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: config.seo.defaultTitle,
    template: config.seo.titleTemplate,
  },
  description: config.seo.description,
  metadataBase: new URL(config.site.metadataBase),
  icons: {
    icon: [{ url: config.org.favicon, type: 'image/png' }],
    apple: config.org.favicon,
    shortcut: config.org.favicon,
  },
  openGraph: {
    type: "website",
    siteName: config.org.name,
    title: config.seo.defaultTitle,
    description: config.seo.description,
    images: [{ url: config.org.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: config.org.name,
    description: config.seo.description,
    images: [config.org.ogImage],
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
        <AdminProvider>
          <AdminBar />
          {children}
        </AdminProvider>
      </body>
    </html>
  );
}
