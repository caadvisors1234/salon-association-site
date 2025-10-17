import type { Metadata } from "next";
import { EB_Garamond, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getSiteConfig } from "@/lib/microcms/fetchers";
import { SITE_NAME } from "@/lib/constants";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: ["400", "700"],
  subsets: ["cyrillic"],
});

// 環境変数でmicroCMS使用を切り替え
const USE_MICROCMS = process.env.NEXT_PUBLIC_USE_MICROCMS === 'true';

// デフォルト値
const defaultSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const defaultSiteDescription = "AIビューティーサロン推進協会は、AI技術を活用して美容サロンの経営効率化、顧客満足度の向上、そして新たな価値創造を支援します。";
const defaultOgImage = "/images/og-image.png";

// メタデータ生成（microCMSまたはデフォルト値）
export async function generateMetadata(): Promise<Metadata> {
  let siteName = SITE_NAME;
  let siteDescription = defaultSiteDescription;
  let siteUrl = defaultSiteUrl;
  let ogImageUrl = defaultOgImage;

  if (USE_MICROCMS) {
    try {
      const config = await getSiteConfig();
      siteName = config.siteName;
      siteDescription = config.siteDescription;
      siteUrl = config.siteUrl;
      ogImageUrl = config.ogImage?.url || defaultOgImage;
    } catch (error) {
      console.error('Failed to fetch site config from microCMS:', error);
      // フォールバック: デフォルト値を使用
    }
  }

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${siteName} | AIでサロン経営を革新`,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    keywords: ["AI", "美容サロン", "経営効率化", "集客自動化", "リピート率向上", "採用最適化", "DX", "サロンDX", "美容室経営", "ヘアサロン", "HotPepper Beauty", "Google口コミ", "スタッフ育成"],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: `${siteName} | AIでサロン経営を革新`,
      description: siteDescription,
      url: siteUrl,
      siteName: siteName,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
      locale: "ja_JP",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteName} | AIでサロン経営を革新`,
      description: siteDescription,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Google Analytics ID と サイト情報を取得
  let gaId = process.env.NEXT_PUBLIC_GA_ID || "";
  let phone = "";
  let address = "";
  let postalCode = "";
  
  if (USE_MICROCMS) {
    try {
      const config = await getSiteConfig();
      gaId = gaId || config.googleAnalyticsId || "";
      phone = config.phone || "";
      address = config.address || "";
      postalCode = config.postalCode || "";
    } catch (error) {
      console.error('Failed to fetch config from microCMS:', error);
    }
  }

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
        <OrganizationJsonLd phone={phone} address={address} postalCode={postalCode} />
        <WebsiteJsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
        <SpeedInsights />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
