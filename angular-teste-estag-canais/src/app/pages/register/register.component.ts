import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isValid: boolean = true
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%. _*?&])[A-Za-z\d@$!%. _*?&]{8,}$/
  form = this.formBuilder.group({
    name: ['',[Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.pattern(this.passwordRegex)]]
  })

  constructor(
    private route: Router,
    private authService: AuthenticationService,
    private formBuilder: NonNullableFormBuilder
    ){}

  createUser(){
    this.authService.createUser(this.form.value).subscribe({
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

  setName(name: string){
    this.form.controls.name.setValue(name)
  }

  setEmail(email: string){
    this.form.controls.email.setValue(email)

  }

  setPassword(password: string){
    this.form.controls.password.setValue(password)
  }
}
