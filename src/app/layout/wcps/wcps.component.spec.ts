import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WcpsComponent } from './wcps.component';

describe('WcpsComponent', () => {
  let component: WcpsComponent;
  let fixture: ComponentFixture<WcpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WcpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WcpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
