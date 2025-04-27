import { useContext } from "react"
import { TaskContext } from "../contexts/Task"

export function useTaskContext() {
	return useContext(TaskContext)
}
