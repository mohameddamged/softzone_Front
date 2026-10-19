import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { RestaurantsService } from './restaurants.service';

describe('RestaurantsService', () => {
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('omits cityId when no city is selected', () => {
    TestBed.inject(RestaurantsService).getRestaurants(null, 1, 3).subscribe();
    const req = http.expectOne(r => r.url === `${environment.apiUrl}/Restaurants`);
    expect(req.request.params.has('cityId')).toBe(false);
    expect(req.request.params.get('PageSize')).toBe('3');
    req.flush({ data: { items: [], totalPages: 1 } });
  });

  it('sends cityId when a city is selected', () => {
    TestBed.inject(RestaurantsService).getRestaurants(2, 2, 3).subscribe();
    const req = http.expectOne(r => r.url === `${environment.apiUrl}/Restaurants`);
    expect(req.request.params.get('cityId')).toBe('2');
    expect(req.request.params.get('PageNumber')).toBe('2');
    req.flush({ data: { items: [{ id: 5, name: 'A' }], totalPages: 3 } });
  });

  it('GETs a restaurant by id and unwraps data', () => {
    let result: any;
    TestBed.inject(RestaurantsService).getById(1).subscribe(r => (result = r));
    http.expectOne(`${environment.apiUrl}/Restaurants/1`).flush({ data: { id: 1, name: 'R1' }, success: true });
    expect(result.name).toBe('R1');
  });
});
