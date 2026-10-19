import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CheckoutRequest } from './models';

/** POST /api/Orders/checkout */
@Injectable({ providedIn: 'root' })
export class OrdersService {
  private http = inject(HttpClient);
  checkout(body: CheckoutRequest) {
    return this.http.post<any>(`${environment.apiUrl}/Orders/checkout`, body);
  }
}
