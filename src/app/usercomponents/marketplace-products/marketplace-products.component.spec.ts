import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceProductsComponent } from './marketplace-products.component';

describe('MarketplaceProductsComponent', () => {
  let component: MarketplaceProductsComponent;
  let fixture: ComponentFixture<MarketplaceProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketplaceProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketplaceProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
