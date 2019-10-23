import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume2Page } from './resume2.page';

describe('Resume2Page', () => {
  let component: Resume2Page;
  let fixture: ComponentFixture<Resume2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resume2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
