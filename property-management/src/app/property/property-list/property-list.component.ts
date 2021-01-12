import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  properties: Array<any>=[
    {
    "Id": 1,
    "Name": "Limo's House",
    "Type": "House",
    "Price": 120000
  },
  {
    "Id": 2,
    "Name": "Carol's House",
    "Type": "House",
    "Price": 120000
  },
  {
    "Id": 3,
    "Name": "Sheryl's House",
    "Type": "House",
    "Price": 120000
  },
  {
    "Id": 4,
    "Name": "Kemboi's House",
    "Type": "House",
    "Price": 120000
  },
  {
    "Id": 5,
    "Name": "Lee's House",
    "Type": "House",
    "Price": 120000
  },
  {
    "Id": 6,
    "Name": "Cheburet's House",
    "Type": "House",
    "Price": 120000
  }

]
  constructor() { }

  ngOnInit(): void {
  }

}
