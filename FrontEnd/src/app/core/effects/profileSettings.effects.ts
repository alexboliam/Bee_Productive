import { DataService } from "./../../shared/services/data.service";
import { Injectable, Pipe } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import {
  map,
  mergeMap,
  catchError,
  tap,
  concatMapTo,
  concatMap,
  mapTo
} from "rxjs/operators";
import { AppState } from "./../reducers/index";
import { ProfileSettingsService } from "../../features/features-shared/services/profile-settings.service";
import { ProfileSettings } from "../../features/features-shared/models/profile-settings";
import * as ProfileSettingsActions from "../actions/profileSettings.actions";
import * as UserActions from "../actions/user.actions";
import * as UploadFileActions from "../actions/upload-file.actions";


@Injectable()
export class ProfileSettingsEffects {
  constructor(
    private settingsService: ProfileSettingsService,
    private dataService: DataService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  @Effect({ dispatch: false })
  createUserProfileSettings$ = this.actions$.pipe(
    ofType<ProfileSettingsActions.CreateProfileSettings>(
      ProfileSettingsActions.ProfileSettingsActionTypes.CreateProfileSettings
    ),
    map((action: ProfileSettingsActions.CreateProfileSettings) => action.profileSettings),
    tap(user => [
      this.settingsService.creatUserSettings({
          id: null,
          uid: user.uid,
          fullName: null,
          photoURL: user.photoURL || null,
          username: user.displayName || null,
          email: user.email,
          password: user.password || null,
          bio: null,
          darkThemeMode: false,
          socialLinks: {
            github: "",
            linkedin: "",
            facebook: "",
            website: ""
          }
        }),
      new ProfileSettingsActions.LoadProfileSettings(user.uid)
    ])
  );

  // @Effect()
  // getUserProfileSettings$ = this.actions$.pipe(
  //   ofType<UserActions.UserLogInSuccess | UserActions.UserSignUpSuccess | UserActions.UserAuthStateTrue>(
  //     UserActions.UserActionTypes.UserLogIn_SUCCESS,
  //     UserActions.UserActionTypes.UserSignup_SUCCESS,
  //     UserActions.UserActionTypes.UserAuthStateTrue
  //   ),
  //   map(
  //     (action: UserActions.UserLogInSuccess | UserActions.UserSignUpSuccess |  UserActions.UserAuthStateTrue) =>
  //       action.user
  //   ),
  //   concatMap(user => [
  //     new ProfileSettingsActions.LoadProfileSettings(user.uid)
  //   ])
  // );

  @Effect()
  getUserProfileSettings$ = this.actions$.pipe(
    ofType<UserActions.UserLogInSuccess>(
      UserActions.UserActionTypes.USER_AUTH_STATE_TRUE
    ),
    map(
      (action: UserActions.UserLogInSuccess) =>
        action.user
    ),
    concatMap(user => [
      new ProfileSettingsActions.LoadProfileSettings(user.uid),
      new UploadFileActions.GetMyFilesAction(user.uid)
    ])
  );

  @Effect()
  loadProfileSettings$: Observable<Action> = this.actions$.pipe(
    ofType<ProfileSettingsActions.LoadProfileSettings>(
      ProfileSettingsActions.ProfileSettingsActionTypes.LoadProfileSettings
    ),
    mergeMap((action: ProfileSettingsActions.LoadProfileSettings) =>
      this.settingsService.getUserSettings(action.userUid).pipe(
        map(
          (userSettings: any) =>
            new ProfileSettingsActions.LoadProfileSettingsSuccess(
              userSettings[0]
            )
        ),
        catchError(err =>
          of(new ProfileSettingsActions.LoadProfileSettingsFail(err))
        )
      )
    )
  );

  @Effect({ dispatch: false})
  setUserTheme$ = this.actions$.pipe(
    ofType<ProfileSettingsActions.LoadProfileSettingsSuccess>(
      ProfileSettingsActions.ProfileSettingsActionTypes
        .LoadProfileSettings_SUCCESS
    ),
    map(
      (action: ProfileSettingsActions.LoadProfileSettingsSuccess) =>
        action.profileSettings
    ),
    tap(profileSettings => [
      this.dataService.changeThemeModeState(profileSettings.darkThemeMode)
    ])
  );

  // @Effect()
  // updateProfileSettings$: Observable<Action> = this.actions$.pipe(
  //   ofType<ProfileSettingsActions.UpdateProfileSettings>(
  //     ProfileSettingsActions.ProfileSettingsActionTypes.UpdateProfileSettings
  //   ),
  //   mergeMap((action: ProfileSettingsActions.UpdateProfileSettings) =>
  //     this.settingsService.updateUserSettings(action.profileSettings).pipe(
  //       map(
  //         (userSettings: any) =>
  //           new ProfileSettingsActions.UpdateProfileSettingsSuccess(userSettings[0])
  //       ),
  //       catchError(err =>
  //         of(new ProfileSettingsActions.UpdateProfileSettingsFail(err))
  //       )
  //     )
  //   )
  // );

  @Effect()
  deleteUserProfileSettings$ = this.actions$.pipe(
    ofType<UserActions.UserLogOut>(UserActions.UserActionTypes.USER_LOG_OUT),
    mapTo(new ProfileSettingsActions.DeleteProfileSettings())
  );
}
