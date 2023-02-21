import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MockComponent } from 'ng-mocks';
import { Observable, of } from 'rxjs';
import { CardExtractComponent } from 'src/app/shared/components/card-extract/card-extract.component';

import { AuthenticationService } from './../../services/authentication.service';
import { BalancePanelComponent } from './balance-panel/balance-panel.component';
import { FormTransferComponent } from './form-transfer/form-transfer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home.component';
import { TransferPanelComponent } from './transfer-panel/transfer-panel.component';

class MockAuthenticationService {
  getUserByID(): Observable<any> {return of(null)}
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authenticationService: AuthenticationService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent , MockComponent(HeaderComponent), MockComponent(FormTransferComponent), MockComponent(BalancePanelComponent), MockComponent(CardExtractComponent), MockComponent(TransferPanelComponent) ],
      imports: [
        CommonModule,
        FormsModule,
        MatProgressSpinnerModule
      ],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.inject(AuthenticationService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Dado á chamada do método "ngOnInit",
      quando o valor da variável "id" for diferente de undefined,
      deve chamar a o método "getUserByID" do service "authentication" `, () => {
      spyOn(authenticationService,'getUserByID').and.callThrough();
      spyOn(localStorage, 'getItem').and.returnValue('1')
      component.ngOnInit()
      expect(localStorage.getItem).toHaveBeenCalledWith('UserID')
      expect(authenticationService.getUserByID).toHaveBeenCalledWith('1')
  })

  it(`Dado á chamada do método "controlModal",
      quando o valor da variável "type" for diferente de undefined,
      deve setar o valor das variáveis "typeTransfer" e "isALiveFormTransfer"`, () => {
      component.controlModal('pix')
      expect(component.typeTransfer).toEqual('pix')
      expect(component.isALiveFormTransfer).toEqual(true)
  })

  it(`Dado á chamada do método "controlHiddenBalance",
      deve setar o valor da variável "hiddenAccount"`, () => {
      component.controlHiddenBalance()
      expect(component.hiddenAccount).toEqual(true)
  })

  it(`Dado á chamada do método "controlExtract",
      deve setar o valor da variável "isALiveExtract"`, () => {
        component.controlExtract()
        expect(component.isALiveExtract).toEqual(true)
  })
});
