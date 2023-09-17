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
  public getUsersOfOrganizationByRolename(orgId: string, roleName: string): Observable<any>{
    const url = this.BASE_URL +'/organization/'+orgId+'/users?role='+roleName;
    return this.http.get(url);
  }

}
