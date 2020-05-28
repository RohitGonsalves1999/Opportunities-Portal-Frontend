import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrendsComponent } from './view-trends.component';

describe('ViewTrendsComponent', () => {
  let component: ViewTrendsComponent;
  let fixture: ComponentFixture<ViewTrendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTrendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
