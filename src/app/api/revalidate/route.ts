import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * microCMS Webhook用 On-Demand Revalidation API
 * 
 * microCMSでコンテンツが更新されたときに、このAPIを呼び出すことで
 * Next.jsのキャッシュを即座に再検証し、最新のコンテンツを表示できます。
 * 
 * 使用方法:
 * POST /api/revalidate
 * Body: { secret: "your-secret", endpoint: "apps" }
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, endpoint } = body;

    // シークレットキーの検証
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
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

