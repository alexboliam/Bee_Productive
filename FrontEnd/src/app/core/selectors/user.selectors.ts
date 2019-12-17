import { createSelector } from "@ngrx/store";
import { AppState } from "../reducers";
import { UserState } from "../reducers/user.reducer";

export const getUserState = (state: AppState) => state.userState;
export const getUser = createSelector(
  getUserState,
  (state: UserState) => state.user
);
export const getUserAuthenticatedState = createSelector(
  getUserState,
  (state: UserState) => state.isAuthenticated
);
