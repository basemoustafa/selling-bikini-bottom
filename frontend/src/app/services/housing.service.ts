import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IProperty } from '../property/IProperty.interface';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) {}

  getAllProperties(SellRent: number, getAll: boolean): Observable<IProperty[]> {
    if (getAll) {
      return this.http.get('data/properties.json').pipe(
        map((data: any) => {
          const propertiesArr: Array<IProperty> = [];
          for (const id in data) {
            if (data.hasOwnProperty(id)) {
              propertiesArr.push(data[id]);
            }
          }
          return propertiesArr;
        })
      );
    }

    return this.http.get('data/properties.json').pipe(
      map((data: any) => {
        const propertiesArr: Array<IProperty> = [];
        for (const id in data) {
          if (data.hasOwnProperty(id) && data[id].SellRent == SellRent) {
            propertiesArr.push(data[id]);
          }
        }
        return propertiesArr;
      })
    );
  }
}
