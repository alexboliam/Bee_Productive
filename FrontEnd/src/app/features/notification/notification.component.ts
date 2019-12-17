import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"]
})
export class NotificationComponent implements OnInit {
  constructor() {}

  columns: boolean;

  ngOnInit() {
    this.columns = false;
  }

  addColumn() {
    this.columns = true;
  }

  removeColumn() {
    this.columns = false;
  }
}
