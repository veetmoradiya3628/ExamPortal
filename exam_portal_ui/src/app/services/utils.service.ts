import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private _snack: MatSnackBar) { }

  showSnackBar(message: string, text: string){
    this._snack.open(message, text, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'end'
    });  
  }
}
