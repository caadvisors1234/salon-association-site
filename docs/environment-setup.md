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

### メール送信設定（SMTP）
お問い合わせフォームからのメール送信に使用されます。Xサーバーなど契約済みのSMTPサーバーの認証情報を設定します。

```env
# SMTPサーバー設定
SMTP_HOST=sv3.sixcore.ne.jp              # SMTPサーバーのホスト名
SMTP_PORT=587                            # SMTPポート（587:STARTTLS, 465:SSL）
SMTP_USER=your-email@yourdomain.com      # SMTP認証用メールアドレス
SMTP_PASS=your_smtp_password             # SMTP認証用パスワード

# 送信先設定
CONTACT_FORM_TO_EMAIL=contact@yourdomain.com      # 主な送信先
CONTACT_FORM_BCC_EMAIL=admin2@yourdomain.com      # BCC送信先（オプション）
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
- SMTPパスワードは定期的に変更してください
- SMTPサーバーの設定は契約プロバイダーの情報を確認してください 