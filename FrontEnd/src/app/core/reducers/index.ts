import {
  ActionReducerMap,
  MetaReducer
} from "@ngrx/store";
import { environment } from "../../../environments/environment";
import { TasksState, tasksReducer } from "./task.reducer";
import { ProfileSettingsState, profileSettingsReducer } from './profileSettings.reducer';
import { UserState, userReducer } from './user.reducer';
import { UploadFileState, uploadFileReducer } from './upload-file.reducer';

export interface AppState {
  userState: UserState;
  profileSettingsState: ProfileSettingsState;
  tasksState: TasksState;
  uploadFileState: UploadFileState;
}

export const reducers: ActionReducerMap<AppState> = {
  userState: userReducer,
  profileSettingsState: profileSettingsReducer,
  tasksState: tasksReducer,
  uploadFileState: uploadFileReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
