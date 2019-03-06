import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {DemoMaterialModule} from '../ngmaterial.module';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      imports: [ HttpClientModule,
        FormsModule,
        DemoMaterialModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
