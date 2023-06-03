import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit{

  users: Array<any> = new Array<any>();

  constructor(private apiService: ApiServiceService){}

  ngOnInit(): void {
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

}
