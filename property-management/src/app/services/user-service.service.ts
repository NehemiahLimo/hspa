import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

constructor() { }

// tslint:disable-next-line: typedef
addUser(user: User){
  let users = [];
  if (localStorage.getItem('User')){
    users = JSON.parse(localStorage.getItem('User'));
    users = [user, ...users];
  }
  else{
    users = [user];
  }
  localStorage.setItem('User', JSON.stringify(users));

}

}
