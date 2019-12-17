export class Upload {
    [x: string]: any;
  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date = new Date();

  constructor(file: File) {
    this.file = file;
  }
}

export interface FileData {
  id: string;
  name: string;
  url: string;
  path: string;
  createdDate: string;
  uid: string;
  fileType: number;
}
