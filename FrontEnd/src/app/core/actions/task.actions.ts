import { Action } from "@ngrx/store";
import { Task } from "../../features/features-shared/models/task";

export enum TasksActionTypes {
  LoadTasks = "[Task] Load Tasks",
  LoadTasks_SUCCESS = "[Task] Load Tasks Success",
  LoadTasks_FAIL = "[Task] Load Tasks Fail",
  CreateTask = "[Task] Create Task",
  CreateTask_SUCCESS = "[Task] Create Task Success",
  EditTask = "[Task] Edit Task",
  DeleteTask = "[Task] Delete Task",
  InitialState = "[Task] Initial Task State",
  SetCorrentTask = "[Task] Set Corrent Task"
}

export class LoadTasks implements Action {
  readonly type = TasksActionTypes.LoadTasks;
}

export class LoadTasksSuccess implements Action {
  readonly type = TasksActionTypes.LoadTasks_SUCCESS;

  constructor(public tasks: Task[]) {}
}

export class LoadTasksFail implements Action {
  readonly type = TasksActionTypes.LoadTasks_FAIL;

  constructor(public payload: string) {}
}

export class CreateTask implements Action {
  readonly type = TasksActionTypes.CreateTask;

  constructor(public task: Task) {}
}

export class CreateTaskSuccess implements Action {
  readonly type = TasksActionTypes.CreateTask_SUCCESS;

  constructor(public task: Task) {}
}

export class EditTask implements Action {
  readonly type = TasksActionTypes.EditTask;

  constructor(public task: Task) {}
}

export class DeleteTask implements Action {
  readonly type = TasksActionTypes.DeleteTask;

  constructor(public taskId: string) {}
}

export class InitialState implements Action {
  readonly type = TasksActionTypes.InitialState;
}

export class SetCorrentTask implements Action {
  readonly type = TasksActionTypes.SetCorrentTask;
  constructor(public taskId: string) {}
}

export type TasksActions =
  | LoadTasks
  | LoadTasksSuccess
  | LoadTasksFail
  | CreateTask
  | CreateTaskSuccess
  | EditTask
  | DeleteTask
  | InitialState
  | SetCorrentTask;
