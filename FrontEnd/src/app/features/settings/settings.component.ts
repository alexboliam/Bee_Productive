import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "../../core/reducers/index";
import { getUserSettings } from "../../core/selectors/profileSettings.selectors";
import { ProfileSettingsService } from "../features-shared/services/profile-settings.service";
import { DataService } from "./../../shared/services/data.service";
import { ProfileSettings } from "../features-shared/models/profile-settings";

// connecting profile link on click in angular || input click openLinkedIn() input
@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit, OnDestroy {
  userSettings: ProfileSettings = <ProfileSettings>{};
  isDarkMode: boolean;
  passwordInputType = "password";
  private subGetProfileSettings: Subscription;

  constructor(
    private settingsService: ProfileSettingsService,
    private store: Store<AppState>,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.resetForm();
    this.subGetProfileSettings = this.store
      .pipe(select(getUserSettings))
      .subscribe(profileSettings => {
        if (profileSettings) {
          this.userSettings = profileSettings;
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

  private resetForm(settingsForm?: NgForm) {
    if (settingsForm != null) {
      settingsForm.resetForm();
    }
  }

  submitSettings(settingsForm) {
    this.settingsService.updateUserSettings(settingsForm.value);
    this.resetForm(settingsForm);
  }

  seePassword() {
    if (this.passwordInputType === "text") {
      this.passwordInputType = "password";
    } else {
      this.passwordInputType = "text";
    }
  }
}
