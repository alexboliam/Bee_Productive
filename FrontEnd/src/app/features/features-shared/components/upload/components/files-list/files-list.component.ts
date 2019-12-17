import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-files-list",
  templateUrl: "./files-list.component.html",
  styleUrls: ["./files-list.component.scss"]
})
export class FilesListComponent implements OnInit {
  @Input() filesList;
  collectionView: boolean;
  @Output() deleteFile = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {
    this.collectionView = false;
  }

  onDeleteFile(file) {
    this.deleteFile.emit(file);
  }
}
