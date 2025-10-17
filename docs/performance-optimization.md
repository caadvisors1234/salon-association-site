# パフォーマンス最適化設定

このドキュメントは、サイトのパフォーマンス最適化設定をまとめたものです。

---

## 📊 ISR（Incremental Static Regeneration）設定

Next.js 15のISR機能により、静的生成されたページを定期的に再検証し、最新のコンテンツを提供します。

### 現在の設定

| ページ | revalidate（秒） | 再検証間隔 | 理由 |
|--------|-----------------|-----------|------|
| トップページ (`/`) | - | ビルド時のみ | 静的コンテンツのみ |
| アプリ紹介 (`/apps`) | 600 | 10分 | microCMSから取得 |
| サービス (`/services`) | 600 | 10分 | microCMSのアプリデータを使用 |
| FAQ (`/faq`) | 600 | 10分 | microCMSから取得 |
| 協会概要 (`/about`) | 600 | 10分 | microCMSから取得 |
| その他ページ | - | ビルド時のみ | 静的コンテンツのみ |

### revalidateの動作

```typescript
// 例: src/app/apps/page.tsx
export const revalidate = 600; // 10分（600秒）

export default async function AppsPage() {
  // microCMSからデータ取得
  const response = await getApps();
  // ...
}
```

**動作の流れ**:
1. 初回アクセス時: サーバーでデータを取得し、HTMLを生成
2. 10分以内の再アクセス: キャッシュされたHTMLを返す（高速）
3. 10分経過後の次のアクセス:
   - キャッシュされたHTMLを返す（高速）
   - バックグラウンドで再検証を開始
4. 再検証完了後: 新しいHTMLをキャッシュ

---

## ⚡ On-Demand Revalidation（Webhook）

Webhook機能により、microCMSでコンテンツを更新したときに即座にキャッシュを再検証します。

### 設定されているWebhook

| API | 再検証されるページ |
|-----|------------------|
| site-config | 全ページ（フッター、メタデータ） |
| apps | `/apps`, `/services` |
| faq | `/faq` |
| about | `/about` |

### Webhookの利点

- ✅ コンテンツ更新が即座に反映（数秒以内）
- ✅ ISRの待ち時間（最大10分）を待つ必要がない
- ✅ 管理者がリアルタイムでプレビューできる

**設定方法**: `docs/webhook-setup-guide.md` を参照

---

## 🖼️ 画像最適化

Next.jsの`next/image`コンポーネントにより、画像が自動的に最適化されます。

### 設定（next.config.ts）

```typescript
const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30日
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        pathname: '/assets/**',
      },
    ],
  },
};
```

### 最適化内容

- ✅ WebP/AVIF形式への自動変換（対応ブラウザのみ）
- ✅ レスポンシブ画像の自動生成
- ✅ 遅延読み込み（Lazy Loading）
- ✅ 30日間のキャッシュ

---

## 📦 パッケージ最適化

### Tree Shaking

使用されていないコードを自動的に削除します（Next.js標準機能）。

### パッケージのインポート最適化

```typescript
// next.config.ts
experimental: {
  optimizePackageImports: ['lucide-react', 'framer-motion'],
},
```

大きなライブラリ（`lucide-react`, `framer-motion`）から必要なコンポーネントのみをインポートします。

---

## 🌐 フォールバック戦略

microCMSのAPI取得に失敗した場合、既存のローカルデータにフォールバックします。

### 実装箇所

- `/apps`: `src/lib/data/apps-data.ts` にフォールバック
- `/faq`: ハードコードされたFAQデータにフォールバック
- `/about`: `src/lib/data/about-data.ts` にフォールバック

```typescript
// 例: src/app/apps/page.tsx
if (USE_MICROCMS) {
  try {
    const response = await getApps();
    apps = response.contents;
  } catch (error) {
    console.error('Failed to fetch apps from microCMS:', error);
    apps = getAllApps(); // ← フォールバック
  }
} else {
  apps = getAllApps();
}
```

### フォールバックの利点

- ✅ microCMSがダウンしてもサイトが表示される
- ✅ APIリミットに達してもフォールバックで動作
- ✅ 開発環境でmicroCMSを使わない場合も動作

---

## 📈 パフォーマンスメトリクス

### 推奨値（Core Web Vitals）

| メトリクス | 目標値 | 説明 |
|-----------|--------|------|
| LCP (Largest Contentful Paint) | < 2.5秒 | 最大コンテンツの描画時間 |
| FID (First Input Delay) | < 100ms | 初回入力遅延 |
| CLS (Cumulative Layout Shift) | < 0.1 | レイアウトシフトの累積 |

### 計測方法

#### 1. Lighthouse（Chrome DevTools）

```bash
# Chrome DevToolsを開く（F12）
# Lighthouseタブ → 「分析」をクリック
```

#### 2. Next.js Analytics（Vercel）

Vercelにデプロイすると、自動的にパフォーマンスメトリクスが記録されます。

#### 3. PageSpeed Insights

https://pagespeed.web.dev/

デプロイ後のURLを入力して計測します。

---

## 🔧 推奨される最適化（将来的な改善）

### 1. CDN配信（Vercel Edge Network）

Vercelにデプロイすると、自動的に世界中のCDNからコンテンツが配信されます。

### 2. フォント最適化

```typescript
// 既に実装済み
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});
```

### 3. Code Splitting（自動）

Next.js App Routerでは、ページごとに自動的にコードが分割されます。

### 4. Dynamic Import（オプション）

重いコンポーネントは動的インポートで遅延読み込みできます：

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

---

## 🎯 現在のパフォーマンス状況

### ✅ 実装済み

- ✅ ISR（10分間隔）
- ✅ On-Demand Revalidation（Webhook）
- ✅ 画像最適化（WebP/AVIF）
- ✅ パッケージのインポート最適化
- ✅ フォールバック戦略
- ✅ フォント最適化

### 📋 今後の検討事項

- [ ] キャッシュ戦略の微調整（必要に応じて）
- [ ] パフォーマンスモニタリングの継続
- [ ] CDN配信の確認（Vercel）

---

## 📌 重要な注意事項

### revalidate時間の調整

現在は全ページで10分（600秒）に設定していますが、コンテンツの更新頻度に応じて調整できます：

```typescript
// 頻繁に更新される場合
export const revalidate = 60; // 1分

// あまり更新されない場合
export const revalidate = 3600; // 1時間

// 静的ページ（更新なし）
// revalidateを設定しない
```

### フォールバックデータの更新

本番環境で完全にmicroCMSに移行した後も、フォールバックデータは最新の状態に保つことを推奨します。

---

**作成日**: 2025年10月16日  
**最終更新**: 2025年10月16日

