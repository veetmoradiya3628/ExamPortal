import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = null;

  constructor(private loginService: LoginService) {}
  
  ngOnInit(): void {
    this.user = this.loginService.getUser();
    console.log(`current user: ${this.user}`); 

    // if you want to load from server

    // this.loginService.getCurrentUser().subscribe(
    //   (user: any) => {
    //     this.user = user;
    //   },
    //   (error: any) => {
    //     alert('error');
    //   }
    // )
  }

}
