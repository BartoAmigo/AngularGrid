import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridcontrolboxComponent } from './gridcontrolbox.component';

describe('GridcontrolboxComponent', () => {
  let component: GridcontrolboxComponent;
  let fixture: ComponentFixture<GridcontrolboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridcontrolboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridcontrolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
