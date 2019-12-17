import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditorModule } from "primeng/editor";
import { LightboxModule } from "primeng/lightbox";
import { ToggleButtonModule } from "primeng/togglebutton";
import { TabViewModule } from "primeng/tabview";
import { MenubarModule } from "primeng/menubar";
import { MenuModule } from "primeng/menu";
import { FullCalendarModule } from "primeng/fullcalendar";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EditorModule,
    LightboxModule,
    ToggleButtonModule,
    TabViewModule,
    MenubarModule,
    MenuModule,
    FullCalendarModule
  ],
  exports: [
    EditorModule,
    LightboxModule,
    ToggleButtonModule,
    TabViewModule,
    MenubarModule,
    MenuModule,
    FullCalendarModule
  ]
})
export class PrimengModule {}
