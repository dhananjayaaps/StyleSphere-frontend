import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAdmin4ColoumComponent } from './table-admin-4-coloum.component';

describe('TableAdmin4ColoumComponent', () => {
  let component: TableAdmin4ColoumComponent;
  let fixture: ComponentFixture<TableAdmin4ColoumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableAdmin4ColoumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableAdmin4ColoumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
