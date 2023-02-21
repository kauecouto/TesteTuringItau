import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardExtractComponent } from './card-extract.component';

describe('CardExtractComponent', () => {
  let component: CardExtractComponent;
  let fixture: ComponentFixture<CardExtractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardExtractComponent ],
      imports:[
        CommonModule,
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardExtractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
