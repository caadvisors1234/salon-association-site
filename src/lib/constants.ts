/**
 * 認証関連の定数
 */
export const AUTH_COOKIE_NAME = 'special_plan_auth';
export const SPECIAL_PLAN_PATH = '/special-plan';
export const AUTH_PATH = `${SPECIAL_PLAN_PATH}/auth`;

/**
 * サイト全体の定数
 */
export const SITE_NAME = "一般社団法人AIビューティーサロン推進協会";

export const NAV_LINKS = [
  { href: "/", label: "トップ" },
  { href: "/about", label: "協会概要" },
  { href: "/services", label: "サービス内容" },
  { href: "/pricing", label: "料金プラン" },
  { href: "/apps", label: "アプリ紹介" },
  { href: "/faq", label: "よくある質問" },
];

export const FOOTER_NAV_LINKS = [
  ...NAV_LINKS,
  { href: "/contact", label: "お問い合わせ" },
];

export const SECONDARY_LINKS = [
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/terms", label: "利用規約" },
]; 