/**
 * microCMS データ取得関数
 * 
 * このファイルはmicroCMSからデータを取得する関数を提供します。
 * 各APIエンドポイントに対応する取得関数を定義しています。
 */

import { client } from './client';
import type {
  SiteConfig,
  Navigation,
  PricingPlan,
  PricingPlanResponse,
  App,
  AppResponse,
  Service,
  FAQ,
  About,
  Page,
  MicroCMSQueries,
} from './types';
import type { MicroCMSQueries as SDKQueries } from 'microcms-js-sdk';

/**
 * エラーハンドリング付きのデータ取得ラッパー
 */
async function fetchWithErrorHandling<T>(
  fetchFn: () => Promise<T>,
  errorMessage: string
): Promise<T> {
  try {
    return await fetchFn();
  } catch (error) {
    console.error(`[microCMS Error] ${errorMessage}:`, error);
    throw new Error(`${errorMessage}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// ============================================================
// サイト設定
// ============================================================

/**
 * サイト設定を取得
 * エンドポイント: site-config
 * 形式: オブジェクト
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  return fetchWithErrorHandling(
    () => client.getObject<SiteConfig>({ endpoint: 'site-config' }),
    'Failed to fetch site config'
  );
}

// ============================================================
// ナビゲーション
// ============================================================

/**
 * ナビゲーション一覧を取得
 * エンドポイント: navigation
 * 形式: リスト
 */
export async function getNavigation(queries?: MicroCMSQueries) {
  return fetchWithErrorHandling(
    () =>
      client.getList<Navigation>({
        endpoint: 'navigation',
        queries: {
          orders: 'order',
          ...queries,
        } as SDKQueries,
      }),
    'Failed to fetch navigation'
  );
}

// ============================================================
// 料金プラン
// ============================================================

/**
 * 料金プラン一覧を取得
 * エンドポイント: pricing-plans
 * 形式: リスト
 * 
 * 注意: featuresフィールドは繰り返しフィールドのため、
 * レスポンスを文字列配列に変換して返します
 */
export async function getPricingPlans(queries?: MicroCMSQueries) {
  return fetchWithErrorHandling(
    async () => {
      const response = await client.getList<PricingPlanResponse>({
        endpoint: 'pricing-plans',
        queries: {
          orders: 'order',
          ...queries,
        } as SDKQueries,
      });
      
      // 繰り返しフィールドを文字列配列に変換
      const transformedContents: PricingPlan[] = response.contents.map((plan) => ({
        ...plan,
        features: plan.features.map((feature) => feature.text),
      }));
      
      return {
        ...response,
        contents: transformedContents,
      };
    },
    'Failed to fetch pricing plans'
  );
}

/**
 * 特定の料金プランを取得
 */
export async function getPricingPlanById(id: string, queries?: MicroCMSQueries) {
  return fetchWithErrorHandling(
    async () => {
      const plan = await client.getListDetail<PricingPlanResponse>({
        endpoint: 'pricing-plans',
        contentId: id,
        queries: queries as SDKQueries,
      });
      
      // 繰り返しフィールドを文字列配列に変換
      return {
        ...plan,
        features: plan.features.map((feature) => feature.text),
      } as PricingPlan;
    },
    `Failed to fetch pricing plan with id: ${id}`
  );
}

// ============================================================
// アプリ紹介
// ============================================================

/**
 * アプリ一覧を取得
 * エンドポイント: apps
 * 形式: リスト
 * 
 * 注意: featuresとslidesフィールドは繰り返しフィールドのため、
 * レスポンスを適切な形式に変換して返します
 */
export async function getApps(queries?: MicroCMSQueries) {
  return fetchWithErrorHandling(
    async () => {
      const response = await client.getList<AppResponse>({
        endpoint: 'apps',
        queries: {
          orders: 'order',
          filters: 'isPublished[equals]true',
          ...queries,
        } as SDKQueries,
      });
      
      // 繰り返しフィールドとカテゴリを変換
      const transformedContents: App[] = response.contents.map((app) => ({
        ...app,
        features: app.features.map((feature) => feature.text),
        slides: app.slides.map((slide) => ({
          imageUrl: slide.image.url,
          altText: slide.altText,
        })),
        // categoryが配列で返される場合は最初の要素を取得
        category: Array.isArray(app.category) ? app.category[0] : app.category,
      }));
      
      return {
        ...response,
        contents: transformedContents,
      };
    },
    'Failed to fetch apps'
  );
}

/**
 * 特定のアプリを取得
 */
export async function getAppById(id: string, queries?: MicroCMSQueries) {
  return fetchWithErrorHandling(
    async () => {
      const app = await client.getListDetail<AppResponse>({
        endpoint: 'apps',
        contentId: id,
        queries: queries as SDKQueries,
      });
      
      // 繰り返しフィールドとカテゴリを変換
      return {
        ...app,
        features: app.features.map((feature) => feature.text),
        slides: app.slides.map((slide) => ({
          imageUrl: slide.image.url,
          altText: slide.altText,
        })),
        // categoryが配列で返される場合は最初の要素を取得
        category: Array.isArray(app.category) ? app.category[0] : app.category,
      } as App;
    },
    `Failed to fetch app with id: ${id}`
  );
}

/**
 * カテゴリ別にアプリを取得
 */
export async function getAppsByCategory(
  category: '集客支援' | 'リピート・LTV向上' | '採用・組織力強化',
  queries?: MicroCMSQueries
) {
  return fetchWithErrorHandling(
    async () => {
      const response = await client.getList<AppResponse>({
        endpoint: 'apps',
        queries: {
          orders: 'order',
          filters: `isPublished[equals]true[and]category[equals]${category}`,
          ...queries,
        } as SDKQueries,
      });
      
      // 繰り返しフィールドとカテゴリを変換
      const transformedContents: App[] = response.contents.map((app) => ({
        ...app,
        features: app.features.map((feature) => feature.text),
        slides: app.slides.map((slide) => ({
          imageUrl: slide.image.url,
          altText: slide.altText,
        })),
        // categoryが配列で返される場合は最初の要素を取得
        category: Array.isArray(app.category) ? app.category[0] : app.category,
      }));
      
      return {
        ...response,
        contents: transformedContents,
      };
    },
    `Failed to fetch apps by category: ${category}`
  );
}

// ============================================================
// サービス内容
// ============================================================

/**
 * サービス一覧を取得
 * エンドポイント: services
 * 形式: リスト
 */
export async function getServices(queries?: MicroCMSQueries) {
  return fetchWithErrorHandling(
    () =>
      client.getList<Service>({
        endpoint: 'services',
        queries: {
          orders: 'order',
          ...queries,
        } as SDKQueries,
      }),
    'Failed to fetch services'
  );
}

/**
 * 特定のサービスを取得
 */
export async function getServiceById(id: string, queries?: MicroCMSQueries) {
  return fetchWithErrorHandling(
    () =>
      client.getListDetail<Service>({
        endpoint: 'services',
        contentId: id,
        queries: queries as SDKQueries,
      }),
    `Failed to fetch service with id: ${id}`
  );
}

// ============================================================
// FAQ
// ============================================================

/**
 * FAQ一覧を取得
 * エンドポイント: faq
 * 形式: リスト
 */
export async function getFAQs(queries?: MicroCMSQueries) {
  return fetchWithErrorHandling(
    () =>
      client.getList<FAQ>({
        endpoint: 'faq',
        queries: {
          orders: 'order',
          filters: 'isPublished[equals]true',
          ...queries,
        } as SDKQueries,
      }),
    'Failed to fetch FAQs'
  );
}

/**
 * カテゴリ別にFAQを取得
 */
export async function getFAQsByCategory(category: string, queries?: MicroCMSQueries) {
  return fetchWithErrorHandling(
    () =>
      client.getList<FAQ>({
        endpoint: 'faq',
        queries: {
          orders: 'order',
          filters: `isPublished[equals]true[and]category[equals]${category}`,
          ...queries,
        } as SDKQueries,
      }),
    `Failed to fetch FAQs by category: ${category}`
  );
}

// ============================================================
// 協会概要
// ============================================================

/**
 * 協会概要を取得
 * エンドポイント: about
 * 形式: オブジェクト
 */
export async function getAbout(): Promise<About> {
  return fetchWithErrorHandling(
    () => client.getObject<About>({ endpoint: 'about' }),
    'Failed to fetch about'
  );
}

// ============================================================
// 固定ページ
// ============================================================

/**
 * 固定ページ一覧を取得
 * エンドポイント: pages
 * 形式: リスト
 */
export async function getPages(queries?: MicroCMSQueries) {
  return fetchWithErrorHandling(
    () =>
      client.getList<Page>({
        endpoint: 'pages',
        queries: {
          filters: 'isPublished[equals]true',
          ...queries,
        } as SDKQueries,
      }),
    'Failed to fetch pages'
  );
}

/**
 * スラッグから固定ページを取得
 */
export async function getPageBySlug(slug: string, queries?: MicroCMSQueries) {
  return fetchWithErrorHandling(
    async () => {
      const response = await client.getList<Page>({
        endpoint: 'pages',
        queries: {
          filters: `slug[equals]${slug}`,
          limit: 1,
          ...queries,
        } as SDKQueries,
      });
      
      if (response.contents.length === 0) {
        throw new Error(`Page not found: ${slug}`);
      }
      
      return response.contents[0];
    },
    `Failed to fetch page by slug: ${slug}`
  );
}

/**
 * IDから固定ページを取得
 */
export async function getPageById(id: string, queries?: MicroCMSQueries) {
  return fetchWithErrorHandling(
    () =>
      client.getListDetail<Page>({
        endpoint: 'pages',
        contentId: id,
        queries: queries as SDKQueries,
      }),
    `Failed to fetch page with id: ${id}`
  );
}

// ============================================================
// ユーティリティ関数
// ============================================================

/**
 * microCMSの接続テスト
 * microCMSへの接続が正常かどうかを確認
 */
export async function testConnection(): Promise<boolean> {
  try {
    // 存在しないエンドポイントでもエラーがthrowされるため、
    // APIキーが正しいかどうかのテストに使用
    await client.getList({
      endpoint: 'test',
      queries: { limit: 1 } as SDKQueries,
    });
    return true;
  } catch (error) {
    // 404エラー（エンドポイントが存在しない）であれば接続は成功
    if (error instanceof Error && error.message.includes('404')) {
      return true;
    }
    console.error('[microCMS Connection Test] Failed:', error);
    return false;
  }
}

