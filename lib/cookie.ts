// weebee-front/lib/cookie.ts
/* ---------------------------------------------------- */
export const TOKEN_KEY = 'access_token';

export function setCookie(
  name: string,
  value: string,
  maxAgeSec = 60 * 60 * 24, // 1 day
) {
  document.cookie = [
    `${name}=${value}`,
    `path=/`,
    `max-age=${maxAgeSec}`,
    `samesite=lax`,
    `secure`, // https 환경에서만 동작하도록
  ].join('; ');
}

export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0`;
}
