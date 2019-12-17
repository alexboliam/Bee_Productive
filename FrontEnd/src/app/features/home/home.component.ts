import { Component, OnInit } from "@angular/core";
import { DataService } from "./../../shared/services/data.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  isDarkMode: boolean;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.currentThemeModeState.subscribe(
      themeState => {
        this.isDarkMode = themeState;
      }
    );
  }
}
