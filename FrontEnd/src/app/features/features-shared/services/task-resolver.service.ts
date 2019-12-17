import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from "@ngrx/store";
import { AppState } from "../../../core/reducers/index";
import * as TasksActions from "../../../core/actions/task.actions";

@Injectable()
export class TaskResolver implements Resolve<any> {

  constructor(private store: Store<AppState>) { }

  public getNewsStoryContent(taskId) {
    return taskId;
  }

  resolve(route: ActivatedRouteSnapshot) {
    const id: any = route.params['id'];
    console.log(`Resolve : ${id}`);
    this.store.dispatch(new TasksActions.SetCorrentTask(id));
    // return this.getNewsStoryContent(id);
  }
}
