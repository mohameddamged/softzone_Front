import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('POSTs the order to /Orders/checkout', () => {
    const body = {
      restaurantId: 1, customerName: 'A', customerPhone: '1', customerEmail: 'a@a.com', customerAddress: 'x',
      orderItems: [{ menuItemId: 1, quantity: 2 }],
    };
    TestBed.inject(OrdersService).checkout(body).subscribe();
    const req = http.expectOne(`${environment.apiUrl}/Orders/checkout`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);
    req.flush({ success: true });
  });
});
