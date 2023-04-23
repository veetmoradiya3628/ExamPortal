import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  addCategoryForm!: FormGroup;
  
  constructor(private fb: FormBuilder, private _categoryService: CategoryService, private _utilsService: UtilsService) {}

  ngOnInit(): void {
    this.addCategoryForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required]
    })
  }

  onSubmitAddCategoryForm() {
    console.log(this.addCategoryForm.value);
    if(this.addCategoryForm.valid){
      this._categoryService.addCategory(this.addCategoryForm.value).subscribe(
        (data: any) => {
          console.log(`Response: ${data}`);
          this.addCategoryForm.reset();
          this._utilsService.showSnackBar('Category Added Successfully!!','Ok');
        },
        (error: any) => {
          this._utilsService.showSnackBar('Error occured while Adding category!!','');
        }
      )
    }
  }
}
