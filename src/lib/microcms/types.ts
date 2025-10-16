/**
 * microCMS APIのレスポンス型定義
 * 
 * このファイルはmicroCMSから取得するデータの型を定義します。
 * microCMSで作成したAPIスキーマに合わせて型を定義してください。
 */

import type { MicroCMSImage, MicroCMSDate } from 'microcms-js-sdk';

/**
 * microCMSの基本フィールド
 * すべてのコンテンツに自動的に付与されるフィールド
 */
export interface MicroCMSBaseContent extends MicroCMSDate {
  id: string;
}

// ============================================================
// サイト設定（オブジェクト形式）
// ============================================================

/**
 * サイト全体の基本設定
 * エンドポイント: site-config
 * 形式: オブジェクト
 */
export interface SiteConfig extends MicroCMSDate {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  ogImage?: MicroCMSImage;
  logoImage?: MicroCMSImage;
  catchphrase: string;
  contactEmail: string;
  phone: string;
  postalCode: string;
  address: string;
  googleAnalyticsId?: string;
}

// ============================================================
// ナビゲーション（リスト形式）
// ============================================================

/**
 * ナビゲーションリンク
 * エンドポイント: navigation
 * 形式: リスト
 */
export interface Navigation extends MicroCMSBaseContent {
  label: string;
  href: string;
  order: number;
  isExternal: boolean;
}

// ============================================================
// 料金プラン（リスト形式）
// ============================================================

/**
 * 料金プランの特徴（繰り返しフィールド）
 */
export interface PricingPlanFeature {
  fieldId: string;
  text: string;
}

/**
 * 料金プラン（microCMSレスポンス型）
 * エンドポイント: pricing-plans
 * 形式: リスト
 */
export interface PricingPlanResponse extends MicroCMSBaseContent {
  name: string;
  price: string;
  priceAnnotation: string;
  description: string;
  features: PricingPlanFeature[]; // 繰り返しフィールド
  cta: string;
  href: string;
  isFeatured: boolean;
  order: number;
}

/**
 * 料金プラン（アプリケーション用型）
 * featuresを文字列配列に変換済み
 */
export interface PricingPlan extends MicroCMSBaseContent {
  name: string;
  price: string;
  priceAnnotation: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  isFeatured: boolean;
  order: number;
}

// ============================================================
// アプリ紹介（リスト形式）
// ============================================================

/**
 * アプリの特徴（繰り返しフィールド）
 */
export interface AppFeature {
  fieldId: string;
  text: string;
}

/**
 * アプリのスライド画像
 * 繰り返しフィールド
 */
export interface AppSlide {
  fieldId: string;
  image: MicroCMSImage;
  altText: string;
}

/**
 * アプリ紹介（microCMSレスポンス型）
 * エンドポイント: apps
 * 形式: リスト
 */
export interface AppResponse extends MicroCMSBaseContent {
  name: string;
  description: string;
  catchphrase: string;
  detailedDescription: string;
  features: AppFeature[]; // 繰り返しフィールド
  slides: AppSlide[];
  category: '集客支援' | 'リピート・LTV向上' | '採用・組織力強化';
  order: number;
  isPublished: boolean;
}

/**
 * アプリ紹介（アプリケーション用型）
 * featuresを文字列配列に変換済み
 * slidesをimageUrl形式に変換済み
 */
export interface App extends MicroCMSBaseContent {
  name: string;
  description: string;
  catchphrase: string;
  detailedDescription: string;
  features: string[];
  slides: Array<{ imageUrl: string; altText: string }>;
  category: '集客支援' | 'リピート・LTV向上' | '採用・組織力強化';
  order: number;
  isPublished: boolean;
}

// ============================================================
// サービス内容（リスト形式）
// ============================================================

/**
 * サービス内容
 * エンドポイント: services
 * 形式: リスト
 */
export interface Service extends MicroCMSBaseContent {
  name: string;
  title: string;
  catchphrase: string;
  heroImage: MicroCMSImage;
  description: string;
  relatedApps: App[]; // コンテンツ参照
  order: number;
}

// ============================================================
// FAQ（リスト形式）
// ============================================================

/**
 * よくある質問
 * エンドポイント: faq
 * 形式: リスト
 */
export interface FAQ extends MicroCMSBaseContent {
  category: string;
  question: string;
  answer: string;
  order: number;
  isPublished: boolean;
}

// ============================================================
// 協会概要（オブジェクト形式）
// ============================================================

/**
 * 理事メンバー情報
 * 繰り返しフィールド
 */
export interface BoardMember {
  fieldId: string;
  name: string;
  position: string;
  photo?: MicroCMSImage;
  bio: string;
}

/**
 * 協会概要
 * エンドポイント: about
 * 形式: オブジェクト
 */
export interface About extends MicroCMSDate {
  organizationName: string;
  abbreviation: string;
  establishedDate: string;
  phone: string;
  address: string;
  purpose: string;
  businessContent: string[];
  boardMembers: BoardMember[];
}

// ============================================================
// 固定ページ（リスト形式）
// ============================================================

/**
 * 固定ページ（プライバシーポリシー、利用規約など）
 * エンドポイント: pages
 * 形式: リスト
 */
export interface Page extends MicroCMSBaseContent {
  slug: string;
  title: string;
  content: string;
  metaDescription: string;
  ogImage?: MicroCMSImage;
  isPublished: boolean;
}

// ============================================================
// ユーティリティ型
// ============================================================

/**
 * microCMSのクエリパラメータ型
 */
export interface MicroCMSQueries {
  limit?: number;
  offset?: number;
  orders?: string;
  filters?: string;
  fields?: string;
  ids?: string;
  draftKey?: string;
  depth?: number;
}

