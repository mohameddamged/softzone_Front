import { environment } from '../../environments/environment';
import { img, withServerUrl } from './models';

describe('image helpers', () => {
  it('prefixes relative paths with the server url', () => {
    expect(withServerUrl('/assets/images/item1.jpg')).toBe(`${environment.serverUrl}/assets/images/item1.jpg`);
    expect(withServerUrl('assets/images/item1.jpg')).toBe(`${environment.serverUrl}/assets/images/item1.jpg`);
  });

  it('keeps absolute urls untouched', () => {
    expect(withServerUrl('https://cdn.example.com/a.jpg')).toBe('https://cdn.example.com/a.jpg');
  });

  it('uses the item image field, else a fallback photo', () => {
    expect(img({ imageUrl: '/assets/images/x.jpg' })).toContain('/assets/images/x.jpg');
    expect(img({}, 1)).toContain('images.unsplash.com');
  });
});
