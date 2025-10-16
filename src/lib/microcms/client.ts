/**
 * microCMS APIクライアント
 * 
 * このファイルはmicroCMSとの通信を行うクライアントを提供します。
 * 環境変数からサービスドメインとAPIキーを読み込み、クライアントを初期化します。
 */

import { createClient } from 'microcms-js-sdk';

// 環境変数の検証
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required. Please check your .env.local file.');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required. Please check your .env.local file.');
}

/**
 * microCMS APIクライアント
 * Server ComponentsまたはServer Actionsでのみ使用してください
 */
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

/**
 * microCMS APIのベースURL
 * デバッグやログ出力に使用
 */
export const MICROCMS_API_BASE_URL = `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1`;

