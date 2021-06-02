import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from 'src/app/services/housing.service';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;
  properties: IPropertyBase[] = [];
  City = '';
  SearchCity = '';
  SortByParam = '';
  SortDirection = 'asc';


  constructor(private route: ActivatedRoute, private housingService: HousingService) { }

  ngOnInit(): void {
    if (this.route.snapshot.url.toString()){
      this.SellRent = 2;
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(
  data => {
  this.properties = data;

  console.log(data);
  console.log(this.route.snapshot.url.toString());
}, error => {
  console.log('httperror:');
  console.log(error);

}
);

  }

  // tslint:disable-next-line: typedef
  onCityFilter(){
this.SearchCity = this.City;
  }


  // tslint:disable-next-line: typedef
  onCityClear(){
this.SearchCity = '';
this.City = '';
  }
  // tslint:disable-next-line: typedef
  onSortDirection(){
    if (this.SortDirection === 'desc')
    {
      this.SortDirection = 'asc';
    }
    else{
      this.SortDirection = 'desc';
    }
  }

}
