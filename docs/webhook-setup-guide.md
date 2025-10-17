# microCMS Webhook設定ガイド

このドキュメントは、microCMSのWebhook機能を使用して、コンテンツ更新時に自動的にNext.jsのキャッシュを再検証する方法を説明します。

---

## 📋 概要

Webhook機能を設定することで、microCMSでコンテンツを更新したときに、即座にサイトに反映できます。

**メリット**:
- コンテンツ更新が即座に反映される
- ISRの待ち時間（最大10分）を待つ必要がない
- 管理者がリアルタイムでプレビューできる

---

## ⚠️ 事前準備

### 1. 環境変数の設定

`.env.local`ファイルに以下を追加：

```env
# On-Demand Revalidation用シークレットキー
REVALIDATE_SECRET=your-random-secret-key-change-this-to-secure-value
```

> 💡 **重要**: シークレットキーは、推測されにくいランダムな文字列を使用してください。
> 
> 生成例:
> ```bash
> # ターミナルで実行
> openssl rand -base64 32
> ```

### 2. デプロイ

Webhook機能を使用するには、サイトがデプロイされている必要があります（ローカル環境では動作しません）。

- Vercel: `vercel deploy`
- その他のホスティング: 各サービスの手順に従う

---

## 🔧 microCMSでのWebhook設定

### ステップ1: Webhook URLの確認

デプロイしたサイトのWebhook URLは以下の形式です：

```
https://your-domain.com/api/revalidate
```

例:
```
https://salon-association.vercel.app/api/revalidate
```

---

### ステップ2: 各APIにWebhookを設定

microCMS管理画面で、以下のAPIにWebhookを設定します。

#### 2-1. サイト基本情報（site-config）

1. microCMS管理画面で「サイト設定」APIを開く
2. 右上の「API設定」をクリック
3. 「Webhook」タブをクリック
4. 「追加」ボタンをクリック
5. 以下を入力：
   - **Webhook名**: `サイト再検証`
   - **URL**: `https://your-domain.com/api/revalidate`
   - **カスタムヘッダー**: （設定不要）
   - **HTTP Method**: `POST`
   - **Body**:
     ```json
     {
       "secret": "your-random-secret-key-change-this-to-secure-value",
       "endpoint": "site-config"
     }
     ```
   - **イベント**: 
     - ✅ コンテンツの公開
     - ✅ コンテンツの更新
6. 「保存」をクリック

---

#### 2-2. アプリ紹介（apps）

1. microCMS管理画面で「アプリ紹介」APIを開く
2. 右上の「API設定」をクリック
3. 「Webhook」タブをクリック
4. 「追加」ボタンをクリック
5. 以下を入力：
   - **Webhook名**: `アプリ再検証`
   - **URL**: `https://your-domain.com/api/revalidate`
   - **HTTP Method**: `POST`
   - **Body**:
     ```json
     {
       "secret": "your-random-secret-key-change-this-to-secure-value",
       "endpoint": "apps"
     }
     ```
   - **イベント**: 
     - ✅ コンテンツの公開
     - ✅ コンテンツの更新
     - ✅ コンテンツの削除
6. 「保存」をクリック

---

#### 2-3. FAQ（faq）

1. microCMS管理画面で「よくある質問」APIを開く
2. 右上の「API設定」をクリック
3. 「Webhook」タブをクリック
4. 「追加」ボタンをクリック
5. 以下を入力：
   - **Webhook名**: `FAQ再検証`
   - **URL**: `https://your-domain.com/api/revalidate`
   - **HTTP Method**: `POST`
   - **Body**:
     ```json
     {
       "secret": "your-random-secret-key-change-this-to-secure-value",
       "endpoint": "faq"
     }
     ```
   - **イベント**: 
     - ✅ コンテンツの公開
     - ✅ コンテンツの更新
     - ✅ コンテンツの削除
6. 「保存」をクリック

---

#### 2-4. 協会概要（about）

1. microCMS管理画面で「協会概要」APIを開く
2. 右上の「API設定」をクリック
3. 「Webhook」タブをクリック
4. 「追加」ボタンをクリック
5. 以下を入力：
   - **Webhook名**: `協会概要再検証`
   - **URL**: `https://your-domain.com/api/revalidate`
   - **HTTP Method**: `POST`
   - **Body**:
     ```json
     {
       "secret": "your-random-secret-key-change-this-to-secure-value",
       "endpoint": "about"
     }
     ```
   - **イベント**: 
     - ✅ コンテンツの公開
     - ✅ コンテンツの更新
6. 「保存」をクリック

---

## ✅ 動作確認

### 1. Webhookのテスト送信

microCMS管理画面で：

1. 各APIの「Webhook」タブを開く
2. 設定したWebhookの「テスト送信」ボタンをクリック
3. レスポンスが `200 OK` で、以下のようなJSONが返ってくればOK：

```json
{
  "revalidated": true,
  "endpoint": "apps",
  "paths": ["/apps", "/services"],
  "now": 1697500000000
}
```

### 2. 実際のコンテンツ更新テスト

1. microCMSで任意のコンテンツを更新
2. 「公開」ボタンをクリック
3. 数秒待ってから、サイトにアクセス
4. 更新が即座に反映されていればOK ✅

---

## 🔧 トラブルシューティング

### Webhook送信が失敗する（401 Unauthorized）

**原因**: シークレットキーが間違っている

**解決策**:
1. `.env.local` の `REVALIDATE_SECRET` を確認
2. microCMSのWebhook設定の `secret` フィールドと一致しているか確認
3. 環境変数を変更した場合は、再デプロイが必要

---

### Webhook送信が失敗する（404 Not Found）

**原因**: Webhook URLが間違っている

**解決策**:
1. URLが `https://your-domain.com/api/revalidate` の形式か確認
2. デプロイされたドメインを使用しているか確認（ローカル環境では動作しません）

---

### Webhook送信は成功するが、更新が反映されない

**原因**: ISRのキャッシュが残っている

**解決策**:
1. ブラウザのキャッシュをクリア（Cmd+Shift+R / Ctrl+Shift+F5）
2. シークレットモードで確認
3. 数分待ってから再確認

---

### Webhookのレスポンスが `500 Internal Server Error`

**原因**: サーバー側のエラー

**解決策**:
1. Vercelのログを確認（Vercel Dashboard → Functions → Logs）
2. `endpoint` パラメータが正しいか確認（`site-config`, `apps`, `faq`, `about` のいずれか）
3. エラーログを確認して修正

---

## 📌 重要な注意事項

### セキュリティ

- `REVALIDATE_SECRET` は必ず環境変数に設定し、コードに直接書かないでください
- シークレットキーは推測されにくい複雑な文字列を使用してください
- Webhook URLは公開されますが、シークレットキーがないと実行できません

### パフォーマンス

- Webhook送信は数秒以内に完了します
- 複数のページを一度に再検証する場合、少し時間がかかることがあります
- ISRの revalidate 時間（10分）も並行して動作します

### 料金

- microCMSのWebhook機能は無料プランでも使用できます
- Vercelの関数実行回数にカウントされます（無料枠: 月100,000回）

---

**作成日**: 2025年10月16日  
**最終更新**: 2025年10月16日

