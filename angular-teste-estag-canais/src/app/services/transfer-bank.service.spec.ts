import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TransferBankService } from './transfer-bank.service';

describe('TransferBankService', () => {
  let service: TransferBankService;
  let http: HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(TransferBankService);
    http = TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve fazer um POST no endpoint correto e passar os dados esperados. ', () => {
    const dataPost = {
      email: '',
      password: '',
      beneficiaryAgency: '',
      beneficiaryAccount: '',
      value: 0,
      type: ''
    }
    const spy = spyOn(http, 'post').and.callThrough();
    service.transferBank(dataPost);
    expect(spy).toHaveBeenCalledWith('http://localhost:3333/transfer',dataPost);
  });

});
