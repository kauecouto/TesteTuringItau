import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transfer-panel',
  templateUrl: './transfer-panel.component.html',
  styleUrls: ['./transfer-panel.component.scss']
})
export class TransferPanelComponent {
  @Output() typeTransfer: EventEmitter<string> = new EventEmitter()

  controlModal(type: string){
    this.typeTransfer.emit(type)
  }
}
