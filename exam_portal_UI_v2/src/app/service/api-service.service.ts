import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Organization} from "../models/organization.model";
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private BASE_URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  // get all organizations
  public getOrganization(): Observable<Organization[]> {
    const url = this.BASE_URL + '/organization/';
    return this.http.get<Organization[]>(url);
  }

  // add Organization
  public addOrganization(data: Organization): Observable<Organization> {
    const url = this.BASE_URL + '/organization/';
    return this.http.post<Organization>(url, data);
  }

  // get all users
  public getUsers(): Observable<any> {
    const url = this.BASE_URL + '/user/';
    return this.http.get<any>(url);
  }

  // delete organization
  public deleteOrganization(id: string) : Observable<any>{
    const url = this.BASE_URL + '/organization/' + id;
    return this.http.delete(url);
  }

  // get organization by id
  public getOrganizationById(id: string): Observable<any> {
    const url = this.BASE_URL + '/organization/' + id;
    return this.http.get(url);
  }

  // update organization by id
  public updateOrganizationById(id: string | undefined, orgData: Organization): Observable<any> {
    const url = this.BASE_URL + '/organization/' + id;
    return this.http.put(url, orgData);
  }

  // update user status
  public updateUserStatus(id: string, status: boolean) {
    const url = this.BASE_URL + '/user/' + id +'/'+ status;
    return this.http.post(url, null);
  }

  // delete user by userid
  public deleteUserById(id: string) {
    const url = this.BASE_URL + '/user/' + id;
    return this.http.delete(url);
  }

  // get User by id
  public getUserByuserId(id: string): Observable<any> {
    const url = this.BASE_URL + '/user/getUserById/' + id;
    return this.http.get(url);
  }

  // add User
  public addUser(userData: IUser): Observable<any> {
    const url = this.BASE_URL + '/user/';
    return this.http.post(url, userData);
  }

  // update User
  public updateUser(userData: any, userId: string): Observable<any> {
    const url = this.BASE_URL + '/user/' + userId;
    return this.http.put(url, userData);
  }
}
