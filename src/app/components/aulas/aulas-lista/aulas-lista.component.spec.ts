/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AulasListaComponent } from './aulas-lista.component';

describe('AulasListaComponent', () => {
  let component: AulasListaComponent;
  let fixture: ComponentFixture<AulasListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AulasListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AulasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
