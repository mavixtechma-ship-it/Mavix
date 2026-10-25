/** True only for absolute https: / mailto: URLs. Use before binding config/API links to [href]. */
export function isSafeUrl(u: string | null | undefined): boolean {
  if (!u) return false;
  try {
    return ['https:', 'mailto:'].includes(new URL(u).protocol);
  } catch {
    return false;
  }
}
