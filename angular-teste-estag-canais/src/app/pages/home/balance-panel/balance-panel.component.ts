import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-balance-panel',
  templateUrl: './balance-panel.component.html',
  styleUrls: ['./balance-panel.component.scss']
})
export class BalancePanelComponent {
  @Input() saldo!: number
  @Output() extract = new EventEmitter()
  hiddenBalance: boolean = true

  controlHiddenBalance(){
    this.hiddenBalance = !this.hiddenBalance
  }

  controlExtract(){
    this.extract.emit()
  }
}
