import { Injectable, Pipe } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map, mergeMap, catchError, tap, mapTo, concatMap } from "rxjs/operators";
import { AppState } from "../reducers/index";
import { TasksService } from "../../features/features-shared/services/tasks.service";
import { Task } from "../../features/features-shared/models/task";
import * as TasksActions from "../actions/task.actions";
import * as UserActions from "../actions/user.actions";

@Injectable()
export class TasksEffects {
  constructor(
    private tasksService: TasksService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  @Effect()
  loadTasks$: Observable<Action> = this.actions$.pipe(
    ofType<TasksActions.LoadTasks>(TasksActions.TasksActionTypes.LoadTasks),
    mergeMap(() =>
      this.tasksService.getMyTasks().pipe(
        map((tasks: Task[]) => new TasksActions.LoadTasksSuccess(tasks)),
        catchError(err => of(new TasksActions.LoadTasksFail(err)))
      )
    )
  );

  @Effect({ dispatch: false })
  createTask$: Observable<any> = this.actions$.pipe(
    ofType<TasksActions.CreateTask>(TasksActions.TasksActionTypes.CreateTask),
    map((action: TasksActions.CreateTask) => action.task),
    concatMap(task => [
      this.tasksService.createTask(task),
      new TasksActions.CreateTaskSuccess(task)
    ])
  );

  @Effect({ dispatch: false })
  editTask$: Observable<any> = this.actions$.pipe(
    ofType<TasksActions.EditTask>(TasksActions.TasksActionTypes.EditTask),
    map((action: TasksActions.EditTask) => action.task),
    tap(task => this.tasksService.updateTask(task))
  );

  @Effect({ dispatch: false })
  deleteTask$: Observable<any> = this.actions$.pipe(
    ofType<TasksActions.DeleteTask>(TasksActions.TasksActionTypes.DeleteTask),
    map((action: TasksActions.DeleteTask) => action.taskId),
    tap(taskId => this.tasksService.deleteTask(taskId))
  );

  @Effect()
  initialTaskState$ = this.actions$.pipe(
    ofType<UserActions.UserLogOut>(UserActions.UserActionTypes.USER_LOG_OUT),
    mapTo(new TasksActions.InitialState())
  );
}
