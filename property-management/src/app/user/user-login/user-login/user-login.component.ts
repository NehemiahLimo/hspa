import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
// import { Alertyfy } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';
import { AlertyfyService } from 'src/app/services/alertyfy.service';
import { UserForLogin } from 'src/app/model/user';
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
    this.authService.authUser(loginForm.value).subscribe((res:UserForLogin)=>{

      const user = res;
      localStorage.setItem('token', user.token);
      localStorage.setItem('userName', user.userName);
      this.alertify.success('Login Successful');
      this.router.navigate(['/']);
      console.log(res);
    }   
    );
   
  }

}
