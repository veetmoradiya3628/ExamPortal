import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsApiService {

  private BASE_URL = "http://localhost:5000";

  constructor(private http: HttpClient) { }

  // get admin stats response
  public getAdminStats(): Observable<any> {
    const url = this.BASE_URL + '/get_admin_stats';
    return this.http.get(url);
  }

  // get org admin stats response
  public getOrgAdminStats(reqObj: any): Observable<any> {
    const url = this.BASE_URL + '/get_org_stats';
    return this.http.post(url, reqObj);
  }

  // get teacher user stats response
  public getTeacherStats(reqObj: any): Observable<any> {
    const url = this.BASE_URL + '/get_user_stats';
    return this.http.post(url, reqObj);
  }
}
