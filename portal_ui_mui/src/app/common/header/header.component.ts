import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor(private _userService: UserServiceService) {
  }
  ngOnInit(): void {
    
  }
}
