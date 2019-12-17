import { TasksActionTypes, TasksActions } from "../actions/task.actions";
import { Task } from '../../features/features-shared/models/task';

export interface TasksState {
    tasks: Task[];
    correntTask: Task;
}

export const initialState: TasksState = {
    tasks: [],
    correntTask: null
};

export function tasksReducer(state = initialState, action: TasksActions): TasksState {
    switch (action.type) {
        case TasksActionTypes.LoadTasks_SUCCESS: {
            return {
                ...state,
                tasks: action.tasks
            };
        }
        case TasksActionTypes.CreateTask_SUCCESS: {
            return {
                ...state,
                tasks: [...state.tasks, action.task]
            };
        }

        case TasksActionTypes.EditTask: {
            const { tasks } = state;
            const newTasksState = tasks.map(task => {
                if (task.id !== action.task.id) {
                    return task;
                } else {
                    return action.task;
                }
            });
            return {
                ...state,
                tasks: [...newTasksState]
            };
        }

        case TasksActionTypes.DeleteTask: {
            const { tasks } = state;
            const newTasksState = tasks.filter(task => task.id !== action.taskId);
            return {
                ...state,
                tasks: [...newTasksState]
            };
        }

        case TasksActionTypes.SetCorrentTask: {
            const { tasks } = state;
            const taskResult = tasks.find(task => task.id === action.taskId);
            return {
                ...state,
                correntTask: taskResult
            };
        }

        case TasksActionTypes.InitialState: {
            return initialState;
        }

        default:
            return state;
    }
}
