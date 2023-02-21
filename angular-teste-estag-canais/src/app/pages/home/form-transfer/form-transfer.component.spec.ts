import { CommonModule } from '@angular/common';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, of, throwError } from 'rxjs';

import { TransferBankService } from './../../../services/transfer-bank.service';
import { SnackBarComponent } from './../../../shared/app-material/snack-bar/snack-bar.component';
import { FormTransferComponent } from './form-transfer.component';

class MockTransferBankService {
  transferBank(): Observable<any> { return of(null);}
}

const ValidForm = (component: any) => {
  component.form.controls.password.setValue('Senha@123')
  component.form.controls.value.setValue('5')
  component.form.controls.beneficiaryAgency.setValue('0000')
  component.form.controls.beneficiaryAccount.setValue('00000')
  component.form.controls.digito.setValue('0')
  component.form.controls.type.setValue('pix')
}

describe('FormTransferComponent', () => {
  let injector: TestBed;
  let component: FormTransferComponent;
  let fixture: ComponentFixture<FormTransferComponent>;
  let transferbankService : TransferBankService
  let snackBar: MatSnackBar
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ FormTransferComponent ],
      providers:[
        { provide: TransferBankService, useClass: MockTransferBankService  }
      ]
    })
    .compileComponents();

    injector = getTestBed();
    fixture = TestBed.createComponent(FormTransferComponent);
    component = fixture.componentInstance;
    transferbankService = TestBed.inject(TransferBankService)
    snackBar = TestBed.inject(MatSnackBar)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Dado á chamada do método "ngOnInit",
      deve setar o valor da variável "form.controls.type".`, () => {
      spyOn(component.form.controls.type, 'setValue');
      component.typeTransfer = 'pix'
      component.ngOnInit()
      expect(component.form.controls.type.setValue).toHaveBeenCalledWith('pix')
  })

  it(`Dado á chamada do método "onCloseModal",
      deve emitir o evento da variável "closeModal".`, () => {
        spyOn(component.closeModal, 'emit');
        component.onCloseModal();
        expect(component.closeModal.emit).toHaveBeenCalled();
  })

  it(`Dado á chamada do método "onProgressTransfer",
      quando o "form" estiver válido,
      deve alterar o valor da variável "progressTransfer" para true.`, () => {
        component.saldo = 10
        ValidForm(component)

        component.onProgressTransfer()
        expect(component.progressTransfer).toEqual(true)
  })

  it(`Dado á chamada do método "onProgressTransfer",
      quando o "form" estiver inválido
      deve alterar o valor da variável "error" para true.`, () => {
        component.error = false
        component.onProgressTransfer()
        expect(component.error).toEqual(true)
  })

  it(`Dado á chamada do método "transferBank" do "transferService",
      quando for execultado com sucesso,
      deve acionar o metodo "onCloseModal" e chamar o metodo "openFromComponent".`, () =>{
        spyOn(transferbankService, 'transferBank').and.returnValue(of({message: 'sucesso!'}))
        spyOn(component ,'onCloseModal');
        spyOn(snackBar, 'openFromComponent');

        ValidForm(component)

        component.transferBank()

        expect(transferbankService.transferBank).toHaveBeenCalled()
        expect(component.onCloseModal).toHaveBeenCalled()
        expect(snackBar.openFromComponent).toHaveBeenCalledWith(SnackBarComponent, {
          data: {message: 'sucesso!'},
          duration: 10000,
          verticalPosition: 'top'
        })
  })

  it(`Dado á chamada do método "transferBank" do "transferService",
      quando for execultado com erro,
      deve acionar o metodo "onCloseModal" e chamar o metodo "openFromComponent".`, () => {
        const errorResponse = {
          error:{status: 400}
        }
        spyOn(transferbankService, 'transferBank').and.returnValue((throwError(errorResponse)))
        spyOn(component ,'onCloseModal');
        spyOn(snackBar, 'openFromComponent');

        ValidForm(component)
        component.transferBank()

        expect(transferbankService.transferBank).toHaveBeenCalled()
        expect(component.onCloseModal).toHaveBeenCalled()
        expect(snackBar.openFromComponent).toHaveBeenCalledWith(SnackBarComponent, {
          data: errorResponse.error,
          duration: 10000,
          verticalPosition: 'top'
        })
  })

  it(`Dado á chamada do método "formatCoin", deve fazer a formatação do valor.`, () => {
    component.form.controls.value.setValue('1000')
    component.formatCoin()
    expect(component.form.controls.value.value).toEqual('10,00')
  })

  it(`Dado á chamada do método "formatCoin",
      quando o valor tiver um tamanho maior que 6 caractéres,
      deve fazer a formatação do valor.`, () => {
    component.form.controls.value.setValue('100000')
    component.formatCoin()
    expect(component.form.controls.value.value).toEqual('1.000,00')
  })

  it(`Dado á chamada do método "checkSaldo",
      quando o valor do "Form.value" for maior que o valor da variável "saldo",
      deve retornar true.`, () => {
      component.form.controls.value.setValue('100')
      component.saldo = 10
      expect(component.checkSaldo()).toBe(true)
  })

  it(`Dado á chamada do método "checkSaldo",
      quando o valor do "Form.value" for menor que o valor da variável "saldo",
      deve retornar false.`, () => {
      component.form.controls.value.setValue('10')
      component.saldo = 100
      expect(component.checkSaldo()).toBe(false)
  })
});
