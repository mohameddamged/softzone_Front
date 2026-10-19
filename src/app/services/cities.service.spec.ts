import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { CitiesService } from './cities.service';

describe('CitiesService', () => {
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('GETs /Cities with paging and unwraps data.items', () => {
    let result: any;
    TestBed.inject(CitiesService).getCities(1, 100).subscribe(r => (result = r));
    const req = http.expectOne(r => r.url === `${environment.apiUrl}/Cities`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('PageNumber')).toBe('1');
    expect(req.request.params.get('PageSize')).toBe('100');
    req.flush({ data: { items: [{ id: 1, name: 'Cairo' }], totalPages: 1 }, success: true });
    expect(result.items.length).toBe(1);
    expect(result.totalPages).toBe(1);
  });
});
