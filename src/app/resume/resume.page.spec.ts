import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumePage } from './resume.page';

describe('ResumePage', () => {
  let component: ResumePage;
  let fixture: ComponentFixture<ResumePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
