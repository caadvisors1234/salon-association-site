import { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { AppsGrid } from "./AppsGrid";
import { getAllApps } from "@/lib/data/apps-data";
import { getApps } from "@/lib/microcms/fetchers";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

// 環境変数でmicroCMS使用を切り替え
const USE_MICROCMS = process.env.NEXT_PUBLIC_USE_MICROCMS === 'true';

// ISR: 10分ごとに再生成（microCMS使用時）
export const revalidate = 600;

export const metadata: Metadata = {
  title: "アプリ紹介 | AIビューティーサロン推進協会",
  description: "AIビューティーサロン推進協会が提供する革新的なアプリケーションをご紹介します。サロン経営の効率化と顧客満足度向上を実現するAI技術を活用したソリューション。",
  keywords: ["AI", "美容サロン", "アプリ", "Google投稿", "診断", "管理システム"],
  openGraph: {
    title: "アプリ紹介 | AIビューティーサロン推進協会",
    description: "AIビューティーサロン推進協会が提供する革新的なアプリケーションをご紹介します。",
    type: "website",
  },
};


export default async function AppsPage() {
  // microCMSまたは既存データからアプリデータを取得
  let apps;
  
  if (USE_MICROCMS) {
    try {
      const response = await getApps();
      apps = response.contents;
    } catch (error) {
      console.error('Failed to fetch apps from microCMS:', error);
      // フォールバック: 既存データを使用
      apps = getAllApps();
    }
  } else {
    apps = getAllApps();
  }

  // パンくずリスト用データ
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const breadcrumbItems = [
    { name: 'トップ', url: siteUrl },
    { name: 'アプリ紹介', url: `${siteUrl}/apps` }
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      
      <PageHeader
        title="アプリ紹介"
        description="AIビューティーサロン推進協会が提供する革新的なアプリケーションで、サロン経営を次のレベルへ"
        imageUrl="/images/page-header-1920x600.png"
      />

      <main className="py-16 bg-gray-50">
        <Suspense fallback={<div>Loading...</div>}>
          <AppsGrid apps={apps} />
        </Suspense>
      </main>
    </>
  );
}