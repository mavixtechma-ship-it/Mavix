import { isSafeUrl } from './safe-url';

describe('isSafeUrl', () => {
  it('accepts https and mailto', () => {
    expect(isSafeUrl('https://github.com/user/repo')).toBeTrue();
    expect(isSafeUrl('mailto:me@example.com')).toBeTrue();
  });

  it('rejects dangerous, insecure, relative and empty values', () => {
    for (const u of ['javascript:alert(1)', 'JaVaScRiPt:alert(1)', 'data:text/html,<script>x</script>',
      'http://example.com', 'vbscript:x', '/relative', 'not a url', '', null, undefined]) {
      expect(isSafeUrl(u)).withContext(String(u)).toBeFalse();
    }
  });
});
