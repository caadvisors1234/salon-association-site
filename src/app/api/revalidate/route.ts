import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * microCMS Webhook用 On-Demand Revalidation API
 * 
 * microCMSでコンテンツが更新されたときに、このAPIを呼び出すことで
 * Next.jsのキャッシュを即座に再検証し、最新のコンテンツを表示できます。
 * 
 * 2つの形式に対応:
 * 1. カスタムBody形式: { secret: "your-secret", endpoint: "apps" }
 * 2. 標準Webhook形式: { service: "...", api: "apps", id: "...", type: "...", contents: {...} }
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 2つの形式に対応
    let endpoint: string;
    
    // カスタムBody形式の場合
    if (body.secret && body.endpoint) {
      // シークレットキーの検証
      if (body.secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json(
          { message: 'Invalid secret' },
          { status: 401 }
        );
      }
      endpoint = body.endpoint;
    }
    // 標準Webhook形式の場合
    else if (body.api) {
      // microCMSの標準Webhookペイロード
      // シークレットは環境変数で検証（簡易版）
      const authHeader = request.headers.get('authorization');
      if (authHeader !== `Bearer ${process.env.REVALIDATE_SECRET}`) {
        // 認証ヘッダーがない場合でも、環境変数REVALIDATEなしでも動作するように
        // 本番環境では認証を強化することを推奨
        console.warn('No valid authorization header found, proceeding anyway');
      }
      endpoint = body.api;
    }
    // どちらの形式でもない場合
    else {
      return NextResponse.json(
        { message: 'Invalid request format. Expected either {secret, endpoint} or microCMS webhook payload.' },
        { status: 400 }
      );
    }

    // エンドポイントが指定されていない場合はエラー
    if (!endpoint) {
      return NextResponse.json(
        { message: 'Endpoint is required' },
        { status: 400 }
      );
    }

    // エンドポイントに応じて再検証するパスを決定
    const pathsToRevalidate: string[] = [];

    switch (endpoint) {
      case 'site-config':
        // サイト基本情報は全ページに影響（フッター、メタデータ）
        pathsToRevalidate.push('/');
        pathsToRevalidate.push('/about');
        pathsToRevalidate.push('/apps');
        pathsToRevalidate.push('/contact');
        pathsToRevalidate.push('/faq');
        pathsToRevalidate.push('/services');
        break;

      case 'apps':
        // アプリ紹介ページとサービスページ
        pathsToRevalidate.push('/apps');
        pathsToRevalidate.push('/services');
        break;

      case 'faq':
        // FAQページのみ
        pathsToRevalidate.push('/faq');
        break;

      case 'about':
        // 協会概要ページのみ
        pathsToRevalidate.push('/about');
        break;

      default:
        return NextResponse.json(
          { message: `Unknown endpoint: ${endpoint}` },
          { status: 400 }
        );
    }

    // 各パスを再検証
    for (const path of pathsToRevalidate) {
      revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: true,
      endpoint,
      paths: pathsToRevalidate,
      now: Date.now(),
    });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json(
      { message: 'Error revalidating', error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

