import { AR, EN } from './i18n';

/** Collects every key path, including array lengths, so EN and AR stay the same shape. */
function shape(v: unknown, path = ''): string[] {
  if (Array.isArray(v)) return [`${path}[${v.length}]`, ...v.flatMap((x, i) => shape(x, `${path}[${i}]`))];
  if (v && typeof v === 'object') return Object.entries(v).flatMap(([k, x]) => shape(x, path ? `${path}.${k}` : k));
  return [path];
}

describe('translations', () => {
  it('EN and AR have identical structure', () => {
    expect(shape(AR)).toEqual(shape(EN));
  });

  it('has no empty strings', () => {
    const empty = (o: unknown): boolean =>
      typeof o === 'string' ? !o.trim() : !!o && typeof o === 'object' && Object.values(o).some(empty);
    expect(empty(EN)).toBeFalse();
    expect(empty(AR)).toBeFalse();
  });
});
