import { UserActions, UserActionTypes } from "../actions/user.actions";
import { User } from "../../auth/models/user";

export interface UserState {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

export const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export function userReducer(
  state = initialState,
  action: UserActions
): UserState {
  switch (action.type) {
    case UserActionTypes.USER_LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.user,
        isAuthenticated: true
      };
    }

    case UserActionTypes.USER_LOGIN_FAIL: {
      return {
        ...state,
        errorMessage: action.error
      };
    }

    case UserActionTypes.USER_SIGNUP_SUCCESS: {
      return {
        ...state,
        user: action.user,
        isAuthenticated: true
      };
    }

    case UserActionTypes.USER_SIGNUP_FAIL: {
      return {
        ...state,
        errorMessage: action.error
      };
    }

    case UserActionTypes.USER_AUTH_STATE_TRUE: {
      return {
        ...state,
        user: action.user,
        isAuthenticated: true
      };
    }

    case UserActionTypes.USER_LOG_OUT: {
      return initialState;
    }

    default:
      return state;
  }
}
