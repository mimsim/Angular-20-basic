import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoTask } from './no-task';

describe('NoTask', () => {
  let component: NoTask;
  let fixture: ComponentFixture<NoTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoTask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
