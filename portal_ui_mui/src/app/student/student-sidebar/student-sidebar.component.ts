import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { DeleteModelServiceService } from 'src/app/common/delete-model-service.service';
import { UserServiceService } from 'src/app/common/service/user-service.service';

@Component({
  selector: 'app-student-sidebar',
  templateUrl: './student-sidebar.component.html',
  styleUrls: ['./student-sidebar.component.scss']
})
export class StudentSidebarComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private _userService: UserServiceService,
    private _confirmDialog: DeleteModelServiceService,
    private _router: Router) { }

  logoutStudent() {
    console.log('Student logout called!!!')
    this._confirmDialog.openConfirmationDialog('Are you sure want to logout ?').then((result) => {
      if (result) {
        this._userService.logout()
        this._router.navigateByUrl('/login')
      } else {
        // user cancel the action
        return;
      }
    })
  }
}
