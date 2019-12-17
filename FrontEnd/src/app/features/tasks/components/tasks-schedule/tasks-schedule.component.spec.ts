import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksScheduleComponent } from './tasks-schedule.component';

describe('TasksScheduleComponent', () => {
  let component: TasksScheduleComponent;
  let fixture: ComponentFixture<TasksScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
