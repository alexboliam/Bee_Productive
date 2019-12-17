import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";
import { UploadFileState } from "../reducers/upload-file.reducer";
import { AppState } from "../reducers";

export const getUploadFilesState = (state: AppState) => state.uploadFileState;
export const getMyFiles = createSelector(getUploadFilesState, (state: UploadFileState) => state.myFiles);
export const getDocumentsFiles = createSelector(getUploadFilesState, (state: UploadFileState) => state.documents);
export const getImagesFiles = createSelector(getUploadFilesState, (state: UploadFileState) => state.images);
export const getDocumentsFilesResults = createSelector(getUploadFilesState, (state: UploadFileState) => state.documentsResults);
export const getImagesFilesResults = createSelector(getUploadFilesState, (state: UploadFileState) => state.imagesResults);

