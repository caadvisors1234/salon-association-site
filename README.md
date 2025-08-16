# AIビューティーサロン推進協会 公式ウェブサイト

一般社団法人AIビューティーサロン推進協会の公式ウェブサイトです。AI技術を活用した美容サロンの経営支援、集客自動化、リピート率向上、採用最適化を提供します。

## 技術スタック

- **フレームワーク**: Next.js 15.3.3 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS 4
- **UIコンポーネント**: shadcn/ui
- **アニメーション**: Framer Motion
- **フォーム管理**: React Hook Form + Zod
- **メール送信**: Resend + React Email
- **ホスティング**: Vercel

## 開発環境のセットアップ

1. **リポジトリのクローン**
```bash
git clone [repository-url]
cd salon-association-site
```

2. **依存関係のインストール**
```bash
npm install
```

3. **環境変数の設定**
プロジェクトルートに `.env.local` ファイルを作成し、必要な環境変数を設定してください。
詳細は [docs/environment-setup.md](./docs/environment-setup.md) を参照してください。

4. **開発サーバーの起動**
```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) でサイトにアクセスできます。

## 主要な機能

### ✨ 実装済み機能
- **レスポンシブデザイン**: スマホ・タブレット・PC対応
- **SEO最適化**: メタデータ、構造化データ、OGP対応
- **アクセシビリティ**: WCAG準拠、スクリーンリーダー対応
- **パフォーマンス最適化**: 画像最適化、コード分割
- **セキュリティ**: CSP、セキュリティヘッダー設定
- **エラーハンドリング**: カスタム404・500ページ
- **お問い合わせフォーム**: バリデーション、メール送信
- **ニュース管理**: Markdownベースのコンテンツ管理
- **認証機能**: special-planページのパスワード認証（Cookieベース）

## プロジェクト構成

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # ルートレイアウト
│   ├── page.tsx        # トップページ
│   ├── error.tsx       # グローバルエラーページ
│   ├── not-found.tsx   # 404ページ
│   └── [各ページ]/
├── components/          # Reactコンポーネント
│   ├── ui/             # UIコンポーネント (shadcn/ui)
│   ├── layout/         # レイアウトコンポーネント
│   ├── home/           # トップページコンポーネント
│   ├── common/         # 共通コンポーネント
│   └── seo/            # SEO関連コンポーネント
├── lib/                # ユーティリティ関数
└── content/            # Markdownコンテンツ
```

## 利用可能なスクリプト

```bash
npm run dev        # 開発サーバー起動
npm run build      # プロダクションビルド
npm run start      # プロダクションサーバー起動
npm run lint       # ESLintによるコードチェック
npm run test       # Jestテスト実行
npm run test:e2e   # Playwrightテスト実行
```

## SEO・パフォーマンス対応

### 📊 SEO最適化
- メタデータの適切な設定
- Open Graph Protocol (OGP) 対応
- Twitter Cards対応
- JSON-LD構造化データ
- サイトマップ自動生成
- robots.txt設定

### 🚀 パフォーマンス最適化
- Next.js Image最適化
- WebP/AVIF形式への自動変換
- 遅延読み込み（Lazy Loading）
- コード分割（Code Splitting）
- フォント最適化

### 🔒 セキュリティ対応
- Content Security Policy (CSP)
- セキュリティヘッダー設定
- XSS対策
- CSRF対策
- HTTPS強制

## デプロイ

このプロジェクトは [Vercel Platform](https://vercel.com/) でのデプロイに最適化されています。

1. GitHubリポジトリをVercelに接続
2. 環境変数を設定
3. 自動デプロイが開始されます

詳細は [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) を参照してください。

## 貢献

プロジェクトに貢献する際は、以下のガイドラインに従ってください：

1. Issue を作成して問題を報告
2. Feature branch を作成
3. コードの変更と適切なテストを実装
4. Pull Request を作成

## ライセンス

このプロジェクトは一般社団法人AIビューティーサロン推進協会の所有物です。
