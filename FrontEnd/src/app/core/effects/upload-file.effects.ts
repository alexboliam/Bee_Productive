import { Injectable, Pipe } from "@angular/core";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store, select } from "@ngrx/store";
import { Observable, of } from "rxjs";
import {
  map,
  mergeMap,
  catchError,
  concatMap,
  takeUntil
} from "rxjs/operators";
import {serializeError} from "serialize-error";
import { AppState } from "../reducers/index";
import * as UploadFileActions from "../actions/upload-file.actions";
import { UploadService } from "../../features/features-shared/services/upload.service";
import { getUser } from "../selectors/user.selectors";

@Injectable()
export class UploadFileEffects {
  constructor(
    private uploadService: UploadService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  @Effect()
  loadFiles$: Observable<Action> = this.actions$.pipe(
    ofType<UploadFileActions.GetMyFilesAction>(
      UploadFileActions.UploadFileActionTypes.GRT_MY_FILES
    ),
    mergeMap((action) =>
      this.uploadService.getFiles(action.userUid).pipe(
        map(
          (files: any[]) => new UploadFileActions.GetMyFilesSuccessAction(files)
        ),
        catchError(err => of(new UploadFileActions.GetMyFilesFailAction(err)))
      )
    )
  );

  // private getUserUid() {
  //   return this.store.pipe(select(getUser)).subscribe(user => user.uid);
  // }
}
