import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralServiceService } from '../service/general-service.service';
import { UserServiceService } from '../service/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm !: FormGroup;

  constructor(private fb: FormBuilder, 
    private _generalService: GeneralServiceService,
    private _userService: UserServiceService, 
    private router: Router) { }

  ngOnInit(): void {
    if(this._userService.isLoggedIn()){
      if (this._userService.getUserRole() == 'MASTER_ADMIN') {
        this.router.navigate(['admin']);
        this._userService.loginStatusSubject.next(true);
      } else if (this._userService.getUserRole() == 'ORG_ADMIN') {
        this.router.navigate(['org-admin']);
        this._userService.loginStatusSubject.next(true);
      } else if (this._userService.getUserRole() == 'TEACHER') {
        this.router.navigate(['teacher']);
        this._userService.loginStatusSubject.next(true);
      } else if (this._userService.getUserRole() == 'STUDENT') {
        this.router.navigate(['student']);
        this._userService.loginStatusSubject.next(true);
      }
    }
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  onSubmitLoginForm() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this._generalService.login(this.loginForm.value).subscribe(
        (res: any) => {
          console.log(res)
          this._userService.setLoginUserToken(res.token);
          this._userService.setLoginUserDetails(res.userDetails);
          if (this._userService.getUserRole() == 'MASTER_ADMIN') {
            this.router.navigate(['admin']);
            this._userService.loginStatusSubject.next(true);
          } else if (this._userService.getUserRole() == 'ORG_ADMIN') {
            this.router.navigate(['org-admin']);
            this._userService.loginStatusSubject.next(true);
          } else if (this._userService.getUserRole() == 'TEACHER') {
            this.router.navigate(['teacher']);
            this._userService.loginStatusSubject.next(true);
          } else if (this._userService.getUserRole() == 'STUDENT') {
            this.router.navigate(['student']);
            this._userService.loginStatusSubject.next(true);
          } else {
            this._userService.logout();
          }
          this._generalService.openSnackBar('LoggedIn Successfully!!', 'Ok')
        },
        (error: any) => {
          this._generalService.openSnackBar('Error occured while trying loggedIn', 'Ok')
          console.log(`error occured while logging`)
        }
      )
    } else {
      this._generalService.openSnackBar('Invalid login form', 'Ok')
      console.log(`invalid login form`)
      return
    }
  }
}
