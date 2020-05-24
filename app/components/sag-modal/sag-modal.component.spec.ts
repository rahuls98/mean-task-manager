import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SagModalComponent } from './sag-modal.component';

describe('SagModalComponent', () => {
  let component: SagModalComponent;
  let fixture: ComponentFixture<SagModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SagModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SagModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
