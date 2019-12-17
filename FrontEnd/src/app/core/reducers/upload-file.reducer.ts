import {
  UploadFileActions,
  UploadFileActionTypes
} from "../actions/upload-file.actions";

export interface UploadFileState {
  myFiles: any[];
  documents: any[];
  images: any[];
  documentsResults: any[];
  imagesResults: any[];
}

export const initialState: UploadFileState = {
  myFiles: [],
  documents: [],
  images: [],
  documentsResults: [],
  imagesResults: []
};

export function uploadFileReducer(
  state = initialState,
  action: UploadFileActions
): UploadFileState {
  switch (action.type) {
    case UploadFileActionTypes.GRT_MY_FILES_SUCCESS: {
      // console.log(action.files);
      return {
        ...state,
        myFiles: [...state.myFiles, action.files]
      };
    }
    // ***DOCUMENT***
    case UploadFileActionTypes.ADD_DOCUMENT_FILE: {
      // console.log(action.file);
      return {
        ...state,
        documents: [...state.documents, action.file]
      };
    }
    case UploadFileActionTypes.DELETE_DOCUMENT_FILE: {
      // console.log(action.file);
      const { documents } = state;
      const newDocumentsState = documents.filter(file => file.name !== action.file.name);
      return {
        ...state,
        documents: [...newDocumentsState]
      };
    }
    case UploadFileActionTypes.DELETE_ALL_DOCUMENTS_FILES: {
      return {
        ...state,
        documents: []
      };
    }

    case UploadFileActionTypes.SAVE_UPLOAD_DOCUMENT_RESULT: {
      // console.log(action.upload);
      return {
        ...state,
        documentsResults: [...state.documentsResults, action.upload]
      };
    }

    // ***IMAGE***
    case UploadFileActionTypes.ADD_IMAGE_FILE: {
      // console.log(action.file);
      return {
        ...state,
        images: [...state.images, action.file]
      };
    }
    case UploadFileActionTypes.DELETE_IMAGE_FILE: {
      // console.log(action.file);
      const { images } = state;
      const newImagesState = images.filter(file => file.name !== action.file.name);
      return {
        ...state,
        images: [...newImagesState]
      };
    }
    case UploadFileActionTypes.DELETE_ALL_IMAGES_FILES: {
      return {
        ...state,
        images: []
      };
    }

    case UploadFileActionTypes.SAVE_UPLOAD_IMAGE_RESULT: {
      // console.log(action.upload);
      return {
        ...state,
        imagesResults: [...state.imagesResults, action.upload]
      };
    }

    default:
      return state;
  }
}
