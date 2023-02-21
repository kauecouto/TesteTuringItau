import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferPanelComponent } from './transfer-panel.component';

describe('TransferPanelComponent', () => {
  let component: TransferPanelComponent;
  let fixture: ComponentFixture<TransferPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Dado á chamada do método "controlModal",
      deve emitir o evento da variável "typeTransfer".`, () => {
      spyOn(component.typeTransfer, 'emit');
      component.controlModal('pix')
      expect(component.typeTransfer.emit).toHaveBeenCalledWith('pix')
  })
});
