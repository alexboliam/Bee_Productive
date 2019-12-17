import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { User } from "../../../auth/models/user";
import { ProfileSettings } from './../../../features/features-shared/models/profile-settings';

@Component({
  selector: "app-header",
  templateUrl: "./app-header.component.html",
  styleUrls: ["./app-header.component.scss"]
})
export class AppHeaderComponent implements OnInit, OnChanges {
  @Input() user: ProfileSettings;
  @Input() isDarkMode: boolean;
  @Input() isAuthenticated: boolean;
  @Input() currentDateAndTime: any;

  @Output()
  logout = new EventEmitter<any>();
  @Output()
  addToDoState = new EventEmitter<any>();
  @Output()
  darkModeState = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {}

  logoutUser() {
    this.logout.emit();
  }

  heandelAddToDo() {
    this.addToDoState.emit(true);
  }

  onChangeThemeMode($event) {
    this.darkModeState.emit(true);
  }
}
