import { TaskModel } from "./TaskModel"
import { TaskStateModel } from "./TaskStateModel"

export enum TaskActionTypes {
	START_TASK = "START_TASK",
	COUNT_DOWN = "COUNT_DOWN",
	RESET_STATE = "RESET_STATE",
	INTERRUPT_TASK = "INTERRUPT_TASK",
	COMPLETE_TASK = "COMPLETE_TASK",
}

export type TaskActionsWithPayload =
	| {
			type: TaskActionTypes.START_TASK
			payload: TaskModel
	  }
	| {
			type: TaskActionTypes.COUNT_DOWN
			payload: Pick<TaskStateModel, "secondsRemaining">
	  }

export type TaskActionsWithoutPayload =
	| {
			type: TaskActionTypes.RESET_STATE
	  }
	| {
			type: TaskActionTypes.INTERRUPT_TASK
	  }
	| {
			type: TaskActionTypes.COMPLETE_TASK
	  }

export type TaskActionModel = TaskActionsWithPayload | TaskActionsWithoutPayload
