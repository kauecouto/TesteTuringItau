import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AuthenticationService } from './authentication.service';

const dataUser = {
  id: "",
  name: "teste",
  email: "",
  password: "",
  agency: "",
  account: "",
  saldo: 0,
  transfers: []
}

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let http: HttpClient
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AuthenticationService);
    http = TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve adicionar os dados do usuário á variável "userData".', () => {
    const spy = spyOn(service,'setUser').and.callThrough()

    service.setUser(dataUser)
    const result = service.getUser()

    expect(spy).toHaveBeenCalledWith(dataUser)
    expect(result).toEqual(dataUser)
  })

  it('Deve fazer um POST no endpoint correto e passar os dados esperados.', () => {
    const spy = spyOn(http, 'post').and.callThrough();
    const data = {
      email: '',
      passoword: ''
    }
    service.validateUser(data)
    expect(spy).toHaveBeenCalledWith('http://localhost:3333/auth', data)
  })

  it('Deve fazer um POST no endpoint correto e passar os dados esperados.', () => {
    const spy = spyOn(http, 'post').and.callThrough();
    const data = {
      name: '',
      email: '',
      passoword: ''
    }
    service.createUser(data)
    expect(spy).toHaveBeenCalledWith('http://localhost:3333/register', data)
  })

  it('Deve fazer um no GET no endpoint correto e retornar os dados.', () => {
    const spy = spyOn(http, 'get').and.returnValues(of(dataUser))

    service.getUserByID('1').subscribe(res => {
      expect(res).toEqual(dataUser)
    })

    expect(spy).toHaveBeenCalledWith('http://localhost:3333/user/0')
  })
});
