import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IProperty } from '../property/IProperty.interface';
import { Observable } from 'rxjs';
import { Property } from '../model/property';



@Injectable({
  providedIn: 'root'
})
export class HousingService {
SellRent = 1;
  constructor( private http: HttpClient) {}

  getAllProperties(SellRent: number): Observable<IProperty[]> {

    return this.http.get('data/properties.json').pipe(
      map( data => {
        const propertiesArray: Array<IProperty> = [];

        for (const id in data){
          if (data.hasOwnProperty(id) && data[id].SellRent  === SellRent){
          propertiesArray.push(data[id]);

        }
      }
        return propertiesArray;

      })
    );
  }

  addProperty(property: Property){
    let newProp = [property];

    // Add new property in array if newProp alreay exists in local storage
    if (localStorage.getItem('newProp')) {
      newProp = [property,
                  ...JSON.parse(localStorage.getItem('newProp'))];
    }
    localStorage.setItem('newProp', JSON.stringify(newProp));
  }
}
