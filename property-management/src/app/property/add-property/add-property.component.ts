import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IProperty } from '../IProperty.interface';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('Form') addProperty: NgForm;
  @ViewChild('formTabs') formTabs: TabsetComponent;

  propertyTypes: Array<string> = ['House', 'Apartments', 'Duplex'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];
  dir: Array<string> = ['East', 'West', 'North', 'South'];

  propertyView: IProperty=  {
    Id: null,
    Name: '',
    Price: null,
    SellRent: null,
    Type: null
  };

  SellRent = '1';
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onBack(){
    this.router.navigate(['/']);
  }

  onSubmit(Form: NgForm){
    console.log('Congrats, submitted');
    console.log(this.addProperty);
  }
  selectTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
  }

}
