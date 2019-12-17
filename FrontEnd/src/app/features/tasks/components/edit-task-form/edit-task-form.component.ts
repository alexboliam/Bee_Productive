import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Task } from '../../../features-shared/models/task';
import { Upload } from '../../../features-shared/models/upload';

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.scss']
})
export class EditTaskFormComponent implements OnInit {
  @Input() taskObj: Task = <Task>{};
  @Input() isDarkMode: boolean;
  @Input() errorMesseges: any;

  @Output() taskHendler = new EventEmitter<Task>();
  @Output() fileSelected = new EventEmitter<Upload>();

  priorityAryy = ["low", "medium", "high"];
  selectedPriority: any;
  // selectedFile: Upload;

  constructor() {}

  ngOnInit() {
    if (this.taskObj.priority) {
      this.selectedPriority = this.taskObj.priority;
    }
  }

  onSave() {
    if (this.taskObj) {
      this.taskObj.priority = this.selectedPriority
        ? this.selectedPriority
        : this.taskObj.priority;
        console.log(this.taskObj);
      this.taskHendler.emit(this.taskObj);
      this.resetForm();
    }
  }

  resetForm(taskForm?: NgForm) {
    if (taskForm != null) {
      taskForm.resetForm();
    }
  }

  detectFiles(event) {
    const selectedFile = event.target.files[0];
    this.fileSelected.emit(selectedFile);
    console.log(selectedFile);
  }
}
