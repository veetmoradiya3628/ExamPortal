import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-org-admin-sidebar',
  templateUrl: './org-admin-sidebar.component.html',
  styleUrls: ['./org-admin-sidebar.component.scss']
})
export class OrgAdminSidebarComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) { }

  logoutOrgAdmin(){
    console.log('Organization Admin logout called!!!')
  }
}
