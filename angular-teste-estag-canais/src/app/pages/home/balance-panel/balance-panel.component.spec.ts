import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancePanelComponent } from './balance-panel.component';

describe('BalancePanelComponent', () => {
  let component: BalancePanelComponent;
  let fixture: ComponentFixture<BalancePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalancePanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalancePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Dado á chamada do método "controlHiddenBalance",
      deve alterar o valor da variavel "hiddenBalance".`, () => {
      spyOn(component, 'controlHiddenBalance').and.callThrough();
      component.controlHiddenBalance()
      expect(component.controlHiddenBalance).toHaveBeenCalled()
      expect(component.hiddenBalance).toEqual(false)
  })

  it(`Dado a chamada do método "controlExtract",
      deve ser emitido o evento da variavel "extract".`, () => {
      spyOn(component.extract,'emit');
      component.controlExtract()
      expect(component.extract.emit).toHaveBeenCalled()
  })

  
});
