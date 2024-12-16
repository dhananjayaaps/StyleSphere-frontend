import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModReviewTableComponent } from './mod-review-table.component';

describe('ModReviewTableComponent', () => {
  let component: ModReviewTableComponent;
  let fixture: ComponentFixture<ModReviewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModReviewTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModReviewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
