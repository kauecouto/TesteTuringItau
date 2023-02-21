import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComponent ],
      imports:[
        CommonModule,
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Dado á chamada do método "emitText",
      deve emitir o evento da variável "text"`, () => {
      spyOn(component.text, 'emit');
      component.currentText = 'teste'
      component.emitText()
      expect(component.text.emit).toHaveBeenCalledWith('teste')
  })
});
