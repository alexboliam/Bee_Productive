import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../core/reducers";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ContactAsService {
  constructor(
    private store: Store<AppState>,
    private firestore: AngularFirestore
  ) {}

  sendMessages(formRequest) {
    this.firestore.collection("messages").add(formRequest);
  }

}
