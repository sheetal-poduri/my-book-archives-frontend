import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBooksGoogleComponent } from './add-books-google.component';

describe('AddBooksGoogleComponent', () => {
  let component: AddBooksGoogleComponent;
  let fixture: ComponentFixture<AddBooksGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBooksGoogleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBooksGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
