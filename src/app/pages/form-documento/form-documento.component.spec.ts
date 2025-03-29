import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDocumentoComponent } from './form-documento.component';

describe('FormDocumentoComponent', () => {
  let component: FormDocumentoComponent;
  let fixture: ComponentFixture<FormDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDocumentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
