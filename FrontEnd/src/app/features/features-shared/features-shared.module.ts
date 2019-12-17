import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UploaderComponent } from './components/upload/container/uploader/uploader.component';
import { UploadTaskComponent } from "./components/upload/components/upload-task/upload-task.component";
import { FilesListComponent } from './components/upload/components/files-list/files-list.component';

import { ProfileSettingsService } from "./services/profile-settings.service";
import { ContactAsService } from "./services/contact-as.service";
import { UploadService } from "./services/upload.service";
import { FileDropDirective } from "./directives/file-drop.directive";
import { TasksService } from './services/tasks.service';

@NgModule({
  declarations: [FileDropDirective, UploaderComponent, UploadTaskComponent, FilesListComponent],
  imports: [CommonModule],
  exports: [UploadTaskComponent, UploaderComponent, FilesListComponent],
  providers: [ProfileSettingsService, ContactAsService, TasksService, UploadService]
})
export class FeaturesSharedModule {}
