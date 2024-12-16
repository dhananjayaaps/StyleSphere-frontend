import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModRecentActionsTableComponent } from './mod-recent-actions-table.component';

describe('ModRecentActionsTableComponent', () => {
  let component: ModRecentActionsTableComponent;
  let fixture: ComponentFixture<ModRecentActionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModRecentActionsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModRecentActionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
