import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../core/reducers";
import { AngularFirestore } from "@angular/fire/firestore";
import * as ProfileSettingsActions from "../../../core/actions/profileSettings.actions";
import { ProfileSettings } from "../models/profile-settings";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProfileSettingsService {
  constructor(
    private store: Store<AppState>,
    private firestore: AngularFirestore
  ) {}

  getUserSettings(userId) {
    const profilesSettings = this.firestore
      .collection("userSettings", ref => ref.where("uid", "==", userId))
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
    return profilesSettings;
  }

  creatUserSettings(userSettings: ProfileSettings) {
    return this.firestore.collection("userSettings").add(userSettings);
  }

  updateUserSettings(userSettings: ProfileSettings) {
    this.firestore
      .doc("userSettings/" + userSettings.id)
      .update(userSettings);
  }

  deleteUserSettings(userSettingsId: any) {
    this.firestore.doc("userSettings/" + userSettingsId).delete();
  }
}
