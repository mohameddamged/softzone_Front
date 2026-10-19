import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { City, unwrap } from './models';

/** GET /api/Cities?PageNumber=&PageSize= */
@Injectable({ providedIn: 'root' })
export class CitiesService {
  private http = inject(HttpClient);
  getCities(pageNumber = 1, pageSize = 100) {
    const params = new HttpParams().set('PageNumber', pageNumber).set('PageSize', pageSize);
    return this.http.get<any>(`${environment.apiUrl}/Cities`, { params }).pipe(map(r => unwrap<City>(r, pageSize)));
  }
}
