import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactinfoPage } from './contactinfo.page';

describe('ContactinfoPage', () => {
  let component: ContactinfoPage;
  let fixture: ComponentFixture<ContactinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
