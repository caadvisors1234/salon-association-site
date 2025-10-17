# 本番環境移行ガイド

このドキュメントは、microCMS統合を完了し、本番環境にデプロイするためのガイドです。

---

## 📋 移行前のチェックリスト

### 1. microCMSデータ入力の完了確認

以下のすべてのAPIにデータが入力され、公開されていることを確認してください。

- ✅ **サイト基本情報（site-config）**: 1件（オブジェクト形式）
- ✅ **アプリ紹介（apps）**: 9件（リスト形式）
- ✅ **FAQ（faq）**: 4件以上（リスト形式）
- ✅ **協会概要（about）**: 1件（オブジェクト形式）

### 2. ローカル環境での動作確認

```bash
# .env.localでmicroCMS使用を有効化
NEXT_PUBLIC_USE_MICROCMS=true

# 開発サーバーを起動
npm run dev
```

以下のページをすべて確認：
- [ ] トップページ (`/`) - フッターの連絡先が表示される
- [ ] アプリ紹介 (`/apps`) - 9件のアプリが表示される
- [ ] サービス (`/services`) - カテゴリ別にアプリが表示される
- [ ] FAQ (`/faq`) - FAQが表示される
- [ ] 協会概要 (`/about`) - 法人情報が表示される

### 3. ビルドの成功確認

```bash
npm run build
```

エラーなくビルドが完了することを確認してください。

---

## 🔧 環境変数の設定

### 本番環境（Vercel / その他ホスティング）

デプロイ先の環境変数設定画面で、以下を設定してください。

#### 必須の環境変数

```env
# microCMS設定
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
NEXT_PUBLIC_USE_MICROCMS=true

# On-Demand Revalidation用シークレットキー
REVALIDATE_SECRET=your-random-secret-key-change-this-to-secure-value
```

#### Vercelでの設定手順

1. Vercel Dashboardにログイン
2. プロジェクトを選択
3. 「Settings」→「Environment Variables」をクリック
4. 上記の環境変数を追加
5. 「Save」をクリック

**重要**: 環境変数を追加した後は、再デプロイが必要です。

---

## 📁 既存データファイルの取り扱い

### 現在のデータファイル

| ファイル | 用途 | 削除可否 | 推奨アクション |
|---------|------|---------|--------------|
| `src/lib/data/apps-data.ts` | アプリ紹介のフォールバック | ❌ | **残す**（フォールバックとして必要） |
| `src/lib/data/about-data.ts` | 協会概要のフォールバック | ❌ | **残す**（フォールバックとして必要） |
| `src/lib/data/services-data.ts` | サービスページのデータ | ❌ | **残す**（microCMS化されていない） |

### フォールバックデータを残す理由

**推奨**: フォールバックデータは削除せず、そのまま残してください。

#### メリット

1. **高可用性**: microCMSがダウンしてもサイトが表示される
2. **APIリミット対策**: 無料プランのAPIリミットに達してもフォールバックで動作
3. **開発環境**: `NEXT_PUBLIC_USE_MICROCMS=false` で開発可能

#### デメリット

- コードベースに古いデータが残る（ただし、使用されるのはフォールバック時のみ）

### フォールバックデータを削除する場合（非推奨）

もしフォールバックデータを削除したい場合は、以下のファイルを修正してください。

#### 1. `src/app/apps/page.tsx`

```typescript
// フォールバック削除版
export default async function AppsPage() {
  let apps = [];
  
  if (USE_MICROCMS) {
    try {
      const response = await getApps();
      apps = response.contents;
    } catch (error) {
      console.error('Failed to fetch apps from microCMS:', error);
      // フォールバックを削除した場合は、エラーページを表示
      throw new Error('Failed to load apps data');
    }
  }
  
  return (/* ... */);
}
```

#### 2. `src/app/about/page.tsx`

```typescript
// フォールバック削除版
export default async function AboutPage() {
  let aboutData;
  
  if (USE_MICROCMS) {
    try {
      const response = await getAbout();
      aboutData = {/* 変換処理 */};
    } catch (error) {
      console.error('Failed to fetch about from microCMS:', error);
      throw new Error('Failed to load about data');
    }
  }
  
  return (/* ... */);
}
```

#### 3. データファイルを削除

```bash
# フォールバックデータファイルを削除（非推奨）
rm src/lib/data/apps-data.ts
rm src/lib/data/about-data.ts
```

**注意**: この場合、microCMSの障害時にサイトが表示されなくなります。

---

## 🚀 デプロイ手順

### Vercelへのデプロイ

#### 初回デプロイ

```bash
# Vercel CLIをインストール（未インストールの場合）
npm install -g vercel

# ログイン
vercel login

# デプロイ
vercel deploy --prod
```

#### 環境変数の設定

1. Vercel Dashboard → プロジェクト → Settings → Environment Variables
2. 上記の必須環境変数を設定
3. 再デプロイ

#### Webhookの設定

デプロイ後、microCMSでWebhookを設定してください。

詳細: `docs/webhook-setup-guide.md`

---

### その他のホスティングサービス

#### Next.js対応のホスティング

- **Netlify**: Next.js対応プラグインを使用
- **Cloudflare Pages**: Next.js対応
- **AWS Amplify**: Next.js対応

