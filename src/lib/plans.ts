// 料金プランの型定義
export type PricingPlan = {
  name: string;
  price: string;
  priceAnnotation?: string; // "月額" などの注釈
  description: string;
  href: string;
  cta: string;
  features: string[];
  isFeatured?: boolean;
};

// サイト全体で使用する料金プランのデータ
export const pricingPlans: PricingPlan[] = [
  {
    name: "ライト会員",
    price: "29800",
    priceAnnotation: "円/月",
    description: "集客の効率化を始めたい全てのサロン様へ",
    features: [
      "集客自動化ツールは全て提供",
      "ホットペッパー攻略講座",
      "Googleマップ対策講座",
      "LINEトークサポート（電話対応なし）",
    ],
    cta: "このプランで始める",
    href: "/contact?plan=light",
    isFeatured: false,
  },
  {
    name: "プレミアム会員",
    price: "50000",
    priceAnnotation: "円/月",
    description: "集客からリピート・採用まで総合的に強化したいサロン様へ",
    features: [
      "ライト会員内容すべて",
      "勝てるヘアスタイル提供",
      "リピート対策ツール",
      "求人対策攻略講座、各種ツール",
      "LINEトークサポート（電話対応なし）",
    ],
    cta: "このプランで始める",
    href: "/contact?plan=premium",
    isFeatured: true,
  },
  {
    name: "ダイヤモンド会員",
    price: "150000",
    priceAnnotation: "円/月",
    description: "コンサルティングで経営を加速させたい多店舗展開サロン様へ",
    features: [
      "プレミアム会員内容すべて",
      "月1回面談サポート（集客／リピート/求人顧問）",
      "オリジナル勉強会開催権(年4回まで)",
      "AIツール開発相談（※多店舗のみ受付可能）",
    ],
    cta: "このプランで始める",
    href: "/contact?plan=diamond",
    isFeatured: false,
  },
  {
    name: "賛助会員",
    price: "9800",
    priceAnnotation: "円/1口",
    description: "個人として協会の活動を支援したい方へ",
    features: [
      "シークレット特典あり",
      "協会の活動支援",
      "クラウドファンディングイメージ",
    ],
    cta: "活動を支援する",
    href: "/contact?plan=supporter",
    isFeatured: false,
  },
]; 