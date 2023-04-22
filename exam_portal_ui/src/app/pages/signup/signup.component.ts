import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userRegistrationFrom!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.userRegistrationFrom = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      phone: ["", Validators.required],
    })
  }

  clearForm(){
    this.userRegistrationFrom.reset;
  }

  onSubmitForm() {
    console.log(this.userRegistrationFrom.value);
    if(this.userRegistrationFrom.invalid){
      this.utilsService.showSnackBar('Invalid form data input', 'Ok');
      return;
    }
    if (this.userRegistrationFrom.valid) {
      this.userService.addUser(this.userRegistrationFrom.value).subscribe(
        (data) => {
          console.log(data);
          this.utilsService.showSnackBar('User registered successfully', 'Ok');
        },
        (error) => {
          console.log(error);
          this.utilsService.showSnackBar('Error occured while registering user'+error, 'Ok');
        }
      )
    }
  }
}
