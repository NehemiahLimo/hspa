import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserForLogin, UserForRegister } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) { }
baseUrl = environment.baseUrl;
// tslint:disable-next-line: typedef
authUser(user: UserForLogin) {
  let UserArray = [];
  return this.http.post(this.baseUrl+'/account/login', user);
  // if (localStorage.getItem('User')) {
  //   UserArray = JSON.parse(localStorage.getItem('User'));
  // }
  // return UserArray.find(p => p.userName === user.userName && p.password === user.password);
}

registerUser(user: UserForRegister){
return this.http.post(this.baseUrl+'/account/register',user);
}

}
