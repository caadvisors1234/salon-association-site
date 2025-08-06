import { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { AppsGrid } from "./AppsGrid";
import { getAllApps } from "@/lib/data/apps-data";

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


export default function AppsPage() {
  const apps = getAllApps();

  return (
    <>
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