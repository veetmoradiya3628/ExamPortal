import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrgAdminServiceService {
  private BASE_URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }


  // get all classes for organization
  public getAllClassesForOrganization(orgId: string): Observable<any> {
    const url = this.BASE_URL + '/api/classroom/' + orgId;
    return this.http.get(url);
  }

  // get user for organization for specific role
  public getUsersOfOrganizationByRolename(orgId: string, roleName: string): Observable<any> {
    const url = this.BASE_URL + '/organization/' + orgId + '/users?role=' + roleName;
    return this.http.get(url);
  }

  // get classroom details by classId
  public getClassroomDetailsById(classId: string): Observable<any> {
    const url = this.BASE_URL + "/api/classroom/classDetailsById/" + classId;
    return this.http.get(url);
  }

  // get posts for classroom
  public getPostForClassroom(classId: string): Observable<any> {
    // localhost:8080/api/posts/classroom/66c641aa-0234-4dbb-8ce3-4b63f4910ac0
    const url = this.BASE_URL + '/api/posts/classroom/' + classId;
    return this.http.get(url);
  }

}
