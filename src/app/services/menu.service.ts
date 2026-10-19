import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { MenuItem, unwrap } from './models';

/** GET /api/Restaurants/{id}/menu?PageNumber=&PageSize= */
@Injectable({ providedIn: 'root' })
export class MenuService {
  private http = inject(HttpClient);
  getMenu(restaurantId: number, pageNumber: number, pageSize: number) {
    const params = new HttpParams().set('PageNumber', pageNumber).set('PageSize', pageSize);
    return this.http
      .get<any>(`${environment.apiUrl}/Restaurants/${restaurantId}/menu`, { params })
      .pipe(map(r => unwrap<MenuItem>(r, pageSize)));
  }
}
