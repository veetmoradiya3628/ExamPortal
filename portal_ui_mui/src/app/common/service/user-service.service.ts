import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public loginStatusSubject = new Subject<boolean>();

  constructor() { }

  public setLoginUserToken(token: string): boolean {
    localStorage.setItem('token', token);
    return true;
  }

  public setLoginUserDetails(user: any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public isLoggedIn(): boolean {
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }
    return true;
  }

  public logout(): boolean {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public getLoggedInUserId(){
    if(localStorage.getItem('user') !== null){
      let user = JSON.parse(localStorage.getItem('user') || '{}');
      if(user !== '{}'){
        return user.userId;
      }
    }
    return null;
  }
}
