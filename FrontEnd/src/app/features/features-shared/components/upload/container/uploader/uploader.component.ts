import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges
} from "@angular/core";
import * as _ from "lodash";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../../../../core/reducers";
import { getUser } from "../../../../../../core/selectors/user.selectors";
import * as FileUploadActions from "../../../../../../core/actions/upload-file.actions";
import { DataService } from "../../../../../../shared/services/data.service";
import * as enums from '../../../../enums/enums';

@Component({
  selector: "app-uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.scss"]
})
export class UploaderComponent implements OnInit, OnChanges {
  @Input() filesType ;
  documents: File[] = [];
  images: File[] = [];
  isDarkMode: boolean;
  dropzonActive: boolean;
  isHovering: boolean;
  userUid: string;

  constructor(
    private dataService: DataService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.dataService.currentThemeModeState.subscribe(
      themeState => (this.isDarkMode = themeState)
    );
    this.store.pipe(select(getUser)).subscribe(user => {
      if (user) {
        // console.log(user);
        this.userUid = user.uid;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filesType = changes.filesType.currentValue;
    // console.log(this.filesType);
    // console.log(this.documents);
    // console.log(this.images);
  }

  dropzonState($event: boolean) {
    this.dropzonActive = $event;
  }

  handleDrop(fileList: FileList) {
    if (this.filesType === enums.FileType.Document) {
      for (let i = 0; i < fileList.length; i++) {
        console.log(fileList.item(i));
        this.documents.push(fileList.item(i));
        this.store.dispatch(
          new FileUploadActions.AddDocumentFileAction(fileList.item(i))
        );
      }
      console.log(this.documents);
    } else if (this.filesType === enums.FileType.Image) {
      for (let i = 0; i < fileList.length; i++) {
        console.log(fileList.item(i));
        this.images.push(fileList.item(i));
        this.store.dispatch(
          new FileUploadActions.AddImageFileAction(fileList.item(i))
        );
      }
      console.log(this.images);
    }
  }

  deleteFile(event) {
    if (event) {
      if (this.filesType === enums.FileType.Document) {
        console.log("Delete from documents array");
        console.log(event);
        // Delete from documents array
        this.store.dispatch(
          new FileUploadActions.DeleteDocumentFileAction(event)
        );
        const index = this.documents.indexOf(event);
        delete this.documents[index];
      } else if (this.filesType === enums.FileType.Image) {
        console.log("Delete from images array");
        console.log(event);
        // Delete from images array
        this.store.dispatch(new FileUploadActions.DeleteImageFileAction(event));
        const index = this.images.indexOf(event);
        delete this.images[index];
      }
    }
  }

  onDeleteAllFiles() {
    if (this.filesType === enums.FileType.Document) {
      console.log("Delete all from documents array");
      // Delete all from documents array
      this.store.dispatch(
        new FileUploadActions.DeleteAllDocumentsFilesAction()
      );
      this.documents = [];
    } else if (this.filesType === enums.FileType.Image) {
      console.log("Delete all from images array");
      // Delete all from images array
      this.store.dispatch(new FileUploadActions.DeleteAllImagesFilesAction());
      this.images = [];
    }
  }
}
