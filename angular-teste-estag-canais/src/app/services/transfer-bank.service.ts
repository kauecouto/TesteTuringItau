import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';

import { TransferBank } from './../models/transferBank';

@Injectable({
  providedIn: 'root'
})
export class TransferBankService {
  API: string = 'http://localhost:3333'
  constructor(private http: HttpClient){}

  transferBank(dateTransfer: TransferBank){
    return this.http.post(`${this.API}/transfer`,dateTransfer).pipe(first())
  }

}
