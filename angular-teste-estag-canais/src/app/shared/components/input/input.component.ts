import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() title: string = 'Email'
  @Input() type: string = 'text'
  @Input() placeholder: string = 'Email'
  @Input() image: string = '../../../assets/image/email.png'
  currentText!: string
  @Output() text = new EventEmitter()

  constructor() { }

  emitText(){
    this.text.emit(this.currentText)
  }
}
