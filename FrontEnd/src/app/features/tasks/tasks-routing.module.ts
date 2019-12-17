import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// COMPONENTS
import { TasksComponent } from "./container/tasks/tasks.component";
import { TaskDetailsComponent } from "./components/task-details/task-details.component";
import { AddTaskFormComponent } from './components/add-task-form/add-task-form.component';

import { TasksScheduleComponent } from "./components/tasks-schedule/tasks-schedule.component";
import { AuthGuard } from './../../auth/guards/auth.guard';
import { TaskResolver } from '../features-shared/services/task-resolver.service';


const routes: Routes = [
  {
    path: "tasks",
    canActivate: [AuthGuard],
    children: [
      { path: "schedule", component: TasksComponent },
      { path: "details/:id", component: TaskDetailsComponent,
      resolve: {
        details: TaskResolver
      } },
      { path: "add-task", component: AddTaskFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [TaskResolver]
})
export class TasksRoutingModule {}
