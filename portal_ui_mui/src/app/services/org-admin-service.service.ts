import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classes } from '../models/classes.model';

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

  // get user for classroom with specific role
  public getUsersOfClassroomWithRole(orgId: string, roleName: string): Observable<any> {
    const url = this.BASE_URL + '/api/classroom/' + orgId + '/users?role=' + roleName;
    return this.http.get(url);
  }

  // get user not mapped to classroom with specific role
  public getUsersOfClassroomNotMappedToClassroomWithRole(orgId: string, roleName: string) : Observable<any> {
    const url = this.BASE_URL + '/api/classroom/' + orgId + '/notMappedUsers?role=' + roleName;
    return this.http.get(url);
  }

  // create class
  public createClass(newClass: Classes) : Observable<any> {
    const url = this.BASE_URL + '/api/classroom/';
    return this.http.post(url, newClass);
  }

  // map user to classroom
  public mapUserToClassroom(reqObj : any): Observable<any> {
    const url = this.BASE_URL + '/api/classroom/addUserToClassroom';
    return this.http.post(url, reqObj);
  }

  // unmap user to classroom
  public unmapUserToClassroom(classroomId: string, userId: string): Observable<any>{ 
    const url = this.BASE_URL + '/api/classroom/' + classroomId + '/user/' + userId;
    return this.http.delete(url);
  }

}
