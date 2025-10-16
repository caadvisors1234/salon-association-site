# microCMS統合 進捗管理

このドキュメントはmicroCMS統合プロジェクトの進捗を管理します。

## 全体進捗

```
Phase 0: ✅ 完了
Phase 1: ✅ 完了
Phase 2: ⏸️ 保留（料金プランは後回し）
Phase 3: ✅ 完了（動作確認済み）
Phase 4: ✅ AI作業完了（ユーザー作業待ち）
Phase 5: 📋 未着手
Phase 6: 📋 未着手
Phase 7: 📋 未着手
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

## Phase 4: アプリ紹介移行 ✅（AI作業完了）

**開始日**: 2025年10月1日  
**完了日**: 2025年10月2日  
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
- [x] features・slidesフィールドの自動変換処理
  - `src/lib/microcms/fetchers.ts`（getApps、getAppById、getAppsByCategory）
- [x] ビルド確認
  - TypeScript: ✅ エラーなし
  - ESLint: ✅ エラーなし
  - Next.js Build: ✅ 成功

**詳細なタスクリスト**: `docs/PHASE4_TASKS.md` を参照

### ユーザー作業項目 📋（次のステップ）
- [ ] microCMSでAPI作成（エンドポイント: `apps`、リスト形式）
- [ ] 9つのアプリデータを入力（推定2〜2.5時間）
  - 入力ガイド: `docs/microcms-data-input-guide-apps.md`
  - 参照データ: `docs/microcms-data/apps.json`
- [ ] 動作確認
  - `.env.local` で `NEXT_PUBLIC_USE_MICROCMS=true` に設定
  - `/apps` ページで表示確認

---

## Phase 5以降

### Phase 5: サービス・FAQ移行 📋
- 3つのサービスとFAQのCMS化

### Phase 5: サービス・FAQ移行 📋
- 3つのサービスとFAQのCMS化

### Phase 6: 協会概要・固定ページ移行 📋
- 協会概要とプライバシーポリシー、利用規約のCMS化

### Phase 7: 最適化（ISR/Webhook） 📋
- パフォーマンス最適化とプレビュー機能

### Phase 8: 本番移行 📋
- 既存データファイルの削除、完全CMS化

---

## 現在のアクション

### 👤 ユーザーが行うこと（Phase 4）

**Phase 4のAI作業は完了しました！** ✅

次はユーザー様がmicroCMSでAPIを作成し、データを入力する番です。

#### ステップ1: microCMSでAPI作成

1. microCMS管理画面にログイン
2. 「API作成」をクリック
3. 以下の設定でAPIを作成：
   - **API名**: `アプリ紹介`
   - **エンドポイント**: `apps`
   - **種類**: リスト形式
4. スキーマ定義は `docs/microcms-schemas/apps.md` を参照

#### ステップ2: データ入力

1. 9つのアプリデータを入力（推定2〜2.5時間）
2. 入力ガイド: `docs/microcms-data-input-guide-apps.md`
3. 参照データ: `docs/microcms-data/apps.json`

#### ステップ3: 動作確認

1. `.env.local` で `NEXT_PUBLIC_USE_MICROCMS=true` に設定
2. 開発サーバーを再起動: `npm run dev`
3. `/apps` ページで表示確認

4. **型定義の最終確認**（15分）
   - `src/lib/microcms/types.ts` の確認・調整

5. **features フィールドの自動変換**（30分）
   - 繰り返しフィールド → 文字列配列への変換処理

6. **ビルド確認**（10分）
   - TypeScript、ESLint、ビルドの確認

7. **ドキュメント更新**（15分）
   - 進捗管理ドキュメントの更新

#### 開始前に確認

- [ ] `docs/HANDOVER.md` を読む（必須）
- [ ] `docs/QUICK_START.md` を読む
- [ ] 環境が正常に動作するか確認（`npm run dev` と `npm run build`）
- [ ] `/test-microcms` で接続テスト

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

**最終更新**: 2025年10月1日  
**現在のフェーズ**: Phase 4 - アプリ紹介移行（準備中、次のAI担当者待ち）  
**全体進捗**: 40%完了
