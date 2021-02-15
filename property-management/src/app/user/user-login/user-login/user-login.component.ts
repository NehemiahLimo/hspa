import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
// import { Alertyfy } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';
import { AlertyfyService } from 'src/app/services/alertyfy.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private alertify: AlertyfyService,
              private router: Router) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }
  // tslint:disable-next-line: typedef
  onLogin(loginForm: NgForm) {
    console.log(loginForm.value);
    const token = this.authService.authUser(loginForm.value);
    if (token) {
      //console.log('success');
      localStorage.setItem('token', token.userName);
      this.alertify.success('Login Successful');
      this.router.navigate(['/']);
    } else {
      //console.log('fail');
      this.alertify.error('User id or password is wrong');
    }
  }

}
