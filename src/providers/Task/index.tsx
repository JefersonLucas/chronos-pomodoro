import { useEffect, useState } from "react"
import { initialTaskState } from "../../contexts/Task/initialTaskState"
import { TaskContext } from "../../contexts/Task"

type TaskContextProviderProps = {
	children: React.ReactNode
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
	const [state, setState] = useState(initialTaskState)

	useEffect(() => {
		console.log(state)
	}, [state])

	return (
		<TaskContext.Provider value={{ state, setState }}>
			{children}
		</TaskContext.Provider>
	)
}
