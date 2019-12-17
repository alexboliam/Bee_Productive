import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TasksModule } from "./tasks/tasks.module";
import { AuthGuard } from "../auth/guards/auth.guard";
// COMPONENTS
import { ContactAsComponent } from "./contact-as/contact-as.component";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { HomeComponent } from "./home/home.component";
import { SettingsComponent } from "./settings/settings.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { NotificationComponent } from "./notification/notification.component";
import { MyFilesComponent } from "./my-files/my-files.component";
import { CalendarComponent } from "./calendar/calendar.component";

const routes: Routes = [
  {path: '', children: [
    { path: "home", canActivate: [AuthGuard], component: HomeComponent },
    {
      path: "my-profile",
      canActivate: [AuthGuard],
      component: MyProfileComponent
    },
    {
      path: "contact-as",
      canActivate: [AuthGuard],
      component: ContactAsComponent
    },
    { path: "settings", canActivate: [AuthGuard], component: SettingsComponent },
    {
      path: "notification",
      canActivate: [AuthGuard],
      component: NotificationComponent
    },
    { path: "my-files", canActivate: [AuthGuard], component: MyFilesComponent },
    { path: "calendar", canActivate: [AuthGuard], component: CalendarComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "**", component: PageNotFoundComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule {}
