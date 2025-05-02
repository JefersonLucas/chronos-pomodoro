import { useEffect, useReducer, useRef } from "react"
import { TaskContext } from "../../contexts/Task"
import { initialTaskState } from "../../contexts/Task/initialTaskState"
import { TaskActionTypes } from "../../models/TaskActionModel"
import { TaskStateModel } from "../../models/TaskStateModel"
import { taskReducer } from "../../reducers/taskReducer"
import { loadBeep } from "../../utils/loadBeep"
import { TimerWorkerManager } from "../../workers/TimerWorkerManager"

type TaskContextProviderProps = {
	children: React.ReactNode
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
	const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
		const storageState = localStorage.getItem("state")

		if (storageState === null) return initialTaskState

		const parsedStorageState = JSON.parse(storageState) as TaskStateModel

		return {
			...parsedStorageState,
			// Zerando as propriedades para evitar bugs quando atualiza a página
			activeTask: null,
			secondsRemaining: 0,
			formattedSecondsRemaining: "00:00",
		}
	})

	const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null)

	const worker = TimerWorkerManager.getInstance()

	worker.onmessage((event) => {
		// Contador decrescente do Worker
		const countDownSeconds = event.data

		// Valida se o contador finalizou
		if (countDownSeconds <= 0) {
			if (playBeepRef.current) {
				// Tocando o áudio
				playBeepRef.current()
				// Zera o áudio
				playBeepRef.current = null
			}

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

	// Worker
	useEffect(() => {
		// Salva o estado no localStorage
		localStorage.setItem("state", JSON.stringify(state))

		if (!state.activeTask) {
			console.log("Worker terminado por falta de activeTask")
			worker.terminate()
		}

		// Atualiza o título da página
		document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`

		worker.postMessage(state)
	}, [worker, state])

	// Áudio
	useEffect(() => {
		if (state.activeTask && playBeepRef.current === null) {
			// Carrega o áudio
			playBeepRef.current = loadBeep()
		} else {
			// Zera o áudio
			playBeepRef.current = null
		}
	}, [state.activeTask])

	return (
		<TaskContext.Provider value={{ state, dispatch }}>
			{children}
		</TaskContext.Provider>
	)
}
