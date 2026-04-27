export function buildWpUrl(endpoint: string) {
  const base = process.env.NEXT_PUBLIC_WP_URL?.replace(/\/$/, '') || '';

  if (!endpoint) return base;

  // If already full URL → return as-is
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint;
  }

  // Ensure endpoint starts with /
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  return `${base}${path}`;
}