import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit{
  categories: any = [];
 
  constructor(private _categoryService: CategoryService, private _utilsService: UtilsService){}
 
  ngOnInit(): void {
    this._categoryService.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error: any) => {
        this._utilsService.showSnackBar('Error occured while Loading category!!','');
      }
    )
  }

  logout(){}

}
