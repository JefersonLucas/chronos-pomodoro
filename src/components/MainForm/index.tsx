import { PlayCircleIcon } from "lucide-react"
import { Cycles } from "../Cycles"
import { DefaultButton } from "../DefaultButton"
import { DefaultInput } from "../DefaultInput"
import { useRef } from "react"
import { TaskModel } from "../../models/TaskModel"
import { useTaskContext } from "../../hooks/useTaskContext"
import { getNextCycle } from "../../utils/getNextCycle"
import { getNextCycleType } from "../../utils/getNextCycleType"

export function MainForm() {
	const { state, setState } = useTaskContext()
	const taskNameInput = useRef<HTMLInputElement>(null)

	// Ciclos
	const nextCycle = getNextCycle(state.currentCycle)
	const nextCycleType = getNextCycleType(nextCycle)

	function handleNewTask(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()

		if (taskNameInput.current === null) return

		const taskName = taskNameInput.current.value.trim()

		if (!taskName) {
			alert("Digite o nome da tarefa")
			return
		}

		const newTask: TaskModel = {
			id: Date.now().toString(),
			name: taskName,
			startDate: Date.now(),
			completeDate: null,
			interruptDate: null,
			duration: state.cycle[nextCycleType],
			type: nextCycleType,
		}

		const secondsRemaining = newTask.duration * 60

		setState((prevState) => {
			return {
				...prevState,
				cycle: { ...prevState.cycle },
				activeTask: newTask,
				currentCycle: nextCycle,
				secondsRemaining, // Conferir
				formattedSecondsRemaining: "00:00", // Conferir
				tasks: [...prevState.tasks, newTask],
			}
		})
	}

	return (
		<form onSubmit={handleNewTask} className="form" action="">
			<div className="formRow">
				<DefaultInput
					labelText="Task"
					id="meuInput"
					type="text"
					title="Descrição"
					placeholder="Digite algo"
					ref={taskNameInput}
				/>
			</div>

			<div className="formRow">
				<p>Lorem ipsum dolor sit amet.</p>
			</div>

			<div className="formRow">
				<Cycles />
			</div>

			<div className="formRow">
				<DefaultButton
					icon={<PlayCircleIcon />}
					color="green"
					title="Iniciar"
				/>
			</div>
		</form>
	)
}
