import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../core/reducers";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthService } from "../../../auth/services/auth.service";
import { User } from "../../../auth/models/user";
import {
  getUser,
  getUserAuthenticatedState
} from "../../../core/selectors/user.selectors";
import { DataService } from "../../../shared/services/data.service";
import { ProfileSettings } from "../../../features/features-shared/models/profile-settings";
import { getUserSettings } from "../../../core/selectors/profileSettings.selectors";
import * as helpers from "../../../features/features-shared/services/helpersFunctions";

@Component({
  selector: "app-main-app",
  templateUrl: "./main-app.component.html",
  styleUrls: ["./main-app.component.scss"]
})
export class MainAppComponent implements OnInit, OnDestroy {
  user: User;
  userSettings: ProfileSettings;
  isAuthenticated: boolean;
  isDarkMode: boolean;
  timer;
  currentDateAndTime: any;
  private subscription: Subscription;
  private subGetProfileSettings: Subscription;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.timer = setInterval(() => {
      this.currentDateAndTime = helpers.gettDateAndTime();
    }, 1000);

    this.store.pipe(select(getUser)).subscribe(user => {
      if (user) {
        // console.log(user);
        this.user = user;
      }
    });

    this.subGetProfileSettings = this.store
      .pipe(select(getUserSettings))
      .subscribe(profileSettings => {
        if (profileSettings) {
          // console.log(profileSettings);
          this.userSettings = profileSettings;
        }
      });

    this.store
      .pipe(select(getUserAuthenticatedState))
      .subscribe(authenticated => {
        this.isAuthenticated = authenticated;
      });

    this.dataService.currentThemeModeState.subscribe(themeState => {
      this.isDarkMode = themeState;
    });
  }

  ngOnDestroy() {
    if (this.subGetProfileSettings) {
      this.subGetProfileSettings.unsubscribe();
    }
    this.subscription.unsubscribe();
    clearInterval(this.timer);
  }

  async onLogout() {
    await this.authService.logoutUser();
    this.router.navigate(["/auth/login"]);
  }

  heandelAddToDoState($event) {
    // console.log($event);
  }

  changeThemeMode($event) {
    this.dataService.changeThemeModeState(!this.isDarkMode);
  }
}
