import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookshelfComponent } from './edit-bookshelf.component';

describe('EditBookshelfComponent', () => {
  let component: EditBookshelfComponent;
  let fixture: ComponentFixture<EditBookshelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBookshelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookshelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
