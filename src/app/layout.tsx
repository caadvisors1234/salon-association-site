import type { Metadata } from "next";
import { EB_Garamond, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd";
import { GoogleAnalytics } from "@next/third-parties/google";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: ["400", "700"],
  subsets: ["cyrillic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AIビューティーサロン推進協会 | AIでサロン経営を革新",
  description: "AIビューティーサロン推進協会は、AI技術を活用して美容サロンの経営効率化、顧客満足度の向上、そして新たな価値創造を支援します。",
  keywords: ["AI", "美容サロン", "経営効率化", "集客自動化", "リピート率向上", "採用最適化"],
  openGraph: {
    title: "AIビューティーサロン推進協会 | AIでサロン経営を革新",
    description: "AIビューティーサロン推進協会は、AI技術を活用して美容サロンの経営効率化、顧客満足度の向上、そして新たな価値創造を支援します。",
    url: "/",
    siteName: "AIビューティーサロン推進協会",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "AIビューティーサロン推進協会",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIビューティーサロン推進協会 | AIでサロン経営を革新",
    description: "AIビューティーサロン推進協会は、AI技術を活用して美容サロンの経営効率化、顧客満足度の向上、そして新たな価値創造を支援します。",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "";

  return (
    <html lang="ja">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          ebGaramond.variable,
          notoSansJp.variable
        )}
        suppressHydrationWarning={true}
      >
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
