import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import * as _ from "lodash";


@Component({
  selector: "app-upload-task",
  templateUrl: "./upload-task.component.html",
  styleUrls: ["./upload-task.component.scss"]
})
export class UploadTaskComponent implements OnInit, OnChanges {
  @Input() file: File;
  @Output() handleDeleteFile = new EventEmitter<any>();
  filesIcons = [];

  constructor() {}

  ngOnInit() {
    // console.log(this.filesType)
    this.filesIcons = [
      { type: ["word", "docx"], icon: "fa fa-file-word-o" },
      { type: ["powerpoint", "pptx"], icon: "fa fa-file-powerpoint-o" },
      { type: ["pdf"], icon: "fa fa-file-pdf-o" },
      { type: ["code", "ts", "js"], icon: "fa fa-file-code-o" },
      { type: ["excel", "xlsx‬"], icon: "fa fa-file-excel-o" },
      {
        type: ["png", "jpg", "svg", "gif", "jpeg"],
        icon: "fa fa-file-image-o"
      },
      { type: ["video"], icon: "fa fa-file-video-o" },
      { type: ["download"], icon: "fa fa-file-download-o" }
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.filesType = changes.filesType.currentValue;
    if (changes.file.currentValue !== undefined) {
      this.file = changes.file.currentValue;
      // console.log(this.file);
    } else {
      this.file = null;
    }
  }

  deleteFile() {
    if (this.file) {
      this.handleDeleteFile.emit(this.file);
    }
  }

  getFileIcon(file): string {
    // let x = "";
    const y = this.filesIcons.find(item => {
      const term = file.name.split(".");
      if (item.type.includes(term[1])) {
        // console.log(`${item.type === file.type}`);
        // x = item.icon;
        return item.icon;
      }
    });
    // console.log(x);
    // return x;
    return y;
  }

}
