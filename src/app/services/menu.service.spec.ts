import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { MenuService } from './menu.service';

describe('MenuService', () => {
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('GETs /Restaurants/{id}/menu with paging', () => {
    let result: any;
    TestBed.inject(MenuService).getMenu(1, 2, 4).subscribe(r => (result = r));
    const req = http.expectOne(r => r.url === `${environment.apiUrl}/Restaurants/1/menu`);
    expect(req.request.params.get('PageNumber')).toBe('2');
    expect(req.request.params.get('PageSize')).toBe('4');
    req.flush({ data: { items: [{ id: 9, name: 'Item', price: 12 }], totalPages: 2 } });
    expect(result.items[0].price).toBe(12);
    expect(result.totalPages).toBe(2);
  });
});
