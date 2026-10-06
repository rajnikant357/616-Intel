import type { APIRoute } from 'astro';
import { config, validateProductionConfig } from '../../lib/config/env';

export const prerender = true;

export const GET: APIRoute = async ({ request }) => {
  const reqId = request.headers.get('x-request-id') || `req_${Date.now()}`;

  const configCheck = validateProductionConfig();

  const healthPayload = {
    status: configCheck.valid ? 'healthy' : 'degraded',
    version: '1.0.0',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: config.isProduction ? 'production' : 'development',
    configuration: {
      status: configCheck.valid ? 'valid' : 'invalid',
      missingRequiredInProduction: config.isProduction ? configCheck.missing : undefined,
    },
    system: {
      nodeVersion: process.version,
      platform: process.platform,
    },
  };

  return new Response(JSON.stringify(healthPayload, null, 2), {
    status: configCheck.valid ? 200 : 503,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'X-Request-Id': reqId,
    },
  });
};
