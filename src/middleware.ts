import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_COOKIE_NAME, AUTH_PATH, SPECIAL_PLAN_PATH } from './lib/constants';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has(AUTH_COOKIE_NAME);
  const isAuthPage = pathname === AUTH_PATH;

  // --- 認証チェックとリダイレクト ---
  // 認証済みで、認証ページにアクセスした場合 -> メインページへ
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL(SPECIAL_PLAN_PATH, request.url));
  }

  // 未認証で、保護されたページ（認証ページ以外）にアクセスした場合 -> 認証ページへ
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL(AUTH_PATH, request.url));
  }

  // --- アクセス許可 & セキュリティヘッダーの設定 ---
  const response = NextResponse.next();

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // CSPは必要に応じてより厳格な設定を追加
  response.headers.set(
    'Content-Security-Policy',
    "frame-ancestors 'none'"
  );

  return response;
}

export const config = {
  // Middlewareを /special-plan とその配下のパスにのみ適用
  // Turbopack環境での解釈の不安定性を考慮し、対象パスを明示的に列挙
  matcher: ['/special-plan', '/special-plan/auth', '/special-plan/:path*'],
} 