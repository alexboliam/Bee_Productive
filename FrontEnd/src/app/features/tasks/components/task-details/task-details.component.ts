import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { Task } from '../../../features-shared/models/task';
import { AppState } from '../../../../core/reducers';

@Component({
  selector: "app-task-details",
  templateUrl: "./task-details.component.html",
  styleUrls: ["./task-details.component.scss"]
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  @Input() correntTask: Task;
  @Output() handleCloseDetails = new EventEmitter<boolean>();
  private subGetCorrentTask: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }
  onEditTask() {}

  closeDetails() {
    this.handleCloseDetails.emit(false);
  }
}
