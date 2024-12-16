import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceShoppingcartComponent } from './marketplace-shoppingcart.component';

describe('MarketplaceShoppingcartComponent', () => {
  let component: MarketplaceShoppingcartComponent;
  let fixture: ComponentFixture<MarketplaceShoppingcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketplaceShoppingcartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketplaceShoppingcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
