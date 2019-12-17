import { createSelector } from "@ngrx/store";
import { AppState } from "../reducers";
import { ProfileSettingsState } from "../reducers/profileSettings.reducer";

export const getProfileSettingsState = (state: AppState) =>
  state.profileSettingsState;
export const getUserSettings = createSelector(
  getProfileSettingsState,
  (state: ProfileSettingsState) => state.profileSettings
);
