import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit{

  users: Array<any> = new Array<any>();

  constructor(private apiService: ApiServiceService, private router: Router){}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(){
    this.apiService.getUsers().subscribe(
      (data: any) => {
        this.users = data;
        console.log(this.users);
      },
      (error: any) => {
        throw new Error("Error while loading users "+error)
      }
    )
  }

  onUserStatusUpdate(userId: string, status: boolean){
    console.log(userId, status);
    status = !status;
    this.apiService.updateUserStatus(userId, status).subscribe(
      (data: any) => {
        console.log(data);
        this.loadUserData();
      },
      (error: any) => {
        throw new Error("Error while updating user status ... ");
      }
    )
  }

  deleteUserById(userId: string) {
    this.apiService.deleteUserById(userId).subscribe(
      (res : any) => {
        this.loadUserData();
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  updateUser(userId: string) {
    this.router.navigate(['/admin/add-user'], {
      queryParams: {'userId': userId}
    });
  }

}
