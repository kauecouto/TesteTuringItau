import { SnackBarComponent } from './../../../shared/app-material/snack-bar/snack-bar.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TransferBankService } from './../../../services/transfer-bank.service';

@Component({
  selector: 'app-form-transfer',
  templateUrl: './form-transfer.component.html',
  styleUrls: ['./form-transfer.component.scss']
})
export class FormTransferComponent implements OnInit {
  @Input() email!: string
  @Input() saldo!: number
  @Input() typeTransfer!: string
  @Output() closeModal : EventEmitter<boolean> = new EventEmitter()
  progressTransfer: boolean = false
  error: boolean = false
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%. _*?&])[A-Za-z\d@$!%. _*?&]{8,}$/
  form = this.formBuilder.group({
    password: ['',[Validators.required, Validators.pattern(this.passwordRegex)]],
    beneficiaryAgency: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    beneficiaryAccount: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    digito: ['',[Validators.required, Validators.minLength(1), Validators.maxLength(1)]],
    value: ['', [Validators.required]],
    type: ['',[Validators.required, Validators.min(3), Validators.max(3)]]
  })

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private transferService: TransferBankService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.form.controls.type.setValue(this.typeTransfer)
  }

  onCloseModal(){
    this.closeModal.emit(false)
  }

  onProgressTransfer(){
    if(this.form.controls.beneficiaryAgency.valid && this.form.controls.beneficiaryAccount.valid
      && this.form.controls.digito.valid && this.form.controls.value.valid && this.form.controls.type.valid && !this.checkSaldo()){
      this.progressTransfer = true
    }else{
      this.error = true
      alert('Preencha os campos corretamente.')
    }

  }

  transferBank(){
    if(this.form.valid){
      this.transferService.transferBank({
      "email": this.email,
      "password": this.form.controls.password.value,
      "beneficiaryAgency": this.form.controls.beneficiaryAgency.value,
      "beneficiaryAccount": `${this.form.controls.beneficiaryAccount.value}-${this.form.controls.digito.value}`,
      "value": Number(this.form.controls.value.value.replaceAll(".", "").replaceAll(",", ".")),
      "type": this.form.controls.type.value
    }).subscribe({
      next: res => {
        const result: any = res
        console.log(res)
        this.onCloseModal()
        this.snackBar.openFromComponent(SnackBarComponent, {
          data: result,
          duration: 10000,
          verticalPosition: 'top'
        });
      },
      error: err => {
        const result: any = err.error
        this.onCloseModal()
        this.snackBar.openFromComponent(SnackBarComponent, {
          data: result,
          duration: 10000,
          verticalPosition: 'top'
        });
        console.error(err.error)
      }
    })
    }
  }

  formatCoin() {
    let value = this.form.controls.value.value
    value = value + '';
    let valor: string | number = parseInt(value.replace(/[\D]+/g, ''));
    valor = valor + ''
    valor = valor.replace(/([0-9]{2})$/g, ",$1");

    if (valor.length > 6) {
        valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    this.form.controls.value.setValue(valor)
  }


  checkSaldo(){
    return Number(this.form.controls.value.value.replaceAll(".", "").replaceAll(",", ".")) > this.saldo ? true : false
  }
}
