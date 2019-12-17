import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav",
  templateUrl: "./app-nav.component.html",
  styleUrls: ["./app-nav.component.scss"]
})
export class AppNavComponent implements OnInit {
  @Input() isDarkMode: boolean;
  routesArray: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.routesArray = this.getRoutes();
    this.activateRoute(this.router.url);
  }

  navigatTo(link: string) {
    this.activateRoute(link);
    this.router.navigate([`${link}`]);
  }

  activateRoute(nextRoute: string) {
    this.routesArray.forEach(route => {
      route.isActive = route.path === nextRoute ? true : false;
    });
  }

  getRoutes() {
    return [
      { path: "features/home", icon: "fa fa-home", isActive: false, label: "Home" },
      // {
      //   path: "/my-profile",
      //   icon: "fa fa-user",
      //   isActive: false,
      //   label: "My Profile"
      // },
      {
        path: "features/tasks/schedule",
        icon: "fa fa-list-ul",
        isActive: false,
        label: "Tasks"
      },
      {
        path: "features/tasks/add-task",
        icon: "fa fa-plus",
        isActive: false,
        label: "Add Task"
      },
      // {
      //   path: "/calendar",
      //   icon: "fa fa-calendar",
      //   isActive: false,
      //   label: "Calendar"
      // },
      {
        path: "features/my-files",
        icon: "fa fa-file",
        isActive: false,
        label: "My Files"
      },
      // {
      //   path: "/notification",
      //   icon: "fa fa-bell",
      //   isActive: false,
      //   label: "Notification"
      // },
      {
        path: "features/settings",
        icon: "fa fa-gear",
        isActive: false,
        label: "Settings"
      },
      {
        path: "features/contact-as",
        icon: "fa fa-envelope",
        isActive: false,
        label: "Contact As"
      }
    ];
  }
}
