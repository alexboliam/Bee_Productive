import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FullCalendarModule } from '@fullcalendar/angular';
// MODULE
import { SharedModule } from '../shared/shared.module';
import { TasksModule } from "./tasks/tasks.module";
import { FeaturesSharedModule } from './features-shared/features-shared.module';
import { FeaturesRoutingModule } from "./features-routing.module";
// COMPONENTS
import { HomeComponent } from "./home/home.component";
import { ContactAsComponent } from "./contact-as/contact-as.component";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { SettingsComponent } from "./settings/settings.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NotificationComponent } from './notification/notification.component';
import { MyFilesComponent } from './my-files/my-files.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    HomeComponent,
    ContactAsComponent,
    MyProfileComponent,
    SettingsComponent,
    PageNotFoundComponent,
    NotificationComponent,
    MyFilesComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    TasksModule,
    SharedModule,
    FeaturesSharedModule,
    FeaturesRoutingModule
  ],
  exports: []
})
export class FeaturesModule {}
