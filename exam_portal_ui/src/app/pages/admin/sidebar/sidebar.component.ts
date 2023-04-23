import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  
  constructor(private _loginService: LoginService, private _router: Router){}

  ngOnInit(): void {
  }
  logout(){
    this._loginService.logout();
    // window.location.reload();
    this._router.navigate(['login']);
  }
}
