import { PageHeader } from "@/components/common/PageHeader";
import { FaqAccordion } from "./FaqAccordion";

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

export default function FaqPage() {
  return (
    <>
        <PageHeader
            title="よくある質問"
            description="サービスや協会に関する、よくあるご質問をまとめました。"
            imageUrl="/images/page-header-1920x600.png"
        />

        <section className="py-24 bg-background">
            <div className="container mx-auto max-w-4xl">
                <FaqAccordion data={faqData} />
            </div>
        </section>
    </>
  );
}
