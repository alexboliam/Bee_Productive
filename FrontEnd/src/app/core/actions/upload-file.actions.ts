import { Action } from "@ngrx/store";
import { FileData } from '../../features/features-shared/models/upload';

export enum UploadFileActionTypes {
  GRT_MY_FILES = "[FileS] Get My Files",
  GRT_MY_FILES_SUCCESS = "[FileS] Get My Files Success",
  GRT_MY_FILES_FAIL = "[FileS] Get My Files Fail",
  ADD_DOCUMENT_FILE = "[Document File] Add",
  ADD_IMAGE_FILE = "[Image File] Add",
  DELETE_DOCUMENT_FILE = "[Document File] Delete",
  DELETE_IMAGE_FILE = "[Image File] Delete",
  DELETE_ALL_DOCUMENTS_FILES = "[Documents Files] Delete All",
  DELETE_ALL_IMAGES_FILES = "[Images Files] Delete All",
  SAVE_UPLOAD_DOCUMENT_RESULT = "[Document File] Save Upload Result",
  SAVE_UPLOAD_IMAGE_RESULT = "[Image File] Save Upload Result"
}

export class GetMyFilesAction implements Action {
  readonly type = UploadFileActionTypes.GRT_MY_FILES;
  constructor(public userUid: any) {}
}

export class GetMyFilesSuccessAction implements Action {
  readonly type = UploadFileActionTypes.GRT_MY_FILES_SUCCESS;
  constructor(public files: FileData[]) {}
}

export class GetMyFilesFailAction implements Action {
  readonly type = UploadFileActionTypes.GRT_MY_FILES_FAIL;
  constructor(public error: any) {}
}

export class AddDocumentFileAction implements Action {
  readonly type = UploadFileActionTypes.ADD_DOCUMENT_FILE;
  constructor(public file: File) {}
}

export class AddImageFileAction implements Action {
  readonly type = UploadFileActionTypes.ADD_IMAGE_FILE;
  constructor(public file: File) {}
}

export class DeleteDocumentFileAction implements Action {
  readonly type = UploadFileActionTypes.DELETE_DOCUMENT_FILE;
  constructor(public file: File) {}
}

export class DeleteImageFileAction implements Action {
  readonly type = UploadFileActionTypes.DELETE_IMAGE_FILE;
  constructor(public file: File) {}
}

export class DeleteAllDocumentsFilesAction implements Action {
  readonly type = UploadFileActionTypes.DELETE_ALL_DOCUMENTS_FILES;
  constructor() {}
}

export class DeleteAllImagesFilesAction implements Action {
  readonly type = UploadFileActionTypes.DELETE_ALL_IMAGES_FILES;
  constructor() {}
}

export class SaveUploadDocumentResultAction implements Action {
  readonly type = UploadFileActionTypes.SAVE_UPLOAD_DOCUMENT_RESULT;
  constructor(public upload: FileData) {}
}

export class SaveUploadImageResultAction implements Action {
  readonly type = UploadFileActionTypes.SAVE_UPLOAD_IMAGE_RESULT;
  constructor(public upload: FileData) {}
}

export type UploadFileActions =
  | GetMyFilesAction
  | GetMyFilesSuccessAction
  | GetMyFilesFailAction
  | AddDocumentFileAction
  | AddImageFileAction
  | DeleteDocumentFileAction
  | DeleteImageFileAction
  | DeleteAllDocumentsFilesAction
  | DeleteAllImagesFilesAction
  | SaveUploadDocumentResultAction
  | SaveUploadImageResultAction;
