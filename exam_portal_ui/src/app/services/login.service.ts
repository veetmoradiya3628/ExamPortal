import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  // current User
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  // generate token
  public generateToken(loginData: any){
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  // login user: set token in localStorage
  public loginUser(token: string): boolean {
    console.log('Setting up a login token!!');
    localStorage.setItem('token', token);
    return true;
  }

  // isLogin: user is logged in or not
  public isLoggedIn() : boolean{
    let tokenStr = localStorage.getItem('token');
    console.log('Token', tokenStr);
    
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  // logout : remove token from localStorage
  public logout(): boolean {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // get token
  public getToken(){
    return localStorage.getItem('token');
  }

  // set userDetails
  public setUser(User: any){
    localStorage.setItem('user', JSON.stringify(User));
  }

  // get User
  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  // get User role
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
