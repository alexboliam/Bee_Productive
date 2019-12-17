import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, concatMap } from "rxjs/operators";
import { ProfileSettingsService } from "../../features/features-shared/services/profile-settings.service";
import { AppState } from "../reducers/index";
import { AuthService } from "../../auth/services/auth.service";
import * as UserActions from "../actions/user.actions";
import * as ProfileSettingsActions from "../actions/profileSettings.actions";

@Injectable()
export class UserEffects {
  constructor(
    private authService: AuthService,
    private settingsService: ProfileSettingsService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  @Effect()
  UserLogIn$ = this.actions$.pipe(
    ofType<UserActions.UserLogIn>(UserActions.UserActionTypes.USER_LOGIN),
    map((action: UserActions.UserLogIn) => action.user),
    concatMap(user => [new UserActions.UserLogInSuccess(user)])
  );

  @Effect()
  UserSignUp$ = this.actions$.pipe(
    ofType<UserActions.UserSignUp>(UserActions.UserActionTypes.USER_SIGNUP),
    map((action: UserActions.UserSignUp) => action.user),
    concatMap(createdUser => [
      // this.settingsService.creatUserSettings({
      //   id: null,
      //   uid: createdUser.user.uid,
      //   fullName: null,
      //   photoURL: createdUser.user.photoURL || null,
      //   username: createdUser.user.displayName || null,
      //   email: createdUser.user.email,
      //   password: createdUser.user.password,
      //   bio: null,
      //   darkThemeMode: false,
      //   socialLinks: {
      //     github: "",
      //     linkedin: "",
      //     facebook: "",
      //     website: ""
      //   }
      // }),
      new ProfileSettingsActions.CreateProfileSettings(createdUser.user),
      new UserActions.UserSignUpSuccess({
        email: createdUser.user.email,
        uid: createdUser.user.uid,
        authenticated: true
      })
    ])
  );

  @Effect()
  SocialMediaSignup$ = this.actions$.pipe(
    ofType<UserActions.SocialMediaSignup>(UserActions.UserActionTypes.SOCIAL_MEDIA_SIGNUP),
    map((action: UserActions.SocialMediaSignup) => action.user),
    concatMap(createdUser => [
      this.settingsService.creatUserSettings(createdUser),
      new UserActions.UserSignUpSuccess({
        email: createdUser.email,
        uid: createdUser.uid,
        authenticated: true
      })
    ])
  );

  @Effect()
  UserAuthState$: Observable<Action> = this.actions$.pipe(
    ofType<UserActions.UserAuthState>(UserActions.UserActionTypes.USER_AUTH_STATE),
    map((action: UserActions.UserAuthState) => action.user),
    concatMap(user => [
      new UserActions.UserAuthStateTrue(user)
    ])
  );
}
