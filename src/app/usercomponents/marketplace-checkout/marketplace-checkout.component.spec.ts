import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceCheckoutComponent } from './marketplace-checkout.component';

describe('MarketplaceCheckoutComponent', () => {
  let component: MarketplaceCheckoutComponent;
  let fixture: ComponentFixture<MarketplaceCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketplaceCheckoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketplaceCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
