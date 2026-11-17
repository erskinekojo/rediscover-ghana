/** Prefix a site path with the configured base so the site also works from a sub-path. */
export function u(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : '/' + path;
  return base + p;
}
