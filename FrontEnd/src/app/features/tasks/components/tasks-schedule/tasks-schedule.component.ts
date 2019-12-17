import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Task } from '../../../features-shared/models/task';

@Component({
  selector: "app-tasks-schedule",
  templateUrl: "./tasks-schedule.component.html",
  styleUrls: ["./tasks-schedule.component.scss"]
})
export class TasksScheduleComponent implements OnInit {
  @Input() allTasksList: Array<Task> = [];
  @Input() isDarkMode: boolean;
  @Output() deleteTaskHandler = new EventEmitter<Task>();
  @Output() editTaskHandler = new EventEmitter<Task>();
  @Output() updataTaskStatusHandler = new EventEmitter<any>();
  @Output() handleShowDetails = new EventEmitter<Task>();

  backlogTasks: Array<Task> = [];
  reviewTasks: Array<Task> = [];
  inProgressTasks: Array<Task> = [];
  doneTasks: Array<Task> = [];

  inputEditTask: Task = <Task>{};
  inputv: string;
  editListIndex: number;
  editTaskIndex: number;
  isDarg = false;

  arrPriority: any = [
    { name: "Low", selected: false },
    { name: "Medium", selected: false },
    { name: "High", selected: false },
    { name: "Critical", selected: false }
  ];

  arPriorityPicked: any[] = [];
  arrContiner: any[];

  constructor() {}

  ngOnInit() {
    if (this.allTasksList) {
      this.allTasksList.map(task => {
        if (task.status === "backlog") {
          this.backlogTasks = [...this.backlogTasks, task];
        }
        if (task.status === "inProgress") {
          this.inProgressTasks = [...this.inProgressTasks, task];
        }
        if (task.status === "review") {
          this.reviewTasks = [...this.reviewTasks, task];
        }
        if (task.status === "done") {
          this.doneTasks = [...this.doneTasks, task];
        }
      });

      this.arrContiner = [
        {
          Id: 1,
          Titel: "Backlog",
          label: "backlog",
          Arr: this.backlogTasks
        },
        {
          Id: 2,
          Titel: "In Progress",
          label: "inProgress",
          Arr: this.inProgressTasks
        },
        {
          Id: 3,
          Titel: "Review",
          label: "review",
          Arr: this.reviewTasks
        },
        {
          Id: 4,
          Titel: "Done",
          label: "done",
          Arr: this.doneTasks
        }
      ];
    }
  }

  changeMyDragList($event: any, dropList: any[]) {
    // console.log("change my drag list");
    // console.log($event);
    this.isDarg = true;
    const i = this.arrContiner.indexOf(dropList);
    const taskItem: Task = $event.dragData;
    const deleteIndex = this.arrContiner[i].Arr.indexOf(taskItem);
    this.arrContiner[i].Arr.splice(deleteIndex, 1);
  }

  addToDropList($event: any, dropList: any[]) {
    // console.log("add to drop list");
    // console.log($event);
    this.isDarg = false;
    const i = this.arrContiner.indexOf(dropList);
    const taskItem: Task = $event.dragData;
    this.updataTaskStatusHandler.emit({
      task: taskItem,
      status: this.arrContiner[i].label
    });
    this.arrContiner[i].Arr.push(taskItem);
    // this.arrContiner[i].Arr = [...this.arrContiner[i].Arr, ...taskItem];
  }

  heandelDragStart($event, arrList) {
    // console.log("heandel onDrag Start");
    $event.dataTransfer.effectAllowed = "move";
    // console.log($event);
  }

  heandelDragEnd($event, arrList) {
    // console.log("heandel onDrag end");
    // console.log($event);
  }

  heandelDragEnter($event, arrList) {
    // console.log("heandel onDrag enter");
    // console.log($event);
  }

  heandelDragLeave($event, arrList) {
    // console.log("heandel onDrag Leave");
    // console.log($event);
  }

  editTask(task: Task) {
    // console.log("edit handler");
    this.editTaskHandler.emit(task);
  }

  deleteTask(task: Task) {
    // console.log("delete handler");
    this.deleteTaskHandler.emit(task);
  }

  updataTask(task: Task, status: string) {
    // console.log("updata task handler");
    task.status = status;
  }

  priorityArray(priority) {
    if (priority.selected) {
      this.arPriorityPicked.push(priority.name);
      // console.log(this.arPriorityPicked);
    }
    if (!priority.selected) {
      const aa = this.arPriorityPicked.indexOf(priority.name);
      this.arPriorityPicked.splice(aa, 1);
      // console.log(this.arPriorityPicked);
    }
  }

  onShowDetails(task) {
    this.handleShowDetails.emit(task);
  }
}
