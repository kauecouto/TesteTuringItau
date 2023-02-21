import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable } from 'rxjs';

import { User } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  API: string = 'http://localhost:3333'

  private userData = new BehaviorSubject<User>({
    id: "",
    name: "",
    email: "",
    password: "",
    agency: "",
    account: "",
    saldo: 0,
    transfers: []
  });

  constructor( private http: HttpClient ) { }

    setUser(user: User): void {
      this.userData.next(user);
    }

    getUser(): User {
      return this.userData.value;
    }

    validateUser(user: Partial<User>): Observable<User>{
      return this.http.post<User>(`${this.API}/auth`,user).pipe(first())
    }

    createUser(user: Partial<User>){
      return this.http.post<User>(`${this.API}/register`,user).pipe(first())
    }

    getUserByID(id: string): Observable<User>{
      return this.http.get<User>(`${this.API}/user/${Number(id) - 1}`).pipe(first())
    }
}
