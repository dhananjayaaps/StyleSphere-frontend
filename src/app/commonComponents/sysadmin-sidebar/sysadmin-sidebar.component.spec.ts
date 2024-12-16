import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysadminSidebarComponent } from './sysadmin-sidebar.component';

describe('SysadminSidebarComponent', () => {
  let component: SysadminSidebarComponent;
  let fixture: ComponentFixture<SysadminSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SysadminSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SysadminSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
