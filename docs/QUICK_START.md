# microCMS統合プロジェクト クイックスタートガイド

このドキュメントは、プロジェクトを引き継いだAIが最初の5分で理解すべき内容をまとめています。

---

## ⚡ 5分で理解するプロジェクト

### 何をしているのか？
美容サロン協会のサイトに、非エンジニアでも編集できるようmicroCMS（ヘッドレスCMS）を導入中。

### 現在の進捗
**40%完了** - Phase 3まで完了、Phase 4を準備中

### すぐに確認すべきファイル
1. `docs/HANDOVER.md` - 詳細なハンドオーバードキュメント（必読）
2. `docs/microcms-integration-progress.md` - 進捗管理
3. `src/lib/microcms/` - microCMS統合の基盤コード

---

## 🚀 作業再開手順（3ステップ）

### 1. 環境確認（2分）

```bash
cd /Users/mnhrk/CAA/caa1234_code/salon-association-site

# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev
```

ブラウザで確認:
- http://localhost:3000 - サイト表示
- http://localhost:3000/test-microcms - microCMS接続テスト（「✅ 接続成功」が表示されるべき）

### 2. 現在の状態確認（1分）

```bash
# ビルドが通るか確認
npm run build

# リンターエラー確認
npm run lint
```

### 3. 次のタスク確認（2分）

**現在**: Phase 4（アプリ紹介移行）の準備中

**次に実施すべきこと**:
1. 既存データのJSON化（`docs/microcms-data/apps.json` を作成）
2. データ入力ガイド作成
3. アプリ一覧ページ改修（`src/app/apps/page.tsx`）

---

## 📁 重要なファイルの場所

### ドキュメント
```
docs/
├── HANDOVER.md                      ← 【最重要】詳細なハンドオーバー情報
├── QUICK_START.md                   ← このファイル
├── microcms-integration-progress.md ← 進捗管理
├── microcms-schemas/                ← APIスキーマ定義書
│   ├── site-config.md              （Phase 3完了）
│   ├── apps.md                     （Phase 4準備中）
│   └── pricing-plans.md            （Phase 2保留中）
└── microcms-data/                   ← 既存データJSON
    └── site-config.json            （Phase 3完了）
```

### ソースコード
```
src/
├── lib/microcms/                    ← microCMS統合の中核
│   ├── client.ts                   （APIクライアント）
│   ├── types.ts                    （型定義・全API対応済み）
│   └── fetchers.ts                 （データ取得関数）
├── lib/data/                        ← 既存の静的データ
│   ├── apps-data.ts                （9つのアプリデータ）
│   ├── services-data.ts
│   └── about-data.ts
└── app/
    ├── layout.tsx                  （Phase 3で改修済み）
    ├── apps/page.tsx               （Phase 4で改修予定）
    └── test-microcms/page.tsx      （接続テストページ）
```

---

## 🎯 各フェーズの状態

| Phase | 状態 | 次のアクション |
|-------|------|---------------|
| 0 | ✅ 完了 | - |
| 1 | ✅ 完了 | - |
| 2 | ⏸️ 保留 | ユーザーが再開を指示するまで待機 |
| 3 | ✅ 完了 | - |
| **4** | **🔄 準備中** | **JSONファイル作成 → ガイド作成 → ページ改修** |
| 5 | 📋 未着手 | Phase 4完了後に開始 |
| 6 | 📋 未着手 | Phase 5完了後に開始 |
| 7 | 📋 未着手 | Phase 6完了後に開始 |
| 8 | 📋 未着手 | 最終フェーズ |

---

## 💡 よくある質問（FAQ）

### Q1: microCMS接続テストが失敗する
**A**: 
1. `.env.local` ファイルが存在するか確認
2. 開発サーバーを再起動
3. `MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY` が正しいか確認

### Q2: ビルドエラーが出る
**A**:
```bash
npm run build 2>&1 | head -50
```
でエラー内容を確認。TypeScript型エラーが多い場合は `src/lib/microcms/types.ts` を確認。

### Q3: どのファイルから読めばいい？
**A**: 
1. `docs/HANDOVER.md`（このドキュメントの詳細版）
2. `docs/microcms-integration-progress.md`（進捗状況）
3. `src/lib/microcms/types.ts`（型定義）

### Q4: 環境変数の設定は？
**A**:
```bash
# .env.local の内容
MICROCMS_SERVICE_DOMAIN=r9ru6kip5e
MICROCMS_API_KEY=MHL6rswy4oQZRfpNvk7fuXvnzASo6qwj94LL
NEXT_PUBLIC_USE_MICROCMS=true
```

### Q5: Phase 4で何をすればいい？
**A**:
1. `src/lib/data/apps-data.ts` を読む（既存の9アプリデータ）
2. `docs/microcms-data/apps.json` を作成（既存データをJSON化）
3. `docs/microcms-data-input-guide-apps.md` を作成（ユーザー向けガイド）
4. `src/app/apps/page.tsx` を改修（microCMS対応）

---

## ⚠️ 絶対に守るべきルール

1. **Next.js 15.3.3を維持** - バージョンを勝手に変更しない
2. **UI/UXを変更しない** - 明示的な指示がない限り、デザインを変更しない
3. **既存データとの互換性** - 環境変数で切り替え可能にする
4. **エラーハンドリング** - microCMS失敗時は既存データにフォールバック
5. **繰り返しフィールド** - カスタムフィールド内のフィールドIDは正確に

---

## 🔗 参考リンク

- [詳細ハンドオーバー](./HANDOVER.md) - 必読
- [進捗管理](./microcms-integration-progress.md)
- [microCMS公式ドキュメント](https://document.microcms.io/)
- [プロジェクト要件](./requirements.md)

---

## 📞 困ったら

1. **`docs/HANDOVER.md` の「トラブルシューティング」セクションを確認**
2. **ビルドエラー**: `npm run build` で詳細確認
3. **型エラー**: `src/lib/microcms/types.ts` を確認
4. **接続エラー**: `/test-microcms` で接続テスト
5. **データ構造**: `docs/microcms-schemas/*.md` でAPIスキーマ確認

---

**最終更新**: 2025年10月1日  
**次の担当者へ**: Phase 4を完了させてください。頑張ってください！ 🚀

