import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListIncidenciasPage } from './list-incidencias.page';

describe('ListIncidenciasPage', () => {
  let component: ListIncidenciasPage;
  let fixture: ComponentFixture<ListIncidenciasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIncidenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
