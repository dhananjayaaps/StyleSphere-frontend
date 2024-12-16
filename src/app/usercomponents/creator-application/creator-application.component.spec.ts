import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorApplicationComponent } from './creator-application.component';

describe('CreatorApplicationComponent', () => {
  let component: CreatorApplicationComponent;
  let fixture: ComponentFixture<CreatorApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatorApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatorApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
