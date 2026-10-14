/**
 * Strict URL sanitization utility for external music provider links and cover art.
 * Enforces http: or https: protocols and prevents javascript:, data:, or relative protocol exploits.
 */
export function sanitizeExternalUrl(url: unknown, fallback = '#'): string {
  if (typeof url !== 'string') return fallback;
  const trimmed = url.trim();
  if (!trimmed) return fallback;

  // Disallow javascript:, vbscript:, and data: schemes explicitly
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('vbscript:') ||
    lower.startsWith('data:') ||
    lower.startsWith('file:') ||
    lower.startsWith('blob:')
  ) {
    return fallback;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.toString();
    }
  } catch (_) {
    // Relative or invalid URLs
    return fallback;
  }

  return fallback;
}
