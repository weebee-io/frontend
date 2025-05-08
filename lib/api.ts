// weebee-front/lib/api.ts
import {
  SignupReq,
  LoginReq,
  LoginRes,
  UserRes,
  PageRes,
  QuizRes,
  ProductRes,
} from '@/types/api';
import { TOKEN_KEY, setCookie, getCookie, deleteCookie } from '@/lib/cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

/* 공통 fetch -------------------------------------------------------- */
async function request<T>(
  url: string,
  opts: RequestInit = {},
): Promise<T> {
  // ① 토큰 쿠키 존재 시 헤더에 Bearer 붙이기
  const token = typeof window !== 'undefined' ? getCookie(TOKEN_KEY) : null;

  const res = await fetch(`${BASE_URL}${url}`, {
    credentials: 'omit',          // 세션 쿠키가 없으므로 omit
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers ?? {}),
    },
    ...opts,
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => null);
    throw new Error(errBody?.message ?? res.statusText);
  }

  if (res.status === 204) return undefined as unknown as T;
  return (await res.json()) as T;
}

/* 엔드포인트 헬퍼 ---------------------------------------------------- */
export const api = {
  /* ─── Auth ─── */
  signup: (body: SignupReq) =>
    request<UserRes>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  login: async (body: LoginReq) => {
    const { accessToken } = await request<LoginRes>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    // ② JWT를 쿠키에 저장
    setCookie(TOKEN_KEY, accessToken);
  },

  logout: () => {
    deleteCookie(TOKEN_KEY);
  },

  /* ─── User ─── */
  me: () => request<UserRes>('/users/me'),

  /* ─── Quiz ─── */
  quizzes: (q = '') => request<PageRes<QuizRes>>(`/quizzes${q}`),
  quizById: (id: number) => request<QuizRes>(`/quizzes/${id}`),

  /* ─── Products ─── */
  products: (q = '') => request<ProductRes[]>(`/products${q}`),
  productById: (id: number) => request<ProductRes>(`/products/${id}`),
};

export { request };
