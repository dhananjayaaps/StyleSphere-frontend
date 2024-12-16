import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDailyAnalyticsComponent } from './seller-daily-analytics.component';

describe('SellerDailyAnalyticsComponent', () => {
  let component: SellerDailyAnalyticsComponent;
  let fixture: ComponentFixture<SellerDailyAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerDailyAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerDailyAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
