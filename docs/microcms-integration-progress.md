# microCMS統合 進捗管理

このドキュメントはmicroCMS統合プロジェクトの進捗を管理します。

## 全体進捗

```
Phase 0: ✅ 完了
Phase 1: ✅ 完了
Phase 2: ⏸️ 保留（料金プランは後回し）
Phase 3: ✅ 完了（動作確認済み）
Phase 4: ✅ 完了（アプリ紹介のmicroCMS化完了）
Phase 5: ✅ 完了（FAQのmicroCMS化完了）
Phase 6: ✅ 完了（協会概要のmicroCMS化完了）
Phase 7: 📋 次のフェーズ
Phase 8: 📋 未着手
```

---

## Phase 0: microCMS環境構築 ✅

**実施日**: 2025年10月1日  
**担当**: ユーザー

### 完了項目
- [x] microCMSアカウント作成
- [x] サービス作成（サービスドメイン: `r9ru6kip5e`）
- [x] APIキー取得

---

## Phase 1: SDK統合・基盤構築 ✅

**実施日**: 2025年10月1日  
**担当**: AI（コード実装）

### 完了項目
- [x] microCMS SDKのインストール
- [x] 環境変数ファイルの作成
- [x] microCMSクライアントの作成
- [x] 型定義ファイルの作成（全APIエンドポイント対応）
- [x] データ取得関数の作成（全APIエンドポイント対応）
- [x] テストページの作成（接続確認済み）

---

## Phase 2: 料金プラン移行 ⏸️

**状態**: 保留（ユーザーの判断により次のコンテンツを優先）

### AI完了項目 ✅
- [x] APIスキーマ定義書の作成（繰り返しフィールド対応）
- [x] 既存データのJSON化
- [x] 料金プランページの改修
- [x] データ入力ガイドの作成

### ユーザー作業項目（保留中）
- [ ] microCMSでAPI作成
- [ ] データ入力
- [ ] 動作確認

**備考**: 料金プランは現在コメントアウトされており、後で実装予定。

---

## Phase 3: サイト基本情報移行 ✅

**実施日**: 2025年10月1日  
**担当**: AI（コード実装）+ ユーザー（microCMS設定・データ入力）  
**完了日**: 2025年10月1日

### AI完了項目 ✅
- [x] APIスキーマ定義書の作成
  - `docs/microcms-schemas/site-config.md`
- [x] 既存データのJSON化
  - `docs/microcms-data/site-config.json`
- [x] 型定義の更新
  - `src/lib/microcms/types.ts`（SiteConfig型）
- [x] layout.tsxの改修
  - `src/app/layout.tsx`
  - メタデータをmicroCMSから動的生成
  - Google Analytics IDをmicroCMSから取得
- [x] Footer.tsxの改修
  - `src/components/layout/Footer.tsx`
  - サイト名、キャッチコピー、住所をmicroCMSから取得
- [x] データ入力ガイドの作成
  - `docs/microcms-data-input-guide-site-config.md`

### ユーザー作業項目 ✅
- [x] microCMSでAPI作成
  - 手順書: `docs/microcms-schemas/site-config.md`
  - API名: `サイト設定`
  - エンドポイント: `site-config`
  - 形式: **オブジェクト形式**
- [x] データ入力（1つのコンテンツ）
  - 入力ガイド: `docs/microcms-data-input-guide-site-config.md`
  - 参照データ: `docs/microcms-data/site-config.json`
- [x] 動作確認
  - `.env.local` で `NEXT_PUBLIC_USE_MICROCMS=true` に設定
  - フッター、メタデータで反映確認
  - **結果**: ✅ フッターが正しく表示されることを確認

---

## Phase 4: アプリ紹介移行 ✅（完了）

**開始日**: 2025年10月1日  
**完了日**: 2025年10月16日  
**担当**: AI（コード実装）+ ユーザー（microCMS設定・データ入力）

### AI完了項目 ✅
- [x] APIスキーマ定義書の作成
  - `docs/microcms-schemas/apps.md`
- [x] 既存データのJSON化
  - `docs/microcms-data/apps.json`
- [x] データ入力ガイドの作成
  - `docs/microcms-data-input-guide-apps.md`
- [x] 型定義の更新と調整
  - `src/lib/microcms/types.ts`（AppFeature、AppResponse、App型）
- [x] アプリ一覧ページの改修
  - `src/app/apps/page.tsx`（microCMS対応、ISR設定）
- [x] サービス内容ページの改修
  - `src/app/services/page.tsx`（microCMS対応、カテゴリ連携）
- [x] features・slidesフィールドの自動変換処理
  - `src/lib/microcms/fetchers.ts`（配列から文字列への変換）
- [x] categoryフィールドの自動変換処理
  - セレクトフィールドが配列で返される問題を修正
- [x] next.config.tsの更新
  - microCMS画像ホストの追加
- [x] ビルド確認
  - TypeScript: ✅ エラーなし
  - ESLint: ✅ エラーなし
  - Next.js Build: ✅ 成功

**詳細なタスクリスト**: `docs/PHASE4_TASKS.md` を参照

### ユーザー作業項目 ✅（完了）
- [x] microCMSでAPI作成（エンドポイント: `apps`、リスト形式）
- [x] 9つのアプリデータを入力
  - 入力ガイド: `docs/microcms-data-input-guide-apps.md`
  - 参照データ: `docs/microcms-data/apps.json`
