import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsByUserTableComponent } from './models-by-user-table.component';

describe('ModelsByUserTableComponent', () => {
  let component: ModelsByUserTableComponent;
  let fixture: ComponentFixture<ModelsByUserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelsByUserTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelsByUserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
