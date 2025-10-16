import { PageHeader } from "@/components/common/PageHeader";
import { FaqAccordion } from "./FaqAccordion";
import { getFAQs } from "@/lib/microcms/fetchers";

// 環境変数でmicroCMS使用を切り替え
const USE_MICROCMS = process.env.NEXT_PUBLIC_USE_MICROCMS === 'true';

// ISR: 10分ごとに再生成（microCMS使用時）
export const revalidate = 600;

// 既存データ（フォールバック用）
const faqData = [
    {
      question: "AIに関する専門知識がなくても利用できますか？",
      answer: "はい、もちろんです。私たちのサービスは、AIやITの専門知識がない方でも直感的に操作できるように設計されています。導入から運用まで、専門スタッフが丁寧にサポートしますのでご安心ください。",
    },
    {
      question: "どのくらいの規模のサロンから利用できますか？",
      answer: "個人経営の小規模サロン様から、複数店舗を展開する大規模サロン様まで、あらゆる規模のサロン様にご利用いただけます。事業規模に合わせて最適なプランをご提案いたします。",
    },
    {
      question: "料金の支払い方法を教えてください。",
      answer: "クレジットカード決済と銀行振込に対応しております。月額払いまたは年額払いをお選びいただけます。",
    },
    {
        question: "解約はいつでもできますか？",
        answer: "はい、いつでも解約手続きが可能です。ただし、契約期間の途中で解約された場合でも、残期間分の料金の返金はいたしかねますのでご了承ください。詳細については利用規約をご確認ください。",
    }
  ];

export default async function FaqPage() {
  // microCMSまたは既存データからFAQを取得
  let faqs;
  
  if (USE_MICROCMS) {
    try {
      const response = await getFAQs();
      faqs = response.contents;
    } catch (error) {
      console.error('Failed to fetch FAQs from microCMS:', error);
      // フォールバック: 既存データを使用
      faqs = faqData;
    }
  } else {
    faqs = faqData;
  }

  return (
    <>
        <PageHeader
            title="よくある質問"
            description="サービスや協会に関する、よくあるご質問をまとめました。"
            imageUrl="/images/page-header-1920x600.png"
        />

        <section className="py-24 bg-background">
            <div className="container mx-auto max-w-4xl">
                <FaqAccordion data={faqs} />
            </div>
        </section>
    </>
  );
}
