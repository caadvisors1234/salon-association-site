# microCMS統合プロジェクト ハンドオーバードキュメント

**最終更新**: 2025年10月1日  
**プロジェクト**: 一般社団法人AIビューティーサロン推進協会 公式サイト  
**作業内容**: ヘッドレスCMS（microCMS）導入による非エンジニア向けコンテンツ管理機能の実装

---

## 📋 目次

1. [プロジェクト概要](#プロジェクト概要)
2. [現在の状態](#現在の状態)
3. [完了済みフェーズ](#完了済みフェーズ)
4. [次のステップ](#次のステップ)
5. [技術スタック](#技術スタック)
6. [重要な実装詳細](#重要な実装詳細)
7. [トラブルシューティング](#トラブルシューティング)
8. [参考リソース](#参考リソース)

---

## プロジェクト概要

### 目的
非エンジニアの管理者でも簡単にサイトの内容を編集できるよう、ヘッドレスCMS（microCMS）を導入し、包括的にサイトの内容を編集可能にする。

### スコープ
- ❌ お知らせ機能は実装予定なし（requirements.mdに記載されているが除外）
- ✅ 料金プラン、アプリ紹介、サービス内容、FAQ、サイト基本情報などをCMS化

### 制約事項
- 既存のNext.js 15.3.3 App Routerを維持
- TypeScript型安全性を保持
- 既存のデザイン・UI/UXを変更しない
- Lighthouse 90点以上のパフォーマンスを維持

---

## 現在の状態

### 全体進捗: **40%完了**

```
Phase 0: ✅ 完了（microCMS環境構築）
Phase 1: ✅ 完了（SDK統合・基盤構築）
Phase 2: ⏸️ 保留（料金プラン移行 - ユーザー判断により後回し）
Phase 3: ✅ 完了（サイト基本情報移行）
Phase 4: 🔄 準備中（アプリ紹介移行 - APIスキーマ定義書作成済み）
Phase 5: 📋 未着手（サービス・FAQ移行）
Phase 6: 📋 未着手（協会概要・固定ページ移行）
Phase 7: 📋 未着手（最適化：ISR/Webhook）
Phase 8: 📋 未着手（本番移行）
```

### microCMS環境情報

| 項目 | 値 |
|------|-----|
| サービスドメイン | `r9ru6kip5e` |
| APIキー | 環境変数 `MICROCMS_API_KEY` に設定済み |
| 接続状態 | ✅ 確認済み（`/test-microcms` で検証可能） |

### 環境変数設定

```bash
# .env.local
MICROCMS_SERVICE_DOMAIN=r9ru6kip5e
MICROCMS_API_KEY=MHL6rswy4oQZRfpNvk7fuXvnzASo6qwj94LL
NEXT_PUBLIC_USE_MICROCMS=true  # CMS使用フラグ
```

---

## 完了済みフェーズ

### ✅ Phase 0: microCMS環境構築
**実施日**: 2025年10月1日  
**担当**: ユーザー

- microCMSアカウント作成完了
- サービス作成完了
- APIキー取得完了

---

### ✅ Phase 1: SDK統合・基盤構築
**実施日**: 2025年10月1日  
**担当**: AI

#### 作成したファイル

```
src/lib/microcms/
├── client.ts          # microCMS APIクライアント
├── types.ts           # 全APIエンドポイントの型定義
└── fetchers.ts        # データ取得関数（エラーハンドリング付き）

src/app/test-microcms/
└── page.tsx           # 接続テストページ（後で削除予定）

.env.local             # 環境変数（Gitにコミットされない）
.env.example           # 環境変数テンプレート
```

#### 重要な実装

1. **型定義**: 全APIエンドポイント（8種類）の型を定義済み
2. **データ取得関数**: 統一されたエラーハンドリング
3. **環境変数による切り替え**: `NEXT_PUBLIC_USE_MICROCMS` でCMS使用を制御

#### 検証済み
- ✅ TypeScriptコンパイル: エラーなし
- ✅ ESLint: エラーなし
- ✅ ビルド: 成功
- ✅ 接続テスト: 成功

---

### ⏸️ Phase 2: 料金プラン移行（保留中）
**状態**: ユーザーの判断により後回し  
**理由**: 現在、料金プランページは完全にコメントアウトされており表示していない

#### 準備済みファイル

```
docs/microcms-schemas/pricing-plans.md     # APIスキーマ定義書
docs/microcms-data/pricing-plans.json      # 既存データJSON
docs/microcms-data-input-guide.md          # データ入力ガイド
```

#### 技術的な実装完了事項
- ✅ 繰り返しフィールド対応の型定義
- ✅ ページコンポーネントの改修
- ✅ 自動変換処理（繰り返しフィールド → 文字列配列）

#### ユーザーが実施すべき作業（保留中）
1. microCMSでAPI作成（`pricing-plans`）
2. 4つのプランデータ入力
3. 動作確認

---

### ✅ Phase 3: サイト基本情報移行
**実施日**: 2025年10月1日  
**状態**: ✅ 完了・動作確認済み

#### 作成・更新したファイル

```
# ドキュメント
docs/microcms-schemas/site-config.md                    # APIスキーマ定義書
docs/microcms-data/site-config.json                     # 既存データJSON
docs/microcms-data-input-guide-site-config.md          # データ入力ガイド

# ソースコード
src/lib/microcms/types.ts                              # SiteConfig型を更新
src/app/layout.tsx                                     # メタデータ動的生成
src/components/layout/Footer.tsx                       # フッター情報動的取得
```

#### 実装された機能

1. **メタデータの動的生成**
   - サイト名、説明、OGP画像がmicroCMSから取得される
   - SEO最適化（title, description, OGP）

2. **フッター情報の動的取得**
   - サイト名、キャッチコピー、住所がmicroCMSから取得される

3. **Google Analytics ID**
   - microCMSから動的に取得可能

#### microCMSで管理可能な項目

- サイト名
- サイト説明
- サイトURL
- OGP画像
- キャッチコピー
- 連絡先メールアドレス
- 電話番号
- 郵便番号
- 住所
- Google Analytics ID

#### 動作確認済み
- ✅ フッターに正しく表示される
- ✅ メタデータが正しく生成される
- ✅ エラーハンドリング動作確認済み

---

## 次のステップ

### 🔄 Phase 4: アプリ紹介移行（現在ここ）

#### 概要
- **対象**: 9種類のアプリ紹介データ
- **作業時間目安**: 約2時間
- **優先度**: 高（サイトの主要コンテンツ）

#### 準備済み
✅ APIスキーマ定義書作成済み: `docs/microcms-schemas/apps.md`

#### 次に実施すべき作業

##### 1. AI担当（残りの準備）
- [ ] 既存データのJSON化（`docs/microcms-data/apps.json`）
- [ ] データ入力ガイド作成
- [ ] アプリ一覧ページの改修（`src/app/apps/page.tsx`）
- [ ] 型定義の確認・調整

##### 2. ユーザー担当
- [ ] microCMSでAPI作成（エンドポイント: `apps`）
- [ ] 9つのアプリデータ入力（各アプリ10分 × 9 = 90分）
- [ ] 動作確認

#### 重要な注意点

**繰り返しフィールドの使用**
- `features`（特徴リスト）: テキストのみ
- `slides`（スライド画像）: 画像 + altテキスト

**データ構造**
```typescript
interface App {
  name: string;
  description: string;
  catchphrase: string;
  detailedDescription?: string;
  features?: { fieldId: string; text: string }[];  // 繰り返しフィールド
  slides: {                                        // 繰り返しフィールド
    fieldId: string;
    image: MicroCMSImage;
    altText: string;
  }[];
  category: '集客支援' | 'リピート・LTV向上' | '採用・組織力強化';
  order: number;
  isPublished: boolean;
}
```

---

### Phase 5: サービス・FAQ移行（未着手）

#### 対象
- サービス内容（3種類）
- FAQ項目

#### 推定作業時間
- 準備: 2時間
- ユーザー作業: 1時間

---

### Phase 6: 協会概要・固定ページ移行（未着手）

#### 対象
- 協会概要（オブジェクト形式）
- プライバシーポリシー
- 利用規約

#### 推定作業時間
- 準備: 2時間
- ユーザー作業: 30分

---

### Phase 7: 最適化（ISR/Webhook）（未着手）

#### 実装内容
1. **Webhook設定**
   - microCMSコンテンツ更新時に自動再生成
   - エンドポイント: `/api/revalidate`

2. **プレビュー機能**
   - 公開前のコンテンツ確認
   - エンドポイント: `/api/preview`

3. **ISR最適化**
   - キャッシュ戦略の調整

#### 推定作業時間
- 準備: 3時間
- ユーザー作業: 30分

---

### Phase 8: 本番移行（未着手）

#### 実施内容
1. 既存の静的データファイルを削除
2. 環境変数の分岐コードを削除
3. テストの更新
4. 運用マニュアルの整備

#### 推定作業時間
- 準備: 2時間
- ユーザー作業: 1時間

---

## 技術スタック

### フレームワーク・ライブラリ

| 項目 | バージョン | 備考 |
|------|-----------|------|
| Next.js | 15.3.3 | App Router |
| React | 19.0.0 | |
| TypeScript | ^5 | 厳格な型定義 |
| Tailwind CSS | ^4 | |
| microCMS SDK | 最新 | 公式SDK |

### microCMS SDK

```bash
npm install microcms-js-sdk
```

**使用方法**:
```typescript
import { createClient } from 'microcms-js-sdk';

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});
```

---

## 重要な実装詳細

### 1. 環境変数による切り替え

**目的**: 既存データとCMSデータを安全に切り替え

```typescript
const USE_MICROCMS = process.env.NEXT_PUBLIC_USE_MICROCMS === 'true';

if (USE_MICROCMS) {
  // microCMSからデータ取得
  const data = await getSomeData();
} else {
  // 既存の静的データを使用
  const data = staticData;
}
```

### 2. 繰り返しフィールドの扱い

**microCMSの繰り返しフィールド**は配列として返されるが、既存コードは文字列配列を期待している。

**解決策**: データ取得時に自動変換

```typescript
// microCMSレスポンス型
interface PricingPlanResponse {
  features: { fieldId: string; text: string }[];
}

// アプリケーション用型
interface PricingPlan {
  features: string[];
}

// 変換処理
const plans = response.contents.map(plan => ({
  ...plan,
  features: plan.features.map(f => f.text),
}));
```

### 3. エラーハンドリング

**フォールバック戦略**: microCMS接続失敗時は既存データを使用

```typescript
if (USE_MICROCMS) {
  try {
    const data = await getDataFromMicroCMS();
  } catch (error) {
    console.error('Failed to fetch from microCMS:', error);
    // フォールバック: 既存データを使用
    const data = staticData;
  }
}
```

### 4. ISR設定

```typescript
// 10分ごとに再生成
export const revalidate = 600;
```

### 5. 型定義の場所

```
src/lib/microcms/types.ts
```

**全API型定義済み**:
- SiteConfig
- Navigation
- PricingPlan / PricingPlanResponse
- App / AppSlide
- Service
- FAQ
- About
- Page

---

## トラブルシューティング

### 問題1: microCMSからデータが取得できない

**原因**:
- 環境変数が設定されていない
- APIキーが間違っている
- APIエンドポイント名が違う

**解決策**:
1. `.env.local` の内容を確認
2. 開発サーバーを再起動
3. `/test-microcms` で接続テスト
4. microCMS管理画面でAPIエンドポイント名を確認

### 問題2: 繰り返しフィールドのデータが正しく表示されない

**原因**:
- フィールドIDが間違っている
- カスタムフィールド内のフィールドIDが `text` になっていない

**解決策**:
1. microCMS管理画面でフィールドIDを確認
2. APIスキーマ定義書と照合
3. 型定義を確認

### 問題3: ビルドエラーが発生する

**原因**:
- TypeScript型エラー
- revalidate設定で条件式を使用している

**解決策**:
```typescript
// ❌ NG: 条件式は使用不可
export const revalidate = USE_MICROCMS ? 600 : false;

// ✅ OK: 直接値を指定
export const revalidate = 600;
```

### 問題4: 画像が表示されない

**原因**:
- microCMSの画像URLが正しくない
- Next.js Imageコンポーネントの設定

**解決策**:
```typescript
// microCMSの画像URLをそのまま使用
<Image
  src={data.image.url}  // microCMS画像URL
  alt={data.altText}
  width={1200}
  height={600}
/>
```

### 問題5: 環境変数が反映されない

**解決策**:
1. 開発サーバーを完全に停止（Ctrl+C）
2. `npm run dev` で再起動
3. それでもダメなら `.next` フォルダを削除して再ビルド

---

## 参考リソース

### プロジェクト内ドキュメント

| ファイル | 内容 |
|---------|------|
| `docs/microcms-integration-progress.md` | 進捗管理 |
| `docs/microcms-schemas/*.md` | APIスキーマ定義書 |
| `docs/microcms-data/*.json` | 既存データJSON |
| `docs/microcms-data-input-guide*.md` | データ入力ガイド |
| `docs/requirements.md` | プロジェクト要件定義 |

### 外部リソース

- [microCMS公式ドキュメント](https://document.microcms.io/)
- [Next.js 15ドキュメント](https://nextjs.org/docs)
- [microCMS + Next.js統合例](https://blog.microcms.io/microcms-next-jamstack-blog/)

### 検証済みリソース

- ✅ Context7: microCMS Document MCP Server
- ✅ ウェブリサーチ: 最新の統合パターン確認済み

---

## 作業開始時のチェックリスト

### 環境確認

- [ ] Node.js v20以降がインストールされている
- [ ] 依存関係がインストール済み（`npm install`）
- [ ] `.env.local` が設定されている
- [ ] 開発サーバーが起動する（`npm run dev`）
- [ ] ビルドが成功する（`npm run build`）

### microCMS接続確認

- [ ] `/test-microcms` にアクセスして「✅ 接続成功」が表示される
- [ ] サービスドメインとAPIキーが正しい

### コードの状態確認

- [ ] TypeScriptコンパイルエラーなし
- [ ] ESLintエラーなし
- [ ] すべてのテストが通る

---

## 重要な注意事項

### ⚠️ 変更禁止事項

1. **Next.jsバージョン**: 15.3.3を維持（勝手にアップグレードしない）
2. **Tailwind CSSバージョン**: 4を維持
3. **UI/UXデザイン**: 明示的な指示なく変更しない
4. **既存のコンポーネント**: 破壊的変更を避ける

### ✅ 推奨事項

1. **小さなステップ**: 各フェーズを確実に完了させる
2. **動作確認**: 各変更後にビルドとテストを実行
3. **ドキュメント更新**: 変更内容を記録
4. **エラーハンドリング**: 常にフォールバック処理を実装

---

## 次のAIへのメッセージ

### 現在の状態

Phase 4（アプリ紹介移行）の準備を開始しています。APIスキーマ定義書は作成済みですが、以下が未完了です：

1. 既存データのJSON化
2. データ入力ガイドの作成
3. アプリ一覧ページの改修
4. 型定義の最終確認

### 推奨アプローチ

1. **まず `docs/microcms-schemas/apps.md` を確認**してAPIスキーマを理解する
2. **`src/lib/data/apps-data.ts` を読み込み**、9つのアプリデータを把握する
3. **JSONファイルとガイドを作成**してユーザーのデータ入力をサポート
4. **`src/app/apps/page.tsx` を改修**してmicroCMS対応にする

### トラブルが発生したら

1. このドキュメント（`HANDOVER.md`）を参照
2. `docs/microcms-integration-progress.md` で進捗を確認
3. ビルドエラーが出たら `npm run build` でエラー内容を確認
4. 接続テストは `/test-microcms` で実行

---

**作成日**: 2025年10月1日  
**作成者**: AIアシスタント（Claude Sonnet 4.5）  
**対象プロジェクト**: salon-association-site

