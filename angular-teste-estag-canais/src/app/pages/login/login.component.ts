import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isValid: boolean = true
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%. _*?&])[A-Za-z\d@$!%. _*?&]{8,}$/
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.pattern(this.passwordRegex)]]
  })

  constructor(
    private route: Router,
    private authService: AuthenticationService,
    private formBuilder: NonNullableFormBuilder
    ){}

  validateUser(){
    this.authService.validateUser(this.form.value).subscribe({
      next:res => {
        this.authService.setUser(res)
        localStorage.setItem('isLoggedin', 'true')
        localStorage.setItem('UserID', res.id)
        this.route.navigateByUrl('/home')
      },
      error: err => {
        this.isValid = false
        console.error(err)
      }
  })
  }

  setEmail(email: any){
    this.form.controls.email.setValue(email)

  }

  setPassword(password: any){
    this.form.controls.password.setValue(password)
  }
}
