'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_COOKIE_NAME, AUTH_PATH, SPECIAL_PLAN_PATH } from '@/lib/constants';

const PASSWORD = process.env.SPECIAL_PLAN_PASSWORD ?? 'password';

type State = {
  error?: string;
  success?: boolean;
};

export async function authenticate(
  prevState: State | undefined,
  formData: FormData,
): Promise<State> {
  const password = formData.get('password');

  if (password === PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1時間
      path: SPECIAL_PLAN_PATH,
    });
    // リダイレクトは middleware で行うのでここでは不要
    // redirect('/special-plan'); 
    return { success: true };
  } else {
    return { error: 'パスワードが間違っています。' };
  }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);
    redirect(AUTH_PATH);
}

export async function checkAuth() {
    const cookieStore = await cookies();
    return !!cookieStore.get(AUTH_COOKIE_NAME)?.value;
} 