#### 環境変数の設定

各サービスの環境変数設定画面で、上記の必須環境変数を設定してください。

---

## ✅ デプロイ後の確認

### 1. サイトの動作確認

デプロイ後、以下のページをすべて確認してください。

- [ ] トップページ (`/`)
- [ ] アプリ紹介 (`/apps`)
- [ ] サービス (`/services`)
- [ ] FAQ (`/faq`)
- [ ] 協会概要 (`/about`)
- [ ] お問い合わせ (`/contact`)
- [ ] プライバシーポリシー (`/privacy`)
- [ ] 利用規約 (`/terms`)

### 2. Webhookのテスト

1. microCMS管理画面で任意のコンテンツを更新
2. 「公開」をクリック
3. 数秒待ってから、サイトにアクセス
4. 更新が即座に反映されていればOK ✅

### 3. パフォーマンスチェック

#### Lighthouse（Chrome DevTools）

1. Chrome DevToolsを開く（F12）
2. Lighthouseタブ → 「分析」をクリック
3. すべてのメトリクスが緑（90以上）であることを確認

#### PageSpeed Insights

https://pagespeed.web.dev/

デプロイ後のURLを入力して、以下を確認：
- **Performance**: 90以上（緑）
- **Accessibility**: 90以上（緑）
- **Best Practices**: 90以上（緑）
- **SEO**: 90以上（緑）

---

## 🔍 トラブルシューティング

### microCMSのデータが表示されない

#### 確認1: 環境変数

```bash
# Vercel Dashboardで確認
NEXT_PUBLIC_USE_MICROCMS=true # ← trueになっているか
MICROCMS_SERVICE_DOMAIN=your-service-domain # ← 正しいドメインか
MICROCMS_API_KEY=your-api-key # ← 正しいAPIキーか
```

#### 確認2: microCMSでの公開状態

microCMS管理画面で、すべてのコンテンツが「公開」状態になっているか確認。

#### 確認3: APIレスポンス

ブラウザの開発者ツール（F12）→ Consoleタブで、エラーメッセージを確認。

---

### Webhookが動作しない

#### 確認1: REVALIDATE_SECRETの一致

- Vercelの環境変数 `REVALIDATE_SECRET`
- microCMSのWebhook設定の `secret` フィールド

これらが完全に一致しているか確認。

#### 確認2: Webhook URL

microCMSのWebhook設定で、URLが以下の形式になっているか確認：

```
https://your-domain.com/api/revalidate
```

#### 確認3: Webhook送信ログ

microCMS管理画面 → API設定 → Webhook → 送信履歴

レスポンスコードが `200 OK` になっているか確認。

---

### ビルドエラーが発生する

#### エラー: Type errors

```bash
# 型チェック
npm run build
```

型エラーが表示された場合、該当ファイルを修正してください。

#### エラー: microCMS API key is required

環境変数が設定されていない可能性があります。

ローカル環境: `.env.local` を確認  
本番環境: Vercelの環境変数を確認

---

## 📊 本番環境での運用

### 定期的なバックアップ

microCMSのデータは定期的にバックアップすることを推奨します。

1. microCMS管理画面 → API設定 → エクスポート
2. JSONファイルをダウンロード
3. 定期的に保存（月1回程度）

### コンテンツ更新フロー

1. microCMS管理画面でコンテンツを編集
2. 「下書き保存」でプレビュー（オプション）
3. 「公開」をクリック
4. Webhookが自動的に発火し、サイトが更新される
5. サイトにアクセスして確認

### パフォーマンスモニタリング

#### Vercel Analytics（推奨）

Vercelにデプロイした場合、自動的にパフォーマンスメトリクスが記録されます。

Vercel Dashboard → プロジェクト → Analytics

#### Google Analytics（オプション）

より詳細なアクセス解析が必要な場合は、Google Analyticsを導入できます。

---

## 📌 重要な注意事項

### APIリミット（microCMS無料プラン）

- **API呼び出し**: 月50,000リクエスト
- **Webhook**: 無制限（無料）

通常の運用では、APIリミットに達することはほとんどありませんが、万が一リミットに達した場合は、フォールバックデータが使用されます。

### キャッシュの有効期限

- **ISR**: 10分（600秒）
- **画像キャッシュ**: 30日

コンテンツを更新した場合、Webhookが正常に動作していれば数秒以内に反映されます。

### セキュリティ

- **REVALIDATE_SECRET**: 必ず強固なランダム文字列を使用
- **MICROCMS_API_KEY**: 環境変数に設定し、コードに直接書かない
- **環境変数**: GitHubなどにコミットしない（`.env.local`は`.gitignore`に含まれています）

---

## ✨ 完了！

おめでとうございます！🎉

microCMS統合が完了し、本番環境にデプロイされました。

これで、以下のメリットを享受できます：
- ✅ コンテンツを非エンジニアでも簡単に更新できる
- ✅ 更新が即座にサイトに反映される（Webhook）
- ✅ 高速なサイト表示（ISR + キャッシュ）
- ✅ 高可用性（フォールバック機能）

---

**作成日**: 2025年10月16日  
**最終更新**: 2025年10月16日

