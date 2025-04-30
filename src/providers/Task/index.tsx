import { useEffect, useReducer } from "react"
import { TaskContext } from "../../contexts/Task"
import { initialTaskState } from "../../contexts/Task/initialTaskState"
import { TaskActionTypes } from "../../models/TaskActionModel"
import { taskReducer } from "../../reducers/taskReducer"
import { TimerWorkerManager } from "../../workers/TimerWorkerManager"

type TaskContextProviderProps = {
	children: React.ReactNode
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
	const [state, dispatch] = useReducer(taskReducer, initialTaskState)

	const worker = TimerWorkerManager.getInstance()

	worker.onmessage((event) => {
		// Contador decrescente do Worker
		const countDownSeconds = event.data

		// Valida se o contador finalizou
		if (countDownSeconds <= 0) {
			dispatch({
				type: TaskActionTypes.COMPLETE_TASK,
			})
			worker.terminate()
		} else {
			dispatch({
				type: TaskActionTypes.COUNT_DOWN,
				payload: { secondsRemaining: countDownSeconds },
			})
		}
	})

	useEffect(() => {
		console.log(state)

		if (!state.activeTask) {
			console.log("Worker terminado por falta de activeTask")
			worker.terminate()
		}

		worker.postMessage(state)
	}, [worker, state])

	return (
		<TaskContext.Provider value={{ state, dispatch }}>
			{children}
		</TaskContext.Provider>
	)
}
