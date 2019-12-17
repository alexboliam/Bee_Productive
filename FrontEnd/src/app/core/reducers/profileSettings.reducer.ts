import { ProfileSettings } from "../../features/features-shared/models/profile-settings";
import {
  ProfileSettingsActions,
  ProfileSettingsActionTypes
} from "../actions/profileSettings.actions";

export interface ProfileSettingsState {
  profileSettings: ProfileSettings;
}

export const initialState: ProfileSettingsState = {
  profileSettings: null
};

export function profileSettingsReducer(
  state = initialState,
  action: ProfileSettingsActions
): ProfileSettingsState {
  switch (action.type) {
    case ProfileSettingsActionTypes.LoadProfileSettings_SUCCESS: {
      return {
        ...state,
        profileSettings: action.profileSettings
      };
    }

    case ProfileSettingsActionTypes.UpdateProfileSettings_SUCCESS: {
      return {
        ...state,
        profileSettings: action.profileSettings
      };
    }

    case ProfileSettingsActionTypes.DeleteProfileSettings: {
      return initialState;
    }

    default:
      return state;
  }
}
