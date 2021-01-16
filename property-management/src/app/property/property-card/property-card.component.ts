import {Component, Input} from '@angular/core';
import { IProperty } from '../IProperty.interface';
@Component({
  selector: 'app-property-card',
  // template: '<h1>Card component</h1>'
  templateUrl: 'property-card.component.html',
  styleUrls: ['property-card.component.css']
})

export class PropertyCardComponent {
@Input() property: IProperty;

}
