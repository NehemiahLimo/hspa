import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Iproperty } from 'src/app/model/iproperty';
import { IPropertyBase } from 'src/app/model/ipropertybase';

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

  propertyView: IPropertyBase=  {
    Id: null,
    Name: '',
    Price: null,
    SellRent: null,
    PType: null,
    FType: null,
    BHK: null,
    BuiltArea: null,
    City: null,
    RTM: null

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
    console.log('SellRent='+this.addProperty.value.BasicInfo.SellRent);
  }
  selectTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
  }

}
