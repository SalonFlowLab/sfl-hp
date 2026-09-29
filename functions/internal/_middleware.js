// 内部向け集約ページ（/internal/）は Cloudflare Pages のプレビュー環境とローカルだけで表示する。
// 本番（独自ドメイン・<project>.pages.dev）では 404 を返す。
// プレビューのURLは <branch or hash>.<project>.pages.dev の形になるため、サブドメインが2段以上ある pages.dev だけを許可する。
const PREVIEW_HOST = /^[^.]+\.[^.]+\.pages\.dev$/;
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]']);

export function isPreviewHost(hostname) {
  return LOCAL_HOSTS.has(hostname) || PREVIEW_HOST.test(hostname);
}

export async function onRequest(context) {
  const { hostname } = new URL(context.request.url);
  if (!isPreviewHost(hostname)) {
    return new Response('Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow' }
    });
  }

  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set('X-Robots-Tag', 'noindex, nofollow');
  headers.set('Cache-Control', 'no-store');
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
