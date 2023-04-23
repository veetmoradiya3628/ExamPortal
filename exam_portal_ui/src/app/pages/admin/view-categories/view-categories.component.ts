import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
  categories: any = []
 
  constructor(private _categoryService: CategoryService, private _utilsService: UtilsService){}

  ngOnInit(): void {
    this._categoryService.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error: any) => {
        this._utilsService.showSnackBar('Error occured while fetching category!!','');
      }
    )
  }

}
