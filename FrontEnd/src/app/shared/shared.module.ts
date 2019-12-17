import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToastrModule } from "ngx-toastr";
// MODULES
import { FirebaseModule } from "./firebase/firebase.module";
import { MaterialModule } from "./material/material.module";
import { PrimengModule } from './primeng/primeng.module';
// SERVICES
import { DataService } from "./services/data.service";

@NgModule({
  imports: [
    CommonModule,
    FirebaseModule,
    MaterialModule,
    PrimengModule,
    ToastrModule.forRoot()
  ],
  exports: [
    MaterialModule,
    PrimengModule,
  ],
  providers: [DataService]
})
export class SharedModule {}
