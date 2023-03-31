import { Component } from '@angular/core';
import {FormGroup , FormControl ,Validators} from '@angular/forms'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regiester',
  templateUrl: './regiester.component.html',
  styleUrls: ['./regiester.component.css']
})
export class RegiesterComponent {
  constructor(private _AuthService:AuthService , private _Router:Router)
  {

  }
  isLoading:boolean =false;
  apiError:string = '';
  registerForm:FormGroup = new FormGroup({
  name: new FormControl(null , [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
  email: new FormControl(null , [Validators.required, Validators.email]) ,
  password: new FormControl(null , [Validators.required ,Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
  rePassword: new FormControl(null , [Validators.required ,Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
  phone: new FormControl(null , [ Validators.required ,Validators.pattern(/^01[0125][0-9]{8}$/)])

});
handelRegister(registerForm:FormGroup)
{
  this.isLoading = true;
    if( registerForm.valid)
  {
    console.log(registerForm);
    this._AuthService.register(registerForm.value).subscribe({
      next:(response)=> {
        if(response.message=='success')
        {
            this.isLoading=false
            this._Router.navigate(['/login'])
        }
      },
      error:(err)=>{
        this.isLoading=false;
        this.apiError = err.error.errors.msg;
      }
    })
  }

}
}
