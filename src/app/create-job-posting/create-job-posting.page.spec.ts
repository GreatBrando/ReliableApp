import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobPostingPage } from './create-job-posting.page';

describe('CreateJobPostingPage', () => {
  let component: CreateJobPostingPage;
  let fixture: ComponentFixture<CreateJobPostingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateJobPostingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJobPostingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
