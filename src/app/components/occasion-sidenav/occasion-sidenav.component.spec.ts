import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccasionSidenavComponent } from './occasion-sidenav.component';

describe('OccasionSidenavComponent', () => {
  let component: OccasionSidenavComponent;
  let fixture: ComponentFixture<OccasionSidenavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OccasionSidenavComponent]
    });
    fixture = TestBed.createComponent(OccasionSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
