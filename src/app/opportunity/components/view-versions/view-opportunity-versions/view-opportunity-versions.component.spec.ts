import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOpportunityVersionsComponent } from './view-opportunity-versions.component';

describe('ViewOpportunityVersionsComponent', () => {
  let component: ViewOpportunityVersionsComponent;
  let fixture: ComponentFixture<ViewOpportunityVersionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOpportunityVersionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOpportunityVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
