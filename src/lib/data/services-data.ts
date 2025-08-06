export type Service = {
  id: string;
  name: string;
  title: string;
  catchphrase: string;
  heroImageUrl: string;
  relatedAppIds: string[];
};

// --- Data ---
export const services: Service[] = [
  {
    id: "集客支援",
    name: "集客支援",
    title: "集客の自動化と最適化で、理想のお客様を呼び込む",
    catchphrase: "月10時間の作業が、たった1時間に。",
    heroImageUrl: "/images/feature-card-1200x600-1.png",
    relatedAppIds: ["google-post-app", "style-repost-app", "style-image-ai-app"]
  },
  {
    id: "リピート-ltv向上",
    name: "リピート・LTV向上",
    title: "顧客との絆を深め、生涯価値を最大化する",
    catchphrase: "AIが実現する、次世代の顧客管理",
    heroImageUrl: "/images/feature-card-1200x600-2.png",
    relatedAppIds: ["repeat-analysis-app", "review-support-ai", "counseling-analysis-app", "hpb-review-ai"]
  },
  {
    id: "採用-組織力強化",
    name: "採用・組織力強化",
    title: "「辞めない組織」をつくり、事業成長を加速させる",
    catchphrase: "「採用してもすぐ辞めてしまう」を解決",
    heroImageUrl: "/images/feature-card-1200x600-3.png",
    relatedAppIds: ["style-title-generator", "blog-automation-app"]
  },
]; 