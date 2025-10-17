# Phase 4: アプリ紹介移行 - タスクリスト

**担当**: 次のAIアシスタント  
**推定作業時間**: 3-4時間  
**優先度**: 高

---

## 📋 Phase 4の目標

9種類のアプリ紹介データをmicroCMS化し、非エンジニアが管理画面から編集できるようにする。

---

## ✅ 完了済み

- [x] APIスキーマ定義書の作成（`docs/microcms-schemas/apps.md`）
- [x] 型定義の準備（`src/lib/microcms/types.ts` に App 型定義済み）
- [x] データ取得関数の準備（`src/lib/microcms/fetchers.ts` に getApps() 実装済み）

---

## 🔄 次に実施すべきタスク

### タスク 1: 既存データのJSON化 ⏱️ 30分

**目的**: 既存の9つのアプリデータをJSON形式で出力し、ユーザーがmicroCMSに入力しやすくする

**ファイル**: `docs/microcms-data/apps.json`

**手順**:
1. `src/lib/data/apps-data.ts` を読み込む
2. 9つのアプリデータ（APPS_DATA配列）を確認
3. 各アプリの構造を把握：
   - id
   - name
   - description
   - catchphrase
   - detailedDescription
   - features（配列）
   - slides（配列、各要素は imageUrl と altText）
4. JSON形式で出力（見やすくフォーマット）
5. 各アプリに `category` と `order` を追加：
   - google-post-app: category="集客支援", order=1
   - style-repost-app: category="集客支援", order=2
   - style-image-ai-app: category="集客支援", order=3
   - hpb-review-ai: category="リピート・LTV向上", order=4
   - repeat-analysis-app: category="リピート・LTV向上", order=5
   - review-support-ai: category="リピート・LTV向上", order=6
   - counseling-analysis-app: category="リピート・LTV向上", order=7
   - style-title-generator: category="採用・組織力強化", order=8
   - blog-automation-app: category="採用・組織力強化", order=9

**JSON構造例**:
```json
{
  "説明": "このファイルはmicroCMSに入力するためのアプリ紹介データです。",
  "作成日": "2025-10-01",
  "データ数": 9,
  "アプリ": [
    {
      "order": 1,
      "name": "Google画像自動投稿アプリ",
      "description": "...",
      "catchphrase": "...",
      "detailedDescription": "...",
      "features": ["特徴1", "特徴2", "特徴3"],
      "slides": [
        {
          "imageUrl": "/images/apps/google-post-app/slide-1.png",
          "altText": "..."
        }
      ],
      "category": "集客支援",
      "isPublished": true
    }
  ]
}
```

---

### タスク 2: データ入力ガイドの作成 ⏱️ 60分

**目的**: ユーザーがmicroCMS管理画面で9つのアプリを入力する手順を詳しく説明

**ファイル**: `docs/microcms-data-input-guide-apps.md`

**内容**:
1. **前提条件**: APIが作成済みであること
2. **データ入力手順**: 各アプリごとに詳細な入力内容
   - アプリ1: Google画像自動投稿アプリ
   - アプリ2: スタイル上げ直しアプリ
   - ...（全9アプリ）
3. **繰り返しフィールドの使い方**:
   - 特徴リストの追加方法（「+追加」ボタン）
   - スライド画像の追加方法（画像アップロード + altテキスト入力）
4. **トラブルシューティング**:
   - 画像がアップロードできない
   - 繰り返しフィールドの使い方がわからない
   - データが表示されない

**参考**: `docs/microcms-data-input-guide-site-config.md` の構造を参考にする

---

### タスク 3: アプリ一覧ページの改修 ⏱️ 30分

**目的**: `/apps` ページをmicroCMS対応にする

**ファイル**: `src/app/apps/page.tsx`

**手順**:
1. 既存のコードを確認
2. 環境変数による切り替えを追加:
   ```typescript
   const USE_MICROCMS = process.env.NEXT_PUBLIC_USE_MICROCMS === 'true';
   ```
3. データ取得ロジックを追加:
   ```typescript
   import { getApps } from '@/lib/microcms/fetchers';
   import { getAllApps } from '@/lib/data/apps-data';
   
   let apps;
   if (USE_MICROCMS) {
     try {
       const response = await getApps();
       apps = response.contents;
     } catch (error) {
       console.error('Failed to fetch apps:', error);
       apps = getAllApps(); // フォールバック
     }
   } else {
     apps = getAllApps();
   }
   ```
4. ISR設定を追加:
   ```typescript
   export const revalidate = 600; // 10分
   ```
5. TypeScript型エラーがないか確認

**注意**: 既存の表示ロジックは変更しない

---

### タスク 4: 型定義の最終確認 ⏱️ 15分

**目的**: App型とAppSlide型がmicroCMSのレスポンスと一致しているか確認

**ファイル**: `src/lib/microcms/types.ts`

