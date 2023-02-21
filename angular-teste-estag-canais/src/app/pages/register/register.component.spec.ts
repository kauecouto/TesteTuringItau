import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { Observable, of, throwError } from 'rxjs';

import { AppRoutingModule } from './../../app-routing.module';
import { AuthenticationService } from './../../services/authentication.service';
import { InputComponent } from './../../shared/components/input/input.component';
import { RegisterComponent } from './register.component';

class MockAuthenticationService {
  createUser(): Observable<any> {return of(null)}
  setUser() {return null}
}

const dataUserMock = {
  name: '',
  email: '',
  password: ''
}

const routes: Routes = [
  {path: 'home', component: RegisterComponent}
]

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authenticationService: AuthenticationService
  let router: Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent , MockComponent(InputComponent) ],
      imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AppRoutingModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers:[
        {provide: AuthenticationService , useClass: MockAuthenticationService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.inject(AuthenticationService)
    router = TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Dado que o método "createUser" do service "authentication" foi chamado com os dados esperados.
      Deve se foi direcionado para a rota '/home' `, () => {
    spyOn(router, 'navigateByUrl');
    spyOn(localStorage, 'setItem');
    spyOn( authenticationService, 'createUser').and.returnValue(of(
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
  component.createUser()

  expect(authenticationService.createUser).toHaveBeenCalled()
  expect(localStorage.setItem).toHaveBeenCalledWith('isLoggedin', 'true')
  expect(localStorage.setItem).toHaveBeenCalledWith('UserID', '')
  expect(router.navigateByUrl).toHaveBeenCalledWith('/home')
  })

  it(`Dado a chamada do método "createUser" do service "authentication"
      em caso de Erro deve setar a variável "isValid" como false`, () => {
    const errorResponse = {
      status: 400,
      massage: 'falha ao realizar chamada'
    }
    spyOn(authenticationService, 'createUser').and.returnValue(throwError(of(errorResponse)));

    component.createUser();
    fixture.detectChanges();
    expect(component.isValid).toEqual(false)
   })

  it(`Dado a chamada do método "setName",
      deve setar o valor na variável "name" do "form"`, () => {
        spyOn(component, 'setName').and.callThrough();
        component.setName('Nome Sobrenome')

        expect(component.form.controls.name.value).toEqual('Nome Sobrenome')
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
