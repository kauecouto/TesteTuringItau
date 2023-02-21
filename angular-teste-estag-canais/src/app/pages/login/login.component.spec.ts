import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, throwError } from 'rxjs';

import { AppRoutingModule } from './../../app-routing.module';
import { AuthenticationService } from './../../services/authentication.service';
import { SharedModule } from './../../shared/shared.module';
import { LoginComponent } from './login.component';

class MockAuthenticationService{
  validateUser(): Observable<any> {return of(null)}
  setUser() {return null}
}

const routes: Routes = [
  {path: 'home', component: LoginComponent}
]

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationService: AuthenticationService
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[
        CommonModule,
        SharedModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
    authenticationService = TestBed.inject(AuthenticationService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Dado que o método "validateUser" do service "authentication" foi chamado com os dados esperados.
      Deve se foi direcionado para a rota '/home' `, () => {
    spyOn(router, 'navigateByUrl');
    spyOn(localStorage, 'setItem');
    spyOn( authenticationService, 'validateUser').and.returnValue(of(
    {
      id: "",
      name: "teste",
      email: "",
      password: "",
      agency: "",
      account: "",
      saldo: 0,
      transfers: []
  }));
  component.validateUser()

  expect(authenticationService.validateUser).toHaveBeenCalled()
  expect(localStorage.setItem).toHaveBeenCalledWith('isLoggedin', 'true')
  expect(localStorage.setItem).toHaveBeenCalledWith('UserID', '')
  expect(router.navigateByUrl).toHaveBeenCalledWith('/home')
  })

  it(`Dado a chamada do método "validateUser" do service "authentication"
      em caso de Erro deve setar a variável "isValid" como false`, () => {
    const errorResponse = {
      status: 400,
      massage: 'falha ao realizar chamada'
    }
    spyOn(authenticationService, 'validateUser').and.returnValue(throwError(of(errorResponse)));

    component.validateUser();
    fixture.detectChanges();
    expect(component.isValid).toEqual(false)
   })

  it(`Dado a chamada do método "setEmail",
      deve setar o valor na variável "email" do "form"`, () => {
        spyOn(component, 'setEmail').and.callThrough();
        component.setEmail('teste@example.com')

        expect(component.form.controls.email.value).toEqual('teste@example.com')
  })

  it(`Dado a chamada do método "setPassword",
      deve setar o valor na variável "password" do "form"`, () => {
        spyOn(component, 'setPassword').and.callThrough();
        component.setPassword('Senha@123')

        expect(component.form.controls.password.value).toEqual('Senha@123')
  })
});