**確認項目**:
1. `AppSlide` 型:
   ```typescript
   export interface AppSlide {
     fieldId: string;
     image: MicroCMSImage;
     altText: string;
   }
   ```
2. `App` 型:
   ```typescript
   export interface App extends MicroCMSBaseContent {
     name: string;
     description: string;
     catchphrase: string;
     detailedDescription?: string;
     features?: { fieldId: string; text: string }[];  // 繰り返しフィールド
     slides: AppSlide[];  // 繰り返しフィールド
     category: '集客支援' | 'リピート・LTV向上' | '採用・組織力強化';
     order: number;
     isPublished: boolean;
   }
   ```

**修正が必要な場合**:
- `features` フィールドは繰り返しフィールドなので、自動変換処理を追加
- `src/lib/microcms/fetchers.ts` の `getApps()` 関数で変換処理を実装

---

### タスク 5: features フィールドの自動変換 ⏱️ 30分

**目的**: 繰り返しフィールドの `features` を文字列配列に変換

**ファイル**: `src/lib/microcms/fetchers.ts`

**手順**:
1. `AppResponse` 型を追加（microCMSレスポンス用）:
   ```typescript
   interface AppResponse extends MicroCMSBaseContent {
     // ... 他のフィールド
     features?: { fieldId: string; text: string }[];
   }
   ```
2. `getApps()` 関数を修正:
   ```typescript
   export async function getApps(queries?: MicroCMSQueries) {
     return fetchWithErrorHandling(
       async () => {
         const response = await client.getList<AppResponse>({
           endpoint: 'apps',
           queries: {
             orders: 'order',
             filters: 'isPublished[equals]true',
             ...queries,
           } as SDKQueries,
         });
         
         // features を文字列配列に変換
         const transformedContents = response.contents.map((app) => ({
           ...app,
           features: app.features?.map((f) => f.text) || [],
         }));
         
         return {
           ...response,
           contents: transformedContents,
         };
       },
       'Failed to fetch apps'
     );
   }
   ```
3. `getAppById()` も同様に修正

---

### タスク 6: ビルド確認 ⏱️ 10分

**目的**: すべての変更がビルドエラーなく動作することを確認

**手順**:
```bash
# TypeScriptコンパイル
npm run build

# リンターチェック
npm run lint

# テスト実行
npm test
```

**エラーがある場合**: 修正してから次に進む

---

### タスク 7: ドキュメント更新 ⏱️ 15分

**目的**: 進捗管理ドキュメントを更新

**ファイル**: `docs/microcms-integration-progress.md`

**更新内容**:
1. Phase 4の「AI完了項目」セクションを更新
2. Phase 4の状態を「ユーザー作業待ち」に変更
3. 次のステップを明記

---

## 🎯 完了基準

Phase 4のAI作業が完了したと言えるのは、以下がすべて完了した時：

- [ ] `docs/microcms-data/apps.json` が作成されている
- [ ] `docs/microcms-data-input-guide-apps.md` が作成されている
- [ ] `src/app/apps/page.tsx` がmicroCMS対応になっている
- [ ] `src/lib/microcms/fetchers.ts` でfeaturesの自動変換が実装されている
- [ ] TypeScriptコンパイルエラーなし
- [ ] ESLintエラーなし
- [ ] ビルドが成功する
- [ ] `docs/microcms-integration-progress.md` が更新されている

---

## 💡 実装のヒント

### features の変換処理

**料金プランで既に実装済み**なので、同じパターンを使う：

参考: `src/lib/microcms/fetchers.ts` の `getPricingPlans()` 関数

### 既存データの扱い

`src/lib/data/apps-data.ts` の構造:
```typescript
export const APPS_DATA: App[] = [
  {
    id: "google-post-app",
    name: "Google画像自動投稿アプリ",
    description: "...",
    catchphrase: "...",
    detailedDescription: "...",
    features: ["特徴1", "特徴2", "特徴3"],  // 文字列配列
    slides: [
      { imageUrl: "...", altText: "..." }
    ]
  }
]
```

### 画像の扱い

既存データの画像は `/images/apps/` 配下にある。microCMSにアップロードする際は、これらの画像をユーザーがアップロードする必要がある。

---

## ⚠️ 注意事項

1. **UI/UXを変更しない**: 既存の表示ロジックはそのまま
2. **エラーハンドリング**: microCMS失敗時は既存データを使用
3. **繰り返しフィールド**: featuresとslidesの両方に注意
4. **型安全性**: TypeScriptの型チェックを活用
5. **ビルド確認**: 各タスク後にビルドが通ることを確認

---

## 📞 困ったら

- `docs/HANDOVER.md` の「トラブルシューティング」セクション
- `docs/microcms-integration-progress.md` の進捗状況
- 既存の実装（Phase 2, Phase 3）を参考にする

---

**作成日**: 2025年10月1日  
**次の担当者へ**: このタスクリストに従って Phase 4 を完了させてください！

