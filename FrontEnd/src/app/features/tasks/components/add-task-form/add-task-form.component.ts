import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationEvent
} from "@angular/animations";
import { Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../../core/reducers/index";
import {
  getDocumentsFiles,
  getImagesFiles
} from "../../../../core/selectors/upload-file.selectors";
import * as TasksActions from "../../../../core/actions/task.actions";
import { Task, Status } from "../../../features-shared/models/task";
import * as helpers from "../../../features-shared/services/helpersFunctions";
import { Subscription } from 'rxjs';
import { UploadService } from '../../../features-shared/services/upload.service';
import * as _ from 'lodash';
import * as enums from '../../../features-shared/enums/enums';
import { getUser } from '../../../../core/selectors/user.selectors';

@Component({
  selector: "app-add-task-form",
  templateUrl: "./add-task-form.component.html",
  styleUrls: ["./add-task-form.component.scss"],
  animations: [
    trigger("animation", [
      state(
        "visible",
        style({
          transform: "translateX(0)",
          opacity: 1
        })
      ),
      transition("void => *", [
        style({ transform: "translateX(50%)", opacity: 0 }),
        animate("300ms ease-out")
      ]),
      transition("* => void", [
        animate(
          "250ms ease-in",
          style({
            height: 0,
            opacity: 0,
            transform: "translateX(50%)"
          })
        )
      ])
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class AddTaskFormComponent implements OnInit, OnDestroy {
  taskObj: Task = <Task>{};
  errorMessege: any;
  user;
  isDarkMode: boolean;
  priorityAryy = [];
  selectedPriority: any;
  addFilesButton = false;
  filesType = enums.FileType.Document;
  documentsToUpload: File[] = [];
  imagesToUpload: File[] = [];
  private subDocumentsFilesList: Subscription;
  private subImagesFilesList: Subscription;

  constructor(private store: Store<AppState>, private uploadService: UploadService, private router: Router) {}

  ngOnInit() {
    this.selectedPriority = "";
    console.log(this.taskObj);
    this.priorityAryy = helpers.getPriorityArray();
    this.store.pipe(select(getUser)).subscribe(user => {
      if (user) {
        // console.log(user);
        this.user = user;
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
    // if (this.subGetUser) {
    //   this.subGetUser.unsubscribe();
    // }
  }

  createTaskHendler() {
    console.log(this.taskObj);
    console.log(this.selectedPriority);
    if (this.taskObj && this.selectedPriority) {
      const newTask: Task = {
        id: null,
        uid: null,
        title: this.taskObj.title,
        description: this.taskObj.description,
        comment: this.taskObj.comment,
        createdDate: helpers.gettDateAndTime(),
        completedDate: null,
        priority: this.selectedPriority,
        status: Status.backlog,
        attachedFiles: null
      };
      console.log(newTask);
      this.store.dispatch(new TasksActions.CreateTask(newTask));
      this.resetProperties();
    }
  }

  handleSelectedPriority(filterVal: any) {
    console.log(filterVal);
    if (filterVal !== "0") {
      this.selectedPriority = filterVal;
    }
  }
  resetProperties() {
    this.taskObj = <Task>{};
    this.router.navigate([`tasks/schedule`]);
  }

  handleUploadTab(event) {
    console.log(event.index);
    console.log(this.filesType);
    this.filesType = this.filesType === enums.FileType.Document ? enums.FileType.Image : enums.FileType.Document;
  }

  uploadFiles() {
    if (this.filesType === enums.FileType.Document && this.documentsToUpload.length > 0) {
      this.startUpload(this.documentsToUpload);
    } else if (this.filesType === enums.FileType.Image && this.imagesToUpload.length > 0) {
      this.startUpload(this.imagesToUpload);
    }
  }

  startUpload(files) {
    const filesIndex = _.range(files.length);
    _.each(filesIndex, idx => {
      this.uploadService.pushUpload(files[idx], this.filesType, this.user.uid);
    });
  }
}
