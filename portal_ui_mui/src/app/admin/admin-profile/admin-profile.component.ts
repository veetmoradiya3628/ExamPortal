import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralServiceService } from 'src/app/common/service/general-service.service';
import { UserServiceService } from 'src/app/common/service/user-service.service';
import { ResetPassword } from 'src/app/models/reset_password.model';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  public user_details: any;
  public userId!: string;
  public updateUserPasswordForm!: FormGroup;

  constructor(private _adminApiService: AdminServiceService,
    private _userService: UserServiceService,
    private _generalService: GeneralServiceService) { }

  ngOnInit(): void {
    this.userId = this._userService.getLoggedInUserId();
    this.loadUserDetails();
    this.updateUserPasswordForm = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    })
  }

  loadUserDetails() {
    this._adminApiService.getUserDetails(this.userId).subscribe(
      (res: any) => {
        this.user_details = res;
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  updateUserPassword() {
    if (this.updateUserPasswordForm.valid) {
      const requestObj = this.updateUserPasswordForm.value as ResetPassword;
      if (requestObj.newPassword !== requestObj.confirmPassword) {
        this._generalService.openSnackBar('New Password and Confirm password should match!!', 'Ok')
        return;
      }
      this._generalService.resetUserPassword(this.userId, requestObj).subscribe(
        (res: any) => {
          console.log(res);
          this._generalService.openSnackBar(res.message, 'Ok');
          this.updateUserPasswordForm.reset();
        },
        (error: any) => {
          console.log(error)
          this._generalService.openSnackBar(error.message, 'Ok')
        }
      )
    }else{
      this._generalService.openSnackBar('Invalid reset password form!!', 'Ok')
      return;
    }
  }
}
