import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Restaurant, unwrap } from './models';

@Injectable({ providedIn: 'root' })
export class RestaurantsService {
  private http = inject(HttpClient);

  /** GET /api/Restaurants?cityId=&PageNumber=&PageSize=  (cityId optional: omitted = all restaurants) */
  getRestaurants(cityId: number | null, pageNumber: number, pageSize: number) {
    let params = new HttpParams().set('PageNumber', pageNumber).set('PageSize', pageSize);
    if (cityId != null) params = params.set('cityId', cityId);
    return this.http
      .get<any>(`${environment.apiUrl}/Restaurants`, { params })
      .pipe(map(r => unwrap<Restaurant>(r, pageSize)));
  }

  /** GET /api/Restaurants/{id} */
  getById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/Restaurants/${id}`).pipe(map(r => (r?.data ?? r) as Restaurant));
  }
}
