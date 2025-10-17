import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // 環境変数からサイトのURLを取得。設定されていない場合は仮のURLを使用。
  // .env.localファイルで NEXT_PUBLIC_SITE_URL="https://your-domain.com" のように設定してください。
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-beauty-salon-association.com';

  // 現在の日付を取得
  const now = new Date();

  // 静的ページのルート（優先度とchangefreqを追加してSEO最適化）
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/pricing`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/apps`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  return routes;
} 