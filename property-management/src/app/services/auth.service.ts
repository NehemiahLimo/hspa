import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }

// tslint:disable-next-line: typedef
authUser(user: any) {
  let UserArray = [];
  if (localStorage.getItem('User')) {
    UserArray = JSON.parse(localStorage.getItem('User'));
  }
  return UserArray.find(p => p.userName === user.userName && p.password === user.password);
}

}
