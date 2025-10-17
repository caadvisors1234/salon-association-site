import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export default function PricingPage() {
    // パンくずリスト用データ
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const breadcrumbItems = [
        { name: 'トップ', url: siteUrl },
        { name: '料金プラン', url: `${siteUrl}/pricing` }
    ];

    return(
        <>
            <BreadcrumbJsonLd items={breadcrumbItems} />
            
            <PageHeader
                title="料金プラン"
                description="あなたのサロンの規模とニーズに合わせた、最適なプランをご提案します。"
                imageUrl="/images/page-header-1920x600.png"
            />
            
            <section className="py-16 sm:py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center text-gray-800">
                        <p className="text-base sm:text-lg mb-6">
                            当協会のサービス料金は、ご利用いただくプランやサポート内容、店舗規模によって異なります。まずはヒアリングをさせていただき、最適なプランと料金をお見積もり致します。
                        </p>
                        <p className="text-base sm:text-lg mb-8">
                            詳細はこちらよりお問い合わせください。
                        </p>
                        <Button asChild size="lg" className="touch-target w-full sm:w-auto">
                            <Link href="/contact">お問い合わせ</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    )
}
