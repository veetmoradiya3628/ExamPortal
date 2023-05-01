import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;

  constructor(private fb: FormBuilder,  private utilsService: UtilsService, private loginService: LoginService, private router: Router){
   
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  onSubmitLoginForm(){
    console.log(this.loginForm);
    if(this.loginForm.controls['username'].invalid || this.loginForm.controls['password'].invalid){
      this.utilsService.showSnackBar('Invalid Input for username or password', 'ok');
      return;
    }

    this.loginService.generateToken(this.loginForm.value).subscribe(
      (data: any) => {
        console.log("success");
        console.log(data);

        // login ...
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe(
          (user: any) => {
            this.loginService.setUser(user);
            console.log(user);
            // redirect ... ADMIN: admin-dashboard, NORMAL: user-dashboard
            if(this.loginService.getUserRole() == 'ADMIN'){
              // window.location.href='admin';
              this.router.navigate(['admin']);
              this.loginService.loginStatusSubject.next(true);
            }else if(this.loginService.getUserRole() == 'NORMAL'){
              // window.location.href='user';
              this.router.navigate(['user/0']);
              this.loginService.loginStatusSubject.next(true);
            }else{
              this.loginService.logout();
            }
          },
          (error: any) => {
            console.log('error occured while login setup');
          }
        )

      },
      (error: any) => {
        console.log("error"+error);
        this.utilsService.showSnackBar('Invalid Cred!!, try again', 'Ok');
      }
    )
  } 
  
}
