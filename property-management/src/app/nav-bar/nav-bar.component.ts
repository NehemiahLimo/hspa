import { Component, OnInit } from '@angular/core';
import { AlertyfyService } from '../services/alertyfy.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedinUser: string;
  constructor(private alertify: AlertyfyService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  loggedin(){
    this.loggedinUser = localStorage.getItem('token');

    return this.loggedinUser;
  }

  onLogout(){
    localStorage.removeItem('token');
    this.alertify.success('You have logged out!');
  }

}
