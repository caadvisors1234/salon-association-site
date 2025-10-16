/**
 * microCMS接続テストページ
 * 
 * このページはmicroCMSとの接続を確認するためのテストページです。
 * Phase 1完了後、このページを削除してください。
 * 
 * アクセス: http://localhost:3000/test-microcms
 */

import { testConnection } from '@/lib/microcms/fetchers';
import { MICROCMS_API_BASE_URL } from '@/lib/microcms/client';

export default async function TestMicroCMSPage() {
  let connectionStatus = false;
  let errorMessage = '';

  try {
    connectionStatus = await testConnection();
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : 'Unknown error';
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          microCMS 接続テスト
        </h1>

        <div className="space-y-6">
          {/* 接続状態 */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">接続状態</h2>
            <div className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full ${
                  connectionStatus ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span className="text-lg">
                {connectionStatus ? '✅ 接続成功' : '❌ 接続失敗'}
              </span>
            </div>
            {errorMessage && (
              <div className="mt-4 p-4 bg-red-50 rounded text-red-700">
                <p className="font-semibold">エラー:</p>
                <p className="text-sm mt-1">{errorMessage}</p>
              </div>
            )}
          </div>

          {/* 設定情報 */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">設定情報</h2>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-gray-600">サービスドメイン:</dt>
                <dd className="font-mono text-sm">
                  {process.env.MICROCMS_SERVICE_DOMAIN || '未設定'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">APIキー:</dt>
                <dd className="font-mono text-sm">
                  {process.env.MICROCMS_API_KEY
                    ? '••••••••' + process.env.MICROCMS_API_KEY.slice(-4)
                    : '未設定'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">API Base URL:</dt>
                <dd className="font-mono text-xs break-all">
                  {MICROCMS_API_BASE_URL}
                </dd>
              </div>
            </dl>
          </div>

          {/* 次のステップ */}
          {connectionStatus && (
            <div className="bg-green-50 rounded-lg border border-green-200 p-6">
              <h2 className="text-xl font-semibold mb-4 text-green-800">
                🎉 Phase 1 完了！
              </h2>
              <p className="text-green-700 mb-4">
                microCMSとの接続が正常に確立されました。
              </p>
              <div className="space-y-2 text-sm text-green-600">
                <p>✅ microCMS SDKのインストール</p>
                <p>✅ 環境変数の設定</p>
                <p>✅ APIクライアントの作成</p>
                <p>✅ 型定義の作成</p>
                <p>✅ データ取得関数の作成</p>
              </div>
              <div className="mt-6 p-4 bg-white rounded border border-green-200">
                <p className="font-semibold text-green-800 mb-2">
                  次のステップ: Phase 2
                </p>
                <p className="text-sm text-green-700">
                  料金プランのmicroCMS化を開始します。
                  <br />
                  microCMS管理画面で「料金プラン」APIを作成してください。
                </p>
              </div>
            </div>
          )}

          {/* トラブルシューティング */}
          {!connectionStatus && (
            <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-6">
              <h2 className="text-xl font-semibold mb-4 text-yellow-800">
                ⚠️ トラブルシューティング
              </h2>
              <div className="space-y-3 text-sm text-yellow-700">
                <div>
                  <p className="font-semibold">1. 環境変数を確認</p>
                  <p className="ml-4">
                    .env.local ファイルに正しいAPIキーが設定されているか確認してください。
                  </p>
                </div>
                <div>
                  <p className="font-semibold">2. 開発サーバーを再起動</p>
                  <p className="ml-4">
                    環境変数を変更した場合は、開発サーバーの再起動が必要です。
                  </p>
                  <code className="block ml-4 mt-1 p-2 bg-yellow-100 rounded">
                    npm run dev
                  </code>
                </div>
                <div>
                  <p className="font-semibold">3. APIキーの権限を確認</p>
                  <p className="ml-4">
                    microCMS管理画面で、APIキーに「GET」権限が付与されているか確認してください。
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 削除について */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            <strong>注意:</strong>{' '}
            このテストページは Phase 1 完了後に削除してください。
            <br />
            削除対象: <code className="text-xs">src/app/test-microcms/</code>
          </p>
        </div>
      </div>
    </main>
  );
}

