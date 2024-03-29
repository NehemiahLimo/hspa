import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { UserForRegister } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
// import * as alertyfy from 'alertifyjs';
import { AlertyfyService } from 'src/app/services/alertyfy.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
registrationForm: FormGroup;
user: UserForRegister ;
userSubmitted: boolean ;
  constructor(private fb: FormBuilder, private authService: AuthService, private alertyfy: AlertyfyService) { }

  ngOnInit() {
    // this.registrationForm = new FormGroup({
    //   userName: new FormControl(null, Validators.required),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, [Validators.required, Validators.minLength(9)]),
    //   confirmPassword: new FormControl(null, Validators.required),
    //   mobile: new FormControl(null, [Validators.required, Validators.maxLength(10)])
    // }, this.passValidator);
    this.createRegiatrationForm();
  }

  // tslint:disable-next-line: typedef
  createRegiatrationForm(){
    this.registrationForm = this.fb.group({
      userName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(9)]),
      confirmPassword: new FormControl(null, Validators.required),
      mobile: new FormControl(null, [Validators.required, Validators.maxLength(10)])
    }, {validator: this.passValidator});
  }

  get userName(){
    return this.registrationForm.get('userName') as FormControl;
  }
  get email(){
    return this.registrationForm.get('email') as FormControl;
  }

  get password(){
    return this.registrationForm.get('password') as FormControl;
  }
  get confirmPassword(){
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  get mobile(){
    return this.registrationForm.get('mobile') as FormControl;
  }

  onSubmit(){
    this.userSubmitted = true;
    console.log(this.registrationForm);
    if (this.registrationForm.valid){
     // this.user = Object.assign(this.user, this.registrationForm.value);
      this.authService.registerUser(this.userData()).subscribe(()=>{
      this.registrationForm.reset();
      this.userSubmitted =  false;
      this.alertyfy.success('Submitted Successfully');

      });

      
      //alertify.success('Submitted Successfully');
    }else{
      this.alertyfy.error('There were errors in submitting your data');
    }

  }

  userData(): UserForRegister{
    return this.user = {
      userName : this.userName.value,
      email : this.email.value,
      password: this.password.value,
      mobile : this.mobile.value

    };

  }


  passValidator(fg: FormGroup): Validators{
    return fg.get('password').value ===  fg.get('confirmPassword').value ? null : {notmatched: true};

  }

}
