import { Action } from "@ngrx/store";
import { User } from '../../auth/models/user';


export enum UserActionTypes {
  USER_LOGIN = "[User] User LogIn",
  USER_LOGIN_SUCCESS = "[User] User LogIn Success",
  USER_LOGIN_FAIL = "[User] User LogIn Fail",
  SOCIAL_MEDIA_SIGNIN = "[User] Social Media SignIn",
  USER_SIGNUP = "[User] User Signup",
  USER_SIGNUP_SUCCESS = "[User] User Signup Success",
  USER_SIGNUP_FAIL = "[User] User Signup Fail",
  SOCIAL_MEDIA_SIGNUP = "[User] Social Media Signup",
  USER_LOG_OUT = "[User] User LogOut",
  USER_AUTH_STATE = "[User] User Auth State",
  USER_AUTH_STATE_TRUE = "[User] User Auth State true"
}

export class UserLogIn implements Action {
  readonly type = UserActionTypes.USER_LOGIN;

  constructor(public user: User) {}
}

export class UserLogInSuccess implements Action {
  readonly type = UserActionTypes.USER_LOGIN_SUCCESS;

  constructor(public user: User) {}
}

export class UserLogInFail implements Action {
  readonly type = UserActionTypes.USER_LOGIN_FAIL;

  constructor(public error: string) {}
}

export class SocialMediaSignin implements Action {
  readonly type = UserActionTypes.SOCIAL_MEDIA_SIGNIN;

  constructor(public user) {}
}

export class UserSignUp implements Action {
  readonly type = UserActionTypes.USER_SIGNUP;

  constructor(public user) {}
}

export class UserSignUpSuccess implements Action {
  readonly type = UserActionTypes.USER_SIGNUP_SUCCESS;

  constructor(public user: User) {}
}

export class UserSignUpFail implements Action {
  readonly type = UserActionTypes.USER_SIGNUP_FAIL;

  constructor(public error: string) {}
}

export class SocialMediaSignup implements Action {
  readonly type = UserActionTypes.SOCIAL_MEDIA_SIGNUP;

  constructor(public user) {}
}

export class UserLogOut implements Action {
  readonly type = UserActionTypes.USER_LOG_OUT;
}

export class UserAuthState implements Action {
  readonly type = UserActionTypes.USER_AUTH_STATE;

  constructor(public user: User) {}
}

export class UserAuthStateTrue implements Action {
  readonly type = UserActionTypes.USER_AUTH_STATE_TRUE;

  constructor(public user: User) {}
}

export type UserActions =
  | UserLogIn
  | UserLogInSuccess
  | UserLogInFail
  | SocialMediaSignin
  | UserSignUp
  | UserSignUpSuccess
  | UserSignUpFail
  | SocialMediaSignup
  | UserLogOut
  | UserAuthState
  | UserAuthStateTrue;
