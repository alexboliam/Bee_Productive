import { createSelector } from "@ngrx/store";
import { AppState } from "../reducers";
import { TasksState } from "../reducers/task.reducer";

export const getTaskState = (state: AppState) => state.tasksState;
export const getTasksList = createSelector(
  getTaskState,
  (state: TasksState) => state.tasks
);
export const getCourrentTask = createSelector(
  getTaskState,
  (state: TasksState) => state.correntTask
);
