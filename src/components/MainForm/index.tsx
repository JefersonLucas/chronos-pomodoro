import { PlayCircleIcon, StopCircleIcon } from "lucide-react"
import { useRef } from "react"
import { showMessage } from "../../adapters/showMessage"
import { useTaskContext } from "../../hooks/useTaskContext"
import { TaskActionTypes } from "../../models/TaskActionModel"
import { TaskModel } from "../../models/TaskModel"
import { getNextCycle } from "../../utils/getNextCycle"
import { getNextCycleType } from "../../utils/getNextCycleType"
import { Cycles } from "../Cycles"
import { DefaultButton } from "../DefaultButton"
import { DefaultInput } from "../DefaultInput"
import { Tips } from "../Tips"

export function MainForm() {
	const { state, dispatch } = useTaskContext()
	const taskNameInput = useRef<HTMLInputElement>(null)
	const lastTaskName = state.tasks.slice(-1)[0]?.name

	// Ciclos
	const nextCycle = getNextCycle(state.currentCycle)
	const nextCycleType = getNextCycleType(nextCycle)

	/**
	 * Cria uma nova tarefa.
	 *
	 * Para isso, é necessário:
	 *
	 * - recuperar o valor digitado do nome da nova tarefa no input;
	 * - verificar se valor digitado é válido;
	 * - criar uma nova tarefa `newTask` baseando no modelo `TaskModel` informando as propriedades:
	 * 	- `id`: identificador da tarefa.
	 * 	- `name`: nome da tarefa.
	 * 	- `duration`: duração da tarefa.
	 * 	- `startDate`: momento que iniciou a tarefa.
	 * 	- `completeDate`: momento que a tarefa finalizou.
	 * 	- `interruptDate`: momento que a tarefa foi interrompida.
	 * 	- `type`: O tipo de ciclo da tarefa.
	 *
	 * Na função `dispatch()` iremos utilizar no `type` o enum `TaskActionTypes.START_TASK` e enviar a `newTask` no `payload`.
	 *
	 * @param event esse evento somente é utilizar o método `preventDefault()` para prevenir o recarregamento da página.
	 */
	function handleNewTask(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		showMessage.dismiss()

		if (taskNameInput.current === null) return

		const taskName = taskNameInput.current.value.trim()

		if (!taskName) {
			// alert("Digite o nome da tarefa")
			showMessage.warn("Digite o nome da tarefa!")
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

		dispatch({ type: TaskActionTypes.START_TASK, payload: newTask })

		showMessage.success("Tarefa iniciada!")
	}

	/**
	 * Interrompe o ciclo de uma tarefa.
	 *
	 * A função `dispath()` modifica as seguintes propriedades:
	 * - `activeTask`: recebe `null` informando que a tarefa não está mais ativa;
	 * - `secondsRemaining`: recebe `0` informando que não existe mais segundos restantes;
	 * - `formattedSecondsRemaining`: recebe `"00:00"` zerando o contador;
	 * - `tasks`: recebe todas as tarefas do estado modificando a propriedade `interruptDate`.
	 *
	 * @param event esse evento somente é utilizar o método `preventDefault()` para prevenir o recarregamento da página.
	 */
	function handleInterruptTask(
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) {
		event.preventDefault()

		showMessage.dismiss()
		showMessage.error("Tarefa interrompida!")

		dispatch({ type: TaskActionTypes.INTERRUPT_TASK })
	}

	return (
		<form onSubmit={handleNewTask} className="form" action="">
			<div className="formRow">
				<DefaultInput
					labelText="Tarefa"
					id="meuInput"
					type="text"
					title="Descrição"
					placeholder="Digite algo"
					ref={taskNameInput}
					disabled={!!state.activeTask}
					defaultValue={lastTaskName}
				/>
			</div>

			<div className="formRow">
				<Tips />
			</div>

			{state.currentCycle > 0 && (
				<div className="formRow">
					<Cycles />
				</div>
			)}

			<div className="formRow">
				{!state.activeTask && (
					<DefaultButton
						icon={<PlayCircleIcon />}
						color="green"
						aria-label="Iniciar nova tarefa"
						title="Iniciar nova tarefa"
						type="submit"
						key="btn_submit"
					/>
				)}

				{!!state.activeTask && (
					<DefaultButton
						icon={<StopCircleIcon />}
						color="red"
						aria-label="Interromper tarefa atual"
						title="Interromper tarefa atual"
						type="button"
						key="btn_button"
						onClick={handleInterruptTask}
					/>
				)}
			</div>
		</form>
	)
}
