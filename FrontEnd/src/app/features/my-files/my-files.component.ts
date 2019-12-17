import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../core/reducers";
import { getUser } from "../../core/selectors/user.selectors";
import {
  getMyFiles,
  getDocumentsFiles,
  getImagesFiles,
  getDocumentsFilesResults,
  getImagesFilesResults
} from "../../core/selectors/upload-file.selectors";
import { DataService } from "./../../shared/services/data.service";
import { UploadService } from "../features-shared/services/upload.service";
import { Subscription } from "rxjs";
import * as _ from "lodash";
import * as enums from "../features-shared/enums/enums";

@Component({
  selector: "app-my-files",
  templateUrl: "./my-files.component.html",
  styleUrls: ["./my-files.component.scss"]
})
export class MyFilesComponent implements OnInit, OnDestroy {
  filesType: number;
  isDarkMode: boolean;
  documentsToUpload: File[] = [];
  imagesToUpload: File[] = [];
  user;
  myFiles: any = [];
  private subDocumentsFilesList: Subscription;
  private subImagesFilesList: Subscription;
  private subFilesResult: Subscription;

  constructor(
    private uploadService: UploadService,
    private dataService: DataService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.filesType = enums.FileType.Document;
    this.dataService.currentThemeModeState.subscribe(themeState => {
      this.isDarkMode = themeState;
    });

    this.store.pipe(select(getUser)).subscribe(user => {
      if (user) {
        // console.log(user);
        this.user = user;
      }
    });

    this.store.pipe(select(getMyFiles)).subscribe(files => {
      if (files.length > 0 && files !== null) {
        // console.log(files);
        this.myFiles = files[0];
        // this.filesType = enums.FileType.FilesList;
      }
    });

    this.subDocumentsFilesList = this.store
      .pipe(select(getDocumentsFiles))
      .subscribe(files => {
        if (files.length > 0) {
          // console.log(files);
          this.documentsToUpload = [...files];
        }
      });

    this.subImagesFilesList = this.store
      .pipe(select(getImagesFiles))
      .subscribe(files => {
        if (files.length > 0) {
          // console.log(files);
          this.imagesToUpload = [...files];
        }
      });
  }

  ngOnDestroy() {
    if (this.subDocumentsFilesList) {
      this.subDocumentsFilesList.unsubscribe();
    }
    if (this.subImagesFilesList) {
      this.subImagesFilesList.unsubscribe();
    }
    if (this.subFilesResult) {
      this.subFilesResult.unsubscribe();
    }
    // if (this.subGetUser) {
    //   this.subGetUser.unsubscribe();
    // }
  }

  handleUploadTab(event) {
    console.log(event.index);
    console.log(this.filesType);
    // this.filesType = this.filesType === 1 ? enums.FileType.Image : enums.FileType.Document;
    this.filesType = event.index;
  }

  handleUploadResult() {
    if (this.filesType === enums.FileType.Document) {
      this.subFilesResult = this.store
        .pipe(select(getDocumentsFilesResults))
        .subscribe(files => {
          if (files.length > 0) {
            // console.log(files);
            files.forEach(file => {
              this.uploadService.saveFileData(file);
            });
          }
        });
    } else if (this.filesType === enums.FileType.Image) {
      this.subFilesResult = this.store
        .pipe(select(getImagesFilesResults))
        .subscribe(files => {
          if (files.length > 0) {
            // console.log(files);
            files.forEach(file => {
              this.uploadService.saveFileData(file);
            });
          }
        });
    }
  }

  uploadFiles() {
    if (
      this.filesType === enums.FileType.Document &&
      this.documentsToUpload.length > 0
    ) {
      this.startUpload(this.documentsToUpload);
    } else if (
      this.filesType === enums.FileType.Image &&
      this.imagesToUpload.length > 0
    ) {
      this.startUpload(this.imagesToUpload);
    }
  }

  startUpload(files) {
    const filesIndex = _.range(files.length);
    _.each(filesIndex, idx => {
      this.uploadService.pushUpload(files[idx], this.filesType, this.user.uid);
    });
    this.handleUploadResult();
  }

  handleDeleteFile(file) {
    this.uploadService.deleteFile(file);
  }
}
