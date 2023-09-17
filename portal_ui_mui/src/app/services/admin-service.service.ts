import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organization } from '../models/organization.model';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
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
  public getUsers(): Observable<IUser> {
    const url = this.BASE_URL + '/user/';
    return this.http.get<IUser>(url);
  }
}
