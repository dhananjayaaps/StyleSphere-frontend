import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceProductDescriptionComponent } from './marketplace-product-description.component';

describe('MarketplaceProductDescriptionComponent', () => {
  let component: MarketplaceProductDescriptionComponent;
  let fixture: ComponentFixture<MarketplaceProductDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketplaceProductDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketplaceProductDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
