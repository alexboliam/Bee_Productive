import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DataService {
  private addTaskState = new BehaviorSubject(false);
  currentAddTaskState = this.addTaskState.asObservable();

  private themeModeState = new BehaviorSubject(false);
  currentThemeModeState = this.themeModeState.asObservable();
  constructor() {
  }

  changeAddTaskButState(state: boolean) {
    this.addTaskState.next(state);
  }

  changeThemeModeState(state: boolean) {
    this.themeModeState.next(state);
  }
}
