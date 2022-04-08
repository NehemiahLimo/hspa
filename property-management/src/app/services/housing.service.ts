import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Property } from '../model/property';
import { environment } from 'src/environments/environment';
import { IKeyvaluepair } from '../model/IKeyValuePair';


@Injectable({
  providedIn: 'root'
})
export class HousingService {

baseUrl = environment.baseUrl;
SellRent = 1;
  constructor( private http: HttpClient) {}

  getAllCities(): Observable<string[]>{
    return this.http.get<string[]>(this.baseUrl + "/city");
  }

  getProperty(id: number){
    return this.http.get<Property>(this.baseUrl+'/properties/data/'+id.toString());
  }
  getPropertyTypes(): Observable<IKeyvaluepair[]> {
    return this.http.get<IKeyvaluepair[]>(this.baseUrl+'/propertytype/list');
  }
  getFurnishingTypes(): Observable<IKeyvaluepair[]>{
    return this.http.get<IKeyvaluepair[]>(this.baseUrl+'/furnishingtype/list');
  }

  getAllProperties(SellRent?: number): Observable<Property[]>{
    return this.http.get<Property[]>(this.baseUrl+'/properties/getproperties/'+SellRent.toString());
  };

  getAllPropertiesJson(SellRent?: number): Observable<Property[]> {

    return this.http.get('data/properties.json').pipe(
      map( data => {
        const propertiesArray: Array<Property> = [];

        const localProperties = JSON.parse(localStorage.getItem('newProp'));
        if (localProperties){
          for (const id in localProperties){
            if (SellRent){
          if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent  === SellRent){
          propertiesArray.push(localProperties[id]);

        }
        }else {
          propertiesArray.push(localProperties[id]);
        }
      }
    }

        for (const id in data){
          if (SellRent){
          if (data.hasOwnProperty(id) && data[id].SellRent  === SellRent){
          propertiesArray.push(data[id]);

        }
      }else{
        propertiesArray.push(data[id]);
      }
      }
        return propertiesArray;

      })
    );
    return this.http.get<Property[]>('data/properties.json');
  }

  addProperty(property: Property){
    return this.http.post(this.baseUrl+'/properties/add_data', property);

    // let newProp = [property];

    // // Add new property in array if newProp alreay exists in local storage
    // if (localStorage.getItem('newProp')) {
    //   newProp = [property,
    //               ...JSON.parse(localStorage.getItem('newProp'))];
    // }
    // localStorage.setItem('newProp', JSON.stringify(newProp));
  }

  newPropId(){
    if ( localStorage.getItem('PID')){
      localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));
      return +localStorage.getItem('PID');


    }
    else{
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
  getPropertyAge(dateofEstablishment: string): string
  {
      const today = new Date();
      const estDate = new Date(dateofEstablishment);
      let age = today.getFullYear() - estDate.getFullYear();
      const m = today.getMonth() - estDate.getMonth();

      // Current month smaller than establishment month or
      // Same month but current date smaller than establishment date
      if (m < 0 || (m === 0 && today.getDate() < estDate.getDate())) {
          age --;
      }

      // Establshment date is future date
      if(today < estDate) {
          return '0';
      }

      // Age is less than a year
      if(age === 0) {
          return 'Less than a year';
      }

      return age.toString();
  }
}
