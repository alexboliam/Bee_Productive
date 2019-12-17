import { getUser } from "../../../core/selectors/user.selectors";
import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../core/reducers/index";
import { Task } from "../models/task";
import { Observable } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: "root"
})
export class TasksService {
  // private URL = './assets/db/to-dos.json';

  // constructor(private http: HttpClient) {}

  // getMyToDos() {
  //   return this.http.get(this.URL);
  // }

  // createToDo(newToDo: any) {
  //   return this.http.post(this.URL, newToDo);
  // }

  // updateToDO(updateToDO: any) {
  //   return this.http.put(this.URL + updateToDO.id, updateToDO);
  // }

  // deleteToDo(id: any) {
  //   return this.http.delete(this.URL + id);
  // }

  // ==============================
  public connectedUser: any;
  private taskDocm: AngularFirestoreDocument<Task>;
  private taskCollection: AngularFirestoreCollection<Task>;
  private tasks: Observable<Task[]>;

  constructor(
    private store: Store<AppState>,
    private firestore: AngularFirestore
  ) {
    this.store.pipe(select(getUser)).subscribe(user => {
      if (user) {
        // console.log(user);
        this.connectedUser = user;
      }
    });
  }

  public getMyTasks() {
    this.tasks = this.firestore
      .collection("tasks", ref => ref.where('uid', '==', this.connectedUser.uid))
      .snapshotChanges()
      .pipe(
        map(chages => {
          return chages.map(task => {
            const taskData = task.payload.doc.data() as Task;
              taskData.id = task.payload.doc.id as any;
              return taskData;
          });
        })
      );
      // console.log(this.tasks);
    return this.tasks;
  }

  public createTask(task: Task) {
    task.uid = this.connectedUser.uid;
    console.log(task);
    return this.firestore.collection("tasks").add(task);
  }

  public updateTask(task: any) {
    this.firestore.doc('tasks/' + task.id).update(task);
  }

  public deleteTask(id) {
    this.firestore.doc('tasks/' + id).delete();
  }
}
