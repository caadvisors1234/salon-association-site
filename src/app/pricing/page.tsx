import { PageHeader } from "@/components/common/PageHeader";
import { PricingCard } from "@/components/common/PricingCard";
import { pricingPlans } from "@/lib/plans";
import { Notice } from "@/components/common/Notice";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const noticeItems = [
    "表示価格はすべて税抜き価格です。別途消費税がかかります。",
    "1店舗あたりスタッフ10名までを「1店舗」としてカウントします。",
    "スタッフが11名以上になる場合、超過10名ごとに「＋1店舗」として追加計算されます。",
    "契約外での不正活用が発覚した場合、契約開始から1店舗または1名ごとに月額50,000円を請求致します。",
]

export default function PricingPage() {
    return(
        <>
            <PageHeader
                title="料金プラン"
                description="お客様のサロンの規模とニーズに合わせた、最適なプランをご提案します。"
                imageUrl="/images/page-header-1920x600.png"
            />
            
            <section className="py-24 bg-background">
                <div className="container mx-auto">
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 items-start">
                        {pricingPlans.map((plan) => (
                           <PricingCard key={plan.name} plan={plan} />
                        ))}
                    </div> */}

                    <div className="mb-24 text-center max-w-3xl mx-auto text-gray-800 dark:text-gray-200">
                        <p className="mb-6 leading-relaxed">
                            当協会のサービス料金は、ご利用いただくプランやサポート内容、店舗規模によって異なります。まずはヒアリングをさせていただき、最適なプランと料金をお見積もり致します。
                        </p>
                        <p className="mb-8 leading-relaxed">
                            詳細はこちらよりお問い合わせください。
                        </p>
                        <Button asChild size="lg" className="touch-target w-full sm:w-auto">
                            <Link href="/contact">お問い合わせ</Link>
                        </Button>
                    </div>

                    {/* <Notice 
                        title="ご契約前の注意事項"
                        items={noticeItems}
                        variant="warning"
                    /> */}
                </div>
            </section>
        </>
    )
}
