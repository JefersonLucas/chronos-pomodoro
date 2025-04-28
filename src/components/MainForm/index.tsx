import { PlayCircleIcon, StopCircleIcon } from "lucide-react"
import { Cycles } from "../Cycles"
import { DefaultButton } from "../DefaultButton"
import { DefaultInput } from "../DefaultInput"
import { useRef } from "react"
import { TaskModel } from "../../models/TaskModel"
import { useTaskContext } from "../../hooks/useTaskContext"
import { getNextCycle } from "../../utils/getNextCycle"
import { getNextCycleType } from "../../utils/getNextCycleType"
import { secondsToMinutes } from "../../utils/secondsToMinutes"

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

		const minute = 60 // valor em segundos que representa 1 minuto
		const secondsRemaining = newTask.duration * minute // ex.: 5 * 60 = 300 (segundos)
		const formattedSecondsRemaining = secondsToMinutes(secondsRemaining)

		setState((prevState) => {
			return {
				...prevState,
				cycle: { ...prevState.cycle },
				activeTask: newTask,
				currentCycle: nextCycle,
				secondsRemaining,
				formattedSecondsRemaining,
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
					disabled={!!state.activeTask}
				/>
			</div>

			<div className="formRow">
				<p>Próximo intervalo é de 25min.</p>
			</div>

			{state.currentCycle > 0 && (
				<div className="formRow">
					<Cycles />
				</div>
			)}

			<div className="formRow">
				{!state.activeTask ? (
					<DefaultButton
						icon={<PlayCircleIcon />}
						color="green"
						aria-label="Iniciar nova tarefa"
						title="Iniciar nova tarefa"
						type="submit"
					/>
				) : (
					<DefaultButton
						icon={<StopCircleIcon />}
						color="red"
						aria-label="Interromper tarefa atual"
						title="Interromper tarefa atual"
						type="button"
					/>
				)}
			</div>
		</form>
	)
}
