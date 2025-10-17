# 次のAIへ - 最初に読むべきドキュメント

**作成日**: 2025年10月1日  
**前任AI**: Claude Sonnet 4.5

---

## 👋 ようこそ！

このプロジェクトを引き継いでくれてありがとうございます。

**現在の状態**: microCMS統合プロジェクトの Phase 4（アプリ紹介移行）の準備段階です。

---

## 📖 最初に読むべきドキュメント（優先順）

### 1. まず5分でこれを読んでください
```
docs/QUICK_START.md
```
プロジェクトの全体像を5分で把握できます。

### 2. 次に詳細を確認（15-20分）
```
docs/HANDOVER.md
```
詳細なハンドオーバー情報、完了済みフェーズ、技術的な実装詳細。

### 3. あなたの作業内容を確認（10分）
```
docs/PHASE4_TASKS.md
```
Phase 4で実施すべき具体的なタスクリスト。

### 4. 進捗状況を確認（5分）
```
docs/microcms-integration-progress.md
```
プロジェクト全体の進捗管理。

---

## ⚡ 作業開始前のチェックリスト

### 環境確認（2分）

```bash
# プロジェクトディレクトリに移動
cd /Users/mnhrk/CAA/caa1234_code/salon-association-site

# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev
```

### 接続テスト（1分）

ブラウザで以下にアクセス:
- http://localhost:3000 - サイト表示
- http://localhost:3000/test-microcms - **「✅ 接続成功」が表示されるべき**

### ビルド確認（2分）

```bash
npm run build
```

エラーなく完了すれば OK です。

---

## 🎯 あなたのミッション

### Phase 4: アプリ紹介移行

**目標**: 9種類のアプリ紹介データをmicroCMS化する

**推定作業時間**: 3-4時間

**あなたが実施すること**:
1. 既存データのJSON化
2. データ入力ガイドの作成
3. アプリ一覧ページの改修
4. 型定義の最終確認
5. features フィールドの自動変換処理
6. ビルド確認
7. ドキュメント更新

**詳細**: `docs/PHASE4_TASKS.md` を参照

---

## 🚨 重要な注意事項

### 絶対に守ること

1. **Next.js 15.3.3を維持** - バージョンアップ禁止
2. **UI/UXを変更しない** - 明示的な指示がない限り
3. **既存データとの互換性** - 環境変数で切り替え可能に
4. **エラーハンドリング** - microCMS失敗時は既存データにフォールバック
5. **繰り返しフィールド** - カスタムフィールド内のフィールドIDは正確に

### 実装パターン

**料金プランで既に実装済み**なので、同じパターンを使ってください:
- `src/app/pricing/page.tsx` - ページコンポーネントの改修例
- `src/lib/microcms/fetchers.ts` - 繰り返しフィールドの変換処理例

---

## 📁 重要なファイルの場所

### 既存データ（読み取り専用）
```
src/lib/data/apps-data.ts  ← 9つのアプリデータがここにある
```

### あなたが作成するファイル
```
docs/microcms-data/apps.json                  ← 既存データのJSON化
docs/microcms-data-input-guide-apps.md        ← ユーザー向けガイド
```

### あなたが修正するファイル
```
src/app/apps/page.tsx                         ← microCMS対応に改修
src/lib/microcms/fetchers.ts                  ← features変換処理追加
docs/microcms-integration-progress.md         ← 進捗更新
```

---

## 💡 実装のヒント

### 繰り返しフィールドの扱い

**問題**: microCMSの繰り返しフィールドは配列オブジェクトだが、既存コードは文字列配列を期待

**解決策**: データ取得時に自動変換（料金プランで実装済み）

```typescript
// microCMSレスポンス
{ features: [{ fieldId: "...", text: "特徴1" }, { text: "特徴2" }] }

// 変換後
{ features: ["特徴1", "特徴2"] }
```

参考: `src/lib/microcms/fetchers.ts` の `getPricingPlans()` 関数

---

## 🆘 困ったら

### トラブルシューティング

1. **ビルドエラー**
   ```bash
   npm run build 2>&1 | head -50
   ```
   エラー内容を確認して、型定義や構文を修正。

2. **型エラー**
   ```
   src/lib/microcms/types.ts
   ```
   型定義を確認。

3. **接続エラー**
   ```
   http://localhost:3000/test-microcms
   ```
   接続テストで確認。

4. **その他**
   ```
   docs/HANDOVER.md の「トラブルシューティング」セクション
   ```

---

## 📝 完了報告

Phase 4の作業が完了したら、ユーザーに以下を報告してください：

```markdown
Phase 4のAI作業が完了しました！

### 作成したファイル
- docs/microcms-data/apps.json
- docs/microcms-data-input-guide-apps.md

### 修正したファイル
- src/app/apps/page.tsx
- src/lib/microcms/fetchers.ts
- docs/microcms-integration-progress.md

### 確認済み
- ✅ TypeScriptコンパイルエラーなし
- ✅ ESLintエラーなし
- ✅ ビルド成功

### 次のステップ
ユーザーがmicroCMSでAPIを作成し、9つのアプリデータを入力してください。
詳細は `docs/microcms-data-input-guide-apps.md` を参照。
```

---

## 🎉 最後に

- **焦らず、一歩ずつ**: タスクリストに従って確実に進めてください
- **ドキュメントを活用**: 困ったら `docs/HANDOVER.md` を参照
- **既存実装を参考に**: Phase 2, 3で実装済みのパターンを使う

頑張ってください！質問があればいつでもユーザーに聞いてください。

---

**前任AIより** 🚀

