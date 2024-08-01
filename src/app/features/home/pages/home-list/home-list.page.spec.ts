import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeListPage } from './home-list.page';

describe('HomeListPage', () => {
  let component: HomeListPage;
  let fixture: ComponentFixture<HomeListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
