import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../core/reducers";
import { Subscription } from "rxjs";
import { getUserSettings } from "../../core/selectors/profileSettings.selectors";
import { DataService } from "./../../shared/services/data.service";
import { ProfileSettings } from "../features-shared/models/profile-settings";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.scss"]
})
export class MyProfileComponent implements OnInit, OnDestroy {
  userProfile: ProfileSettings = <ProfileSettings>{};
  isDarkMode: boolean;
  defaultPhotoUrl = "~/images/logo.png";
  private subGetProfileSettings: Subscription;

  constructor(
    private store: Store<AppState>,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.subGetProfileSettings = this.store
      .pipe(select(getUserSettings))
      .subscribe(profileSettings => {
        if (profileSettings) {
          this.userProfile = profileSettings;
        }
      });

    this.dataService.currentThemeModeState.subscribe(themeState => {
      this.isDarkMode = themeState;
    });
  }

  ngOnDestroy() {
    if (this.subGetProfileSettings) {
      this.subGetProfileSettings.unsubscribe();
    }
  }
}
