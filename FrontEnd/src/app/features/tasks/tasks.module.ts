import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { DndModule } from "ng2-dnd";
// MODULES
import { TasksRoutingModule } from "./tasks-routing.module";

// COMPONENS
import { TasksComponent } from "./container/tasks/tasks.component";
import { TasksScheduleComponent } from "./components/tasks-schedule/tasks-schedule.component";
import { TaskDetailsComponent } from "./components/task-details/task-details.component";
import { AddTaskFormComponent } from "./components/add-task-form/add-task-form.component";
import { EditTaskFormComponent } from "./components/edit-task-form/edit-task-form.component";
import { SharedModule } from '../../shared/shared.module';
import { FeaturesSharedModule } from '../features-shared/features-shared.module';


@NgModule({
  declarations: [
    TasksComponent,
    TasksScheduleComponent,
    TaskDetailsComponent,
    AddTaskFormComponent,
    EditTaskFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TasksRoutingModule,
    SharedModule,
    DndModule.forRoot(),
    FeaturesSharedModule
  ],
  providers: []
})
export class TasksModule {}
