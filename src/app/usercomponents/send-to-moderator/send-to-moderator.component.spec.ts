import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendToModeratorComponent } from './send-to-moderator.component';

describe('SendToModeratorComponent', () => {
  let component: SendToModeratorComponent;
  let fixture: ComponentFixture<SendToModeratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendToModeratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendToModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
