import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { map } from "rxjs/operators";
import { tap } from "rxjs/operators";
import md5 from "md5";
import { AppState } from "../../core/reducers/index";
import { User } from "../models/user";
import * as UserActions from "../../core/actions/user.actions";
import { ProfileSettings } from "../../features/features-shared/models/profile-settings";
import { getUserAuthenticatedState } from "../../core/selectors/user.selectors";
import { ProfileSettingsService } from "../../features/features-shared/services/profile-settings.service";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

declare var gapi: any;

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user$: Observable<firebase.User>;
  idAuthenticated = false;
  calenderItems: any[];
  constructor(
    private store: Store<AppState>,
    private af: AngularFireAuth,
    public router: Router,
    private firestore: AngularFirestore
  ) {
    this.initClient();
    this.user$ = af.authState;
    this.af.authState.subscribe(user => {
      if (user) {
        // console.log(user);
        this.store.dispatch(
          new UserActions.UserAuthState({
            email: user.email,
            uid: user.uid,
            authenticated: true
          })
        );
        this.router.navigate(["features/home"]);
      }
    });
  }

  get authState() {
    return this.af.authState;
    // return this.idAuthenticated;
  }

  // Initialize the Google API client with desired scopes
  initClient() {
    gapi.load('client', () => {
      console.log('loaded client');
      gapi.client.init({
        apiKey: 'AIzaSyC91pH9NAPm-h6Tl1u2TjWDQ6LUEJ63bcg',
        clientId: '952936604876-3sm4jpu1n1i7agrlfpn367e3q62egtg5.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
      });
    });

  }

  createUser(email: string, password: string, username: string) {
    return this.af.auth
      .createUserWithEmailAndPassword(email, password)
      .then(createdUser => {
        createdUser.user
          .updateProfile({
            displayName: username,
            photoURL: `http://gravatar.com/avatar/${md5(
              createdUser.user.email
            )}?d=identicon`
          })
          .then(() => {
            this.store.dispatch(new UserActions.UserSignUp(createdUser));
            // console.log("Success!", value);
          });
      })
      .catch(err => {
        this.store.dispatch(new UserActions.UserSignUpFail(err.message));
        // console.log("Something went wrong:", err.message);
      });
  }

  loginUser(email: string, password: string) {
    return this.af.auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        const user: User = {
          email: value.user.email,
          uid: value.user.uid,
          authenticated: true
        };
        this.store.dispatch(new UserActions.UserLogIn(user));
        // console.log("Nice, it worked!", value);
      })
      .catch(err => {
        this.store.dispatch(new UserActions.UserLogInFail(err.message));
        // console.log("Something went wrong:", err.message);
      });
  }

  // async loginWithFacebook() {
  //   const credential = await this.af.auth.signInWithPopup(
  //     new firebase.auth.FacebookAuthProvider()
  //   );
  //   console.log(JSON.stringify(credential));
  //   return this.updateUserData(credential.user);
  // }

  // async loginWithGoogle() {
  //   const credential = await this.af.auth.signInWithPopup(
  //     new firebase.auth.GoogleAuthProvider()
  //   );

  //   return this.updateUserData(credential.user);
  // }

  // async loginWithGitHub() {
  //   const credential = await this.af.auth.signInWithPopup(
  //     new firebase.auth.GithubAuthProvider()
  //   );

  //   return this.updateUserData(credential.user);
  // }

  // async loginWithTwitter() {
  //   const credential = await this.af.auth.signInWithPopup(
  //     new firebase.auth.TwitterAuthProvider()
  //   );

  //   return this.updateUserData(credential.user);
  // }

  // ========================================================

  loginWithFacebook() {
    return this.af.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
  }

  loginWithGoogle() {
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginWithGitHub() {
    return this.af.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

  loginWithTwitter() {
    return this.af.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    );
  }

  createUserSettingsFromSocialMedia({ user, additionalUserInfo }) {
    const { profile, isNewUser } = additionalUserInfo;
    const { first_name, last_name, given_name, family_name } = profile;
    const { uid, displayName, photoURL, email } = user;
    const userSettings = {
      id: null,
      uid: uid,
      fullName:
        `${first_name} ${last_name}` || `${given_name} ${family_name}` || null,
      photoURL: photoURL || null,
      username: displayName || null,
      email: email,
      password: null,
      bio: null,
      darkThemeMode: false,
      socialLinks: {
        github: "",
        linkedin: "",
        facebook: "",
        website: ""
      }
    };
    if (isNewUser) {
      // console.log(userSettings);
      this.store.dispatch(new UserActions.SocialMediaSignup(userSettings));
    } else {
      // tslint:disable-next-line:no-shadowed-variable
      const {uid, email, photoURL, username} = userSettings;
      this.store.dispatch(new UserActions.UserLogIn({uid, email, photoURL, displayName: username, authenticated: true}));
    }
  }

  updateUserData(user) {
    if (!this.getUserSettings(user.uid)) {
      this.store.dispatch(
        new UserActions.UserSignUp({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName || null,
          photoURL: user.photoURL || null,
          authenticated: true
        })
      );
    } else {
      this.store.dispatch(
        new UserActions.UserLogIn({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName || null,
          photoURL: user.photoURL || null,
          authenticated: true
        })
      );
    }
  }

  getUserSettings(userId) {
    const profilesSettings = this.firestore
      .collection("profilesSettings", ref => ref.where("uId", "==", userId))
      .snapshotChanges()
      .pipe(
        map(chages => {
          return chages.map(userSettings => {
            const userSettingsData = userSettings.payload.doc.data() as ProfileSettings;
            userSettingsData.id = userSettings.payload.doc.id as any;
            return userSettingsData;
          });
        })
      );
    return profilesSettings ? true : false;
  }

  logoutUser() {
    this.store.dispatch(new UserActions.UserLogOut());
    return this.af.auth.signOut();
  }
}
