import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Organization} from "../models/organization.model";
import { IUser } from '../models/user.model';
import { Classes } from '../models/classes.model';
import { Posts } from '../models/posts.model';

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

  // get all classes
  public getAllClassesForOrganization(orgId: string): Observable<any> {
    const url = this.BASE_URL + '/api/classroom/' + orgId;
    return this.http.get(url);
  }

  // create class
  public createClass(newClass: Classes) : Observable<any> {
    const url = this.BASE_URL + '/api/classroom/';
    return this.http.post(url, newClass);
  }

  // get classroom details by classId
  public getClassroomDetailsById(classId: string) : Observable<any> {
    const url = this.BASE_URL + "/api/classroom/classDetailsById/" + classId;
    return this.http.get(url);
  }

  // add post in classroom
  public addPost(postData: Posts) : Observable<any> {
    const url = this.BASE_URL + '/api/posts/';
    return this.http.post(url, postData);
  }

  // get posts for classroom
  public getPostForClassroom(classId: string): Observable<any> {
    // localhost:8080/api/posts/classroom/66c641aa-0234-4dbb-8ce3-4b63f4910ac0
    const url = this.BASE_URL + '/api/posts/classroom/'+classId;
    return this.http.get(url);
  }

  // delete post by postId
  public deletePostById(postId: string): Observable<any> {
    const url = this.BASE_URL + '/api/posts/' + postId;
    return this.http.delete(url);
  }

  // get user for organization for specific role
  public getUsersOfOrganizationByRolename(orgId: string, roleName: string): Observable<any>{
    const url = this.BASE_URL +'/organization/'+orgId+'/users?role='+roleName;
    return this.http.get(url);
  }

  // get user for classroom with specific role
  public getUsersOfClassroomWithRole(orgId: string, roleName: string) : Observable<any> {
    const url = this.BASE_URL + '/api/classroom/'+orgId+'/users?role='+roleName;
    return this.http.get(url);
  }

  // add user mapping to the classroom for organization
  public mapUserToClassroom(reqObjet: any) : Observable<any> {
    const url = this.BASE_URL + '/api/classroom/addUserToClassroom';
    return this.http.post(url, reqObjet);
  }

  // delete user mapping to the classroom for organization
  public deleteUserToClassroom(classroomId: string, userId: string): Observable<any> {
    const url = this.BASE_URL + '/api/classroom/' + classroomId + '/user/'+ userId;
    return this.http.delete(url);
  }
}
