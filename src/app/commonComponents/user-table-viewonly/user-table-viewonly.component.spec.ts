import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableViewonlyComponent } from './user-table-viewonly.component';

describe('UserTableViewonlyComponent', () => {
  let component: UserTableViewonlyComponent;
  let fixture: ComponentFixture<UserTableViewonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTableViewonlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTableViewonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
