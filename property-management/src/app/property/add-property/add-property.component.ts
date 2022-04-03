import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { AlertyfyService } from 'src/app/services/alertyfy.service';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})

export class AddPropertyComponent implements OnInit {
  // @ViewChild('Form') addProperty: NgForm;
  @ViewChild('formTabs') formTabs: TabsetComponent;
  addProperty: FormGroup;
  nextClicked: boolean;
  property = new Property();

  propertyTypes: Array<string> = ['House', 'Apartments', 'Duplex'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];
  dir: Array<string> = ['East', 'West', 'North', 'South'];

cityList: string[];

  propertyView: IPropertyBase =  {
    id: null,
    name: '',
    price: null,
    sellRent: null,
    propertyType: null,
    furnishingType: null,
    bhk: null,
    builtArea: null,
    city: '',
    readyToMove: null

  };

  SellRent = '1';
  constructor(private router: Router, private fb: FormBuilder, private housingService: HousingService,
              private alertify: AlertyfyService ) { }



  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.createAddPropertyForm();
    this.housingService.getAllCities().subscribe(data=>{
      this.cityList=data;
      console.log("---Data---",data);
    })
  }

  // tslint:disable-next-line: typedef
  createAddPropertyForm(){


    this.addProperty = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: ['1', Validators.required],
        FType: [null, Validators.required],
        PType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required],
        BHK: [null, Validators.required],
      }),
      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        Security: [null],
        CarpetArea: [null],
        BuiltArea: [null, Validators.required],
        Maintenance: [null],
    }),
    AddressInfo: this.fb.group({
      FloorNo: [null],
      TotalFloor: [null],
      Address: [null, Validators.required],
      LandMark: [null],
    }),

    OtherInfo: this.fb.group({
      RTM: [null, Validators.required],
      PossessionOn: [null],
      AOP: [null],
      Gated: [null],
      MainEntrance: [null],
      Description: [null]
    })

    });
  }


 //#region <Getter Methods>
  // #region <FormGroups>
  // tslint:disable-next-line: typedef
  get BasicInfo(){
    return this.addProperty.controls.BasicInfo as FormGroup;
  }

  // tslint:disable-next-line: typedef
  get PriceInfo() {
    return this.addProperty.controls.PriceInfo as FormGroup;
  }
  // tslint:disable-next-line: typedef
  get AddressInfo() {
    return this.addProperty.controls.AddressInfo as FormGroup;
  }

  // tslint:disable-next-line: typedef
  get OtherInfo() {
    return this.addProperty.controls.OtherInfo as FormGroup;
  }

  // #endregion

  //#region <Form Controls>
  // tslint:disable-next-line: typedef
  get SellRenty() {
    return this.BasicInfo.controls.SellRent as FormControl;
  }
  // tslint:disable-next-line: typedef
  get Price() {
    return this.PriceInfo.controls.Price as FormControl;
  }
  // tslint:disable-next-line: typedef
  get BHK() {
    return this.BasicInfo.controls.BHK as FormControl;
  }

  // tslint:disable-next-line: typedef
  get PType() {
    return this.BasicInfo.controls.PType as FormControl;
  }

  get FType() {
    return this.BasicInfo.controls.FType as FormControl;
  }

  get Name() {
    return this.BasicInfo.controls.Name as FormControl;
  }

  // tslint:disable-next-line: typedef
  get City() {
    return this.BasicInfo.controls.City as FormControl;
  }
  get BuiltArea() {
    return this.PriceInfo.controls.BuiltArea as FormControl;
  }

  get CarpetArea() {
    return this.PriceInfo.controls.CarpetArea as FormControl;
  }

  get Security() {
    return this.PriceInfo.controls.Security as FormControl;
  }

  get Maintenance() {
    return this.PriceInfo.controls.Maintenance as FormControl;
  }

  get FloorNo() {
    return this.AddressInfo.controls.FloorNo as FormControl;
  }

  get TotalFloor() {
    return this.AddressInfo.controls.TotalFloor as FormControl;
  }

  get Address() {
    return this.AddressInfo.controls.Address as FormControl;
  }
  get LandMark() {
    return this.AddressInfo.controls.LandMark as FormControl;
  }

  get RTM() {
    return this.OtherInfo.controls.RTM as FormControl;
  }

  get PossessionOn() {
    return this.OtherInfo.controls.PossessionOn as FormControl;
  }

  get AOP() {
    return this.OtherInfo.controls.AOP as FormControl;
  }

  get Gated() {
    return this.OtherInfo.controls.Gated as FormControl;
  }
  get MainEntrance() {
    return this.OtherInfo.controls.MainEntrance as FormControl;
  }

  get Description() {
    return this.OtherInfo.controls.Description as FormControl;
  }

//#endregion
//#endregion

  // tslint:disable-next-line: typedef
  onBack(){
    this.router.navigate(['/']);
  }

  // tslint:disable-next-line: typedef
  onSubmit(){
    this.nextClicked = true;
    if (this.allTabsValid()) {
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertify.success('Property Added Successfully');
      console.log(this.addProperty);
      console.log('SellRent=' + this.addProperty.value.BasicInfo.SellRent);
      if (this.SellRenty.value === '2') {
        this.router.navigate(['/rent-property']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.alertify.error('Review needed');
    }


  }

  mapProperty(): void {
    this.property.id = this.housingService.newPropId();
    this.property.sellRent = +this.SellRent.valueOf;
    this.property.bhk = this.BHK.value;
    this.property.propertyType = this.PType.value;
    this.property.name = this.Name.value;
    this.property.city = this.City.value;
    this.property.furnishingType = this.FType.value;
    this.property.price = this.Price.value;
    this.property.security = this.Security.value;
    this.property.maintenance = this.Maintenance.value;
    this.property.builtArea = this.BuiltArea.value;
    this.property.carpetArea = this.CarpetArea.value;
    this.property.floorNo = this.FloorNo.value;
    this.property.totalFloors = this.TotalFloor.value;
    this.property.address = this.Address.value;
    this.property.address2 = this.LandMark.value;
    this.property.readyToMove = this.RTM.value;
    this.property.age = this.AOP.value;
    this.property.gated = this.Gated.value;
    this.property.mainEntrance = this.MainEntrance.value;
    this.property.estPossessionOn = this.PossessionOn.value;
    this.property.description = this.Description.value;
   
  }

  // tab validation
  allTabsValid(): boolean {
    if (this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }

    if (this.PriceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }

    if (this.AddressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }

    if (this.OtherInfo.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }
  // tslint:disable-next-line: typedef
  selectTab(tabId: number, isCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (isCurrentTabValid){
      this.formTabs.tabs[tabId].active = true;
    }

  }

}
