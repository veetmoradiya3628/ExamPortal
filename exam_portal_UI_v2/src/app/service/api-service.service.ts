import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private BASE_URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  // get all organizations
  public getOrganization(): Observable<any> {
    const url = this.BASE_URL + '/organization/';
    return this.http.get<any>(url);
  }

  // get all users
  public getUsers(): Observable<any> {
    const url = this.BASE_URL + '/user/';
    return this.http.get<any>(url);
  }
}
