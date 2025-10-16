import { PageHeader } from "@/components/common/PageHeader";
import { PricingCard } from "@/components/common/PricingCard";
import { pricingPlans } from "@/lib/plans";
import { getPricingPlans } from "@/lib/microcms/fetchers";
import { Notice } from "@/components/common/Notice";

// 環境変数でmicroCMS使用を切り替え
const USE_MICROCMS = process.env.NEXT_PUBLIC_USE_MICROCMS === 'true';

const noticeItems = [
    "表示価格はすべて税抜き価格です。別途消費税がかかります。",
    "1店舗あたりスタッフ10名までを「1店舗」としてカウントします。",
    "スタッフが11名以上になる場合、超過10名ごとに「＋1店舗」として追加計算されます。",
    "契約外での不正活用が発覚した場合、契約開始から1店舗または1名ごとに月額50,000円を請求致します。",
]

// ISR: 10分ごとに再生成（microCMS使用時）
// Next.jsのビルド時制約により、条件式ではなく直接値を設定
export const revalidate = 600;

export default async function PricingPage() {
    // microCMSまたは既存データから料金プランを取得
    let plans;
    
    if (USE_MICROCMS) {
        try {
            const response = await getPricingPlans();
            plans = response.contents;
        } catch (error) {
            console.error('Failed to fetch pricing plans from microCMS:', error);
            // フォールバック: 既存データを使用
            plans = pricingPlans;
        }
    } else {
        plans = pricingPlans;
    }

    return(
        <>
            <PageHeader
                title="料金プラン"
                description="お客様のサロンの規模とニーズに合わせた、最適なプランをご提案します。"
                imageUrl="/images/page-header-1920x600.png"
            />
            
            <section className="py-24 bg-background">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 items-start">
                        {plans.map((plan) => (
                           <PricingCard key={plan.name} plan={plan} />
                        ))}
                    </div>

                    <Notice 
                        title="ご契約前の注意事項"
                        items={noticeItems}
                        variant="warning"
                    />
                </div>
            </section>
        </>
    )
}
