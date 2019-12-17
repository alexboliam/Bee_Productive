import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Subscription } from "rxjs";
import * as TasksActions from "../../../../core/actions/task.actions";
import * as helpers from '../../../../features/features-shared/services/helpersFunctions';
import { Task, Status } from '../../../../features/features-shared/models/task';
import { AppState } from '../../../../core/reducers';
import { TasksService } from '../../../../features/features-shared/services/tasks.service';
import { DataService } from '../../../../shared/services/data.service';
import { getTasksList } from '../../../../core/selectors/tasks.selectors';

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"]
})
export class TasksComponent implements OnInit, OnDestroy {
  allTasks: Task[] = [];
  taskObj: Task = <Task>{};
  selectedTask: Task = <Task>{};
  showDetails = false;
  formDialogOpne = false;
  isNewTask = true;
  deleteDialogOpne = false;
  errorMessege: any;
  searchTitle: string;
  filteGrenres: any[];
  isDarkMode: boolean;
  private subGetTasksList: Subscription;
  private subGetUser: Subscription;

  constructor(
    private store: Store<AppState>,
    private tasksService: TasksService,
    private dataService: DataService
  ) {

  }

  ngOnInit() {
    this.dataService.currentThemeModeState.subscribe(
      themeState => (this.isDarkMode = themeState)
    );
    this.store.dispatch(new TasksActions.LoadTasks());
    this.subGetTasksList = this.store
      .pipe(select(getTasksList))
      .subscribe(tasks => {
        if (tasks.length) {
          // console.log(tasks);
          this.allTasks = tasks;
        }
      });
  }

  ngOnDestroy() {
    if (this.subGetTasksList) {
      this.subGetTasksList.unsubscribe();
    }
    if (this.subGetUser) {
      this.subGetUser.unsubscribe();
    }
  }

  editTaskHandler(task) {
    this.taskObj = Object.assign({}, task);
    this.isNewTask = false;
    this.formDialogOpne = true;
  }

  deleteTaskHendler(task) {
    this.taskObj = Object.assign({}, task);
    this.deleteDialogOpne = true;
  }

  onDeleteTask() {
    this.store.dispatch(new TasksActions.DeleteTask(this.taskObj.id));
    this.deleteDialogOpne = false;
  }

  taskFormHendler(event) {
    if (this.isNewTask) {
      this.createTaskHendler(event);
    } else {
      this.onEditTask(event);
    }
  }

  private onEditTask(task) {
    this.store.dispatch(new TasksActions.EditTask(task));
    this.formDialogOpne = false;
  }

  private createTaskHendler(task) {
    // console.log(task);
    const newTask: Task = {
      id: task.id ? task.id : null,
      uid: task.uId,
      title: task.title,
      description: task.description,
      comment: task.comment,
      createdDate: helpers.getDate(),
      completedDate: null,
      priority: task.priority,
      status: Status.backlog,
      attachedFiles: null
    };
    this.tasksService.createTask(newTask);
  }

  updataTaskStatus(event) {
    const task = event.task;
    task.status = event.status;
    this.store.dispatch(new TasksActions.EditTask(task));
  }

  openDialog() {
    this.formDialogOpne = true;
    this.isNewTask = true;
    this.taskObj = <Task>{};
  }

  showTaskDetails(event) {
    this.showDetails = true;
    this.selectedTask = event;
  }

  onCloseDetails($event) {
    this.showDetails = false;
  }

  resetProperties() {
    this.formDialogOpne = false;
    this.taskObj = <Task>{};
  }

}
