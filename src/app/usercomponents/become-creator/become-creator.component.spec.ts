import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeCreatorComponent } from './become-creator.component';

describe('BecomeCreatorComponent', () => {
  let component: BecomeCreatorComponent;
  let fixture: ComponentFixture<BecomeCreatorComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BecomeCreatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BecomeCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
