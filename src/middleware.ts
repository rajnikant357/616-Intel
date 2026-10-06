import { defineMiddleware } from 'astro:middleware';
import { randomBytes } from 'node:crypto';

export const onRequest = defineMiddleware(async (context, next) => {
  // If static prerendering at build time, pass through without accessing request headers
  if ((context as any).isPrerendered) {
    return next();
  }

  // 1. Generate or forward Request ID (Section 54)
  const incomingReqId = context.request.headers.get('x-request-id');
  const reqId = incomingReqId || `req_${Date.now()}_${randomBytes(4).toString('hex')}`;

  let response: Response;

  try {
    response = await next();
  } catch (err: any) {
    // Graceful error handling for API routes (Section 50, 52)
    if (context.url.pathname.startsWith('/api/')) {
      return new Response(
        JSON.stringify({
          error: 'An internal server error occurred.',
          reqId,
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'X-Request-Id': reqId,
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          },
        }
      );
    }
    throw err;
  }

  // 2. Clone/Prepare response headers
  const headers = new Headers(response.headers);

  // Set Request ID
  headers.set('X-Request-Id', reqId);

  // 3. Security Headers (Section 46, 47, 48)
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

  if (process.env.NODE_ENV === 'production') {
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  // Content-Security-Policy (Strict text-first policy)
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data:",
    "connect-src 'self'",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];
  headers.set('Content-Security-Policy', cspDirectives.join('; '));

  // 4. Cache controls for dynamic APIs
  if (context.url.pathname.startsWith('/api/')) {
    headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