- [x] 動作確認
  - `.env.local` で `NEXT_PUBLIC_USE_MICROCMS=true` に設定
  - `/apps` ページで表示確認
  - `/services` ページでカテゴリ別表示確認

---

## Phase 5: FAQ移行 ✅（完了）

**開始日**: 2025年10月16日  
**完了日**: 2025年10月16日  
**担当**: AI（コード実装）+ ユーザー（microCMS設定・データ入力）

### AI完了項目 ✅
- [x] APIスキーマ定義書の作成
  - `docs/microcms-schemas/faq.md`
- [x] 既存データのJSON化
  - `docs/microcms-data/faq.json`
- [x] データ入力ガイドの作成
  - `docs/microcms-data-input-guide-faq.md`
- [x] 型定義の確認
  - `src/lib/microcms/types.ts`（FAQ型）
- [x] データ取得関数の確認
  - `src/lib/microcms/fetchers.ts`（getFAQs）
- [x] FAQページの改修
  - `src/app/faq/page.tsx`（microCMS対応、ISR設定）
- [x] ビルド確認
  - TypeScript: ✅ エラーなし
  - ESLint: ✅ エラーなし
  - Next.js Build: ✅ 成功

### ユーザー作業項目 📋（次のステップ）
- [ ] microCMSでAPI作成（エンドポイント: `faq`、リスト形式）
- [ ] 4つのFAQデータを入力（推定15〜20分）
  - 入力ガイド: `docs/microcms-data-input-guide-faq.md`
  - 参照データ: `docs/microcms-data/faq.json`
- [ ] 動作確認
  - `.env.local` で `NEXT_PUBLIC_USE_MICROCMS=true` に設定
  - `/faq` ページで表示確認

**備考**: サービスはCMS化せず、FAQのみをCMS化

---

## Phase 6: 協会概要移行 ✅（完了）

**開始日**: 2025年10月16日  
**完了日**: 2025年10月16日  
**担当**: AI（コード実装）+ ユーザー（microCMS設定・データ入力）

### AI完了項目 ✅
- [x] 協会概要APIスキーマ定義書の作成
  - `docs/microcms-schemas/about.md`
- [x] 既存データのJSON化
  - `docs/microcms-data/about.json`
- [x] データ入力ガイドの作成
  - `docs/microcms-data-input-guide-about.md`
- [x] 型定義の確認と更新
  - `src/lib/microcms/types.ts`（About型）
  - `businessContent`をテキストエリア（改行区切り）からコード側で配列に変換
- [x] データ取得関数の確認
  - `src/lib/microcms/fetchers.ts`（getAbout）
- [x] 協会概要ページの改修
  - `src/app/about/page.tsx`（microCMS対応、ISR設定、配列変換処理）
- [x] ビルド確認
  - TypeScript: ✅ エラーなし
  - ESLint: ✅ エラーなし
  - Next.js Build: ✅ 成功

### ユーザー作業項目 📋（次のステップ）
- [ ] microCMSで協会概要API作成（エンドポイント: `about`、オブジェクト形式）
- [ ] 協会概要データを入力（推定10〜15分）
  - 入力ガイド: `docs/microcms-data-input-guide-about.md`
  - 参照データ: `docs/microcms-data/about.json`
- [ ] 動作確認
  - `.env.local` で `NEXT_PUBLIC_USE_MICROCMS=true` に設定
  - `/about` ページで表示確認

**備考**: 固定ページ（プライバシーポリシー、利用規約）はCMS化を見送り（フリープラン制限のため）

---

## Phase 7以降

### Phase 7: 最適化（ISR/Webhook） 📋
- パフォーマンス最適化とプレビュー機能

### Phase 8: 本番移行 📋
- 既存データファイルの削除、完全CMS化

---

## 現在のアクション

### 👤 ユーザーが行うこと（Phase 6）

**Phase 6のAI作業は完了しました！** ✅

次はユーザー様がmicroCMSでAPIを作成し、データを入力する番です。

#### ステップ1: 協会概要API作成

1. microCMS管理画面にログイン
2. 「API作成」をクリック
3. 以下の設定でAPIを作成：
   - **API名**: `協会概要`
   - **エンドポイント**: `about`
   - **種類**: **オブジェクト形式** ⚠️
4. スキーマ定義は `docs/microcms-schemas/about.md` を参照

#### ステップ2: 協会概要データ入力

1. 1件のデータを入力（推定10〜15分）
2. 入力ガイド: `docs/microcms-data-input-guide-about.md`
3. 参照データ: `docs/microcms-data/about.json`

**重要**: `主たる事業内容`フィールドは**テキストエリア**で、改行区切りで入力してください。

#### ステップ3: 動作確認

1. `.env.local` で `NEXT_PUBLIC_USE_MICROCMS=true` に設定
2. 開発サーバーを再起動: `npm run dev`
3. ブラウザで確認：
   - http://localhost:3000/about - 協会概要

---

## トラブルシューティング

### API形式を間違えた
- オブジェクト形式にするべきところをリスト形式にした場合、APIを削除して再作成

### データが表示されない
1. 環境変数が `true` になっているか確認
2. 開発サーバーを再起動したか確認
3. microCMSで「保存」→「公開」したか確認

### OGP画像が表示されない
- 画像をアップロードしない場合は、デフォルトの `/images/og-image.png` が使用されます（問題なし）

---

**最終更新**: 2025年10月16日  
**現在のフェーズ**: Phase 6 - 協会概要移行（AI作業完了、ユーザー作業待ち）  
**全体進捗**: 60%完了
