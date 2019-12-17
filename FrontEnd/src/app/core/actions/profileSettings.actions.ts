import { Action } from "@ngrx/store";
import { ProfileSettings } from "../../features/features-shared/models/profile-settings";

export enum ProfileSettingsActionTypes {
  CreateProfileSettings = "[ProfileSettings] Create Profile Settings",
  CreateProfileSettings_SUCCESS = "[ProfileSettings] Create Profile Settings Success",
  LoadProfileSettings = "[ProfileSettings] Load Profile Settings",
  LoadProfileSettings_SUCCESS = "[ProfileSettings] Load Profile Settings Success",
  LoadProfileSettings_FAIL = "[ProfileSettings] Load Profile Settings Fail",
  UpdateProfileSettings = "[ProfileSettings] Update Profile Settings",
  UpdateProfileSettings_SUCCESS = "[ProfileSettings] Update Profile Settings Success",
  UpdateProfileSettings_FAIL = "[ProfileSettings] Update Profile Settings Fail",
  DeleteProfileSettings = "[ProfileSettings] Delete Profile Settings"
}

export class CreateProfileSettings implements Action {
  readonly type = ProfileSettingsActionTypes.CreateProfileSettings;
  constructor(public profileSettings: any) {}
}

export class CreateProfileSettingsSuccess implements Action {
  readonly type = ProfileSettingsActionTypes.CreateProfileSettings_SUCCESS;

  constructor(public userUid: string) {}
}

export class LoadProfileSettings implements Action {
  readonly type = ProfileSettingsActionTypes.LoadProfileSettings;
  constructor(public userUid: string) {}
}

export class LoadProfileSettingsSuccess implements Action {
  readonly type = ProfileSettingsActionTypes.LoadProfileSettings_SUCCESS;

  constructor(public profileSettings: ProfileSettings) {}
}

export class LoadProfileSettingsFail implements Action {
  readonly type = ProfileSettingsActionTypes.LoadProfileSettings_FAIL;

  constructor(public payload: string) {}
}

export class UpdateProfileSettings implements Action {
  readonly type = ProfileSettingsActionTypes.UpdateProfileSettings;

  constructor(public profileSettings: ProfileSettings) {}
}

export class UpdateProfileSettingsSuccess implements Action {
  readonly type = ProfileSettingsActionTypes.UpdateProfileSettings_SUCCESS;

  constructor(public profileSettings: ProfileSettings) {}
}

export class UpdateProfileSettingsFail implements Action {
  readonly type = ProfileSettingsActionTypes.UpdateProfileSettings_FAIL;

  constructor(public payload: string) {}
}

export class DeleteProfileSettings implements Action {
  readonly type = ProfileSettingsActionTypes.DeleteProfileSettings;
}

export type ProfileSettingsActions =
  | CreateProfileSettings
  | CreateProfileSettingsSuccess
  | LoadProfileSettings
  | LoadProfileSettingsSuccess
  | LoadProfileSettingsFail
  | UpdateProfileSettings
  | UpdateProfileSettingsSuccess
  | UpdateProfileSettingsFail
  | DeleteProfileSettings;
