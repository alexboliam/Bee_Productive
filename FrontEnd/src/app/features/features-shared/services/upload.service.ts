import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize, map } from "rxjs/operators";
import { Upload, FileData } from "../models/upload";
import * as helpers from "./helpersFunctions";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../core/reducers";
import * as FileUploadActions from "../../../core/actions/upload-file.actions";
import * as firebase from 'firebase';

@Injectable({
  providedIn: "root"
})
export class UploadService {
  private documentsPath = "documents";
  private imagesPath = "images";
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL;
  private files: Observable<FileData[]>;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private store: Store<AppState>
  ) {}

  getFiles(uid) {
    // this.files =  this.db
    return  this.db
      .collection("files", ref => ref.where("uid", "==", uid))
      .snapshotChanges()
      .pipe(
        map(chages => {
          if (chages.length > 0) {
            return chages.map(file => {
              const fileData = file.payload.doc.data() as any;
              fileData.id = file.payload.doc.id as any;
              return fileData;
            });
          }
        })
      );
      // return this.files[0];
  }

  pushUpload(upload: File, filesType: number, userUid) {
    console.log(upload);
    const path = `${
      filesType === 1 ? this.documentsPath : this.imagesPath
    }/${helpers.gettDateAndTime()}_${upload.name}`;
    // Reference to storage bucket
    const ref = this.storage.ref(path);
    // The main task
    this.task = this.storage.upload(path, upload);
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.task
      .snapshotChanges()
      .pipe(
        // The filews download URL
        finalize(() => {
          ref.getDownloadURL().subscribe(url => {
            // console.log(url);
            this.downloadURL = url;
            console.log(this.downloadURL);
            filesType === 1
              ? this.store.dispatch(
                  new FileUploadActions.SaveUploadDocumentResultAction({
                    id: null,
                    name: upload.name.substr(0, upload.name.lastIndexOf('.')),
                    createdDate: helpers.getDate(),
                    uid: userUid,
                    fileType: filesType,
                    path,
                    url: this.downloadURL
                  })
                )
              : this.store.dispatch(
                  new FileUploadActions.SaveUploadImageResultAction({
                    id: null,
                    name: upload.name,
                    createdDate: helpers.getDate(),
                    uid: userUid,
                    fileType: filesType,
                    path,
                    url: this.downloadURL
                  })
                );
          });
        })
      )
      .subscribe();
  }

  deleteFile(file: FileData) {
    this.deleteFileData(file.id)
      .then(() => {
        this.deleteFileStorage(file.name, file.fileType);
      })
      .catch(error => console.log(error));
  }

  public saveFileData(file) {
    this.db.collection("files").add(file);
  }

  // Writes the file details to the realtime db
  private deleteFileData(key: string) {
    return this.db.doc(`files/${key}`).delete();
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string, fileType) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${fileType === 1 ? this.documentsPath : this.imagesPath}/${name}`).delete();
  }
}
