export interface Tasks {
  newTasksList: Task[];
  activeTasksList: Task[];
  inProgressTasksList: Task[];
  closeTasksLise: Task[];
}

export interface Task {
  id: string;
  uid: string;
  title: string;
  description?: string;
  comment?: string;
  createdDate: any;
  completedDate: any;
  priority: Priority;
  status: string;
  attachedFiles?: FileObj[];
}

export enum Priority {
  low = 1,
  medium = 2,
  high = 3

}

export enum Status {
  backlog = 'backlog',
  review = 'review',
  inProgress = 'inProgress',
  done = 'done'
}

interface FileObj {
  url: string;
  name: string;
}
