import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopModelsTableComponent } from './top-models-table.component';

describe('TopModelsTableComponent', () => {
  let component: TopModelsTableComponent;
  let fixture: ComponentFixture<TopModelsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopModelsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopModelsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
