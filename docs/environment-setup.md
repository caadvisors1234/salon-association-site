# 環境変数設定ガイド

## 概要
このプロジェクトでは以下の環境変数を使用します。開発環境では `.env.local` ファイルに設定してください。

## 必須環境変数

### 特別プラン認証設定
`/special-plan` ページのアクセス制御に使用されるパスワードです。

```env
# 本番環境では必ず強固なパスワードに変更してください。
SPECIAL_PLAN_PASSWORD=your_password_here
```

### メール送信設定
お問い合わせフォームからのメール送信に使用されます。

```env
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com
CONTACT_FORM_TO_EMAIL=contact@yourdomain.com
```

## オプション環境変数

### サイト設定
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Google Analytics（将来の実装用）
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 設定手順

1. プロジェクトルートに `.env.local` ファイルを作成
2. 上記の環境変数を実際の値に置き換えて設定
3. 本番環境では Vercel の Environment Variables で設定

## セキュリティ注意事項

- `.env.local` ファイルはGitにコミットしないでください
- 本番環境では強固なパスワードを設定してください
- APIキーは定期的にローテーションしてください 