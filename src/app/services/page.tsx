import { PageHeader } from "@/components/common/PageHeader";
import { ServiceSolutionTabs } from "./ServiceSolutionTabs";
import { Suspense } from "react";
import { services } from "@/lib/data/services-data";
import { APPS_DATA as appsData } from "@/lib/data/apps-data";
import { getApps } from "@/lib/microcms/fetchers";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

// 環境変数でmicroCMS使用を切り替え
const USE_MICROCMS = process.env.NEXT_PUBLIC_USE_MICROCMS === 'true';

// ISR: 10分ごとに再生成（microCMS使用時）
export const revalidate = 600;

export default async function ServicesPage() {
    // microCMSまたは既存データからアプリデータを取得
    let apps;
    
    if (USE_MICROCMS) {
        try {
            const response = await getApps();
            apps = response.contents;
        } catch (error) {
            console.error('Failed to fetch apps from microCMS:', error);
            // フォールバック: 既存データを使用
            apps = appsData;
        }
    } else {
        apps = appsData;
    }

    // パンくずリスト用データ
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const breadcrumbItems = [
        { name: 'トップ', url: siteUrl },
        { name: '事業内容', url: `${siteUrl}/services` }
    ];

    return (
        <>
            <BreadcrumbJsonLd items={breadcrumbItems} />
            
            <PageHeader
                title="事業内容"
                description="私たちの提供するサービスは、単なるツール導入に留まりません。"
                imageUrl="/images/page-header-1920x600.png"
            />
            <Suspense fallback={<div>Loading...</div>}>
                <ServiceSolutionTabs services={services} apps={apps} />
            </Suspense>
        </>
    );
}
