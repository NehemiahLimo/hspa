import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  public propertyId: number;
  property = new Property();
  constructor(private route: ActivatedRoute, private router: Router, private housingService: HousingService) { }

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: Property) =>{
        this.property = data['prp'];
      }
    );


    // this.route.params.subscribe(
    //   (params) =>{
    //     this.propertyId = +params['id'];
    //     this.housingService.getProperty(this.propertyId).subscribe((data: Property)=>{
    //       this.property = data;
    //     }, error => this.router.navigate(['/'])
    //     );
    //   }
    // );

    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 3,
        imageAnimation: NgxGalleryAnimation.Slide
      },

    ];

    this.galleryImages = [
      {
        small: 'assets/images/mode2.png',
        medium: 'assets/images/mode2.png',
        big: 'assets/images/mode2.png'
      },
      {
        small: 'assets/images/mode3.png',
        medium: 'assets/images/mode3.png',
        big: 'assets/images/mode3.png'
      },
      {
        small: 'assets/images/mode5.png',
        medium: 'assets/images/mode5.png',
        big: 'assets/images/mode5.png'
      }
    ];
  }

}
