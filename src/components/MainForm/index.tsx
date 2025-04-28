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

	/**
	 * Cria uma nova `task`.
	 *
	 * Para isso, é necessário:
	 *
	 * - recuperar o valor digitado no input;
	 * - verificar valor digitado é válido;
	 * - criar uma nova tarefa baseando no modelo `TaskModel` informando as propriedades:
	 * 	- `id`: identificador da tarefa.
	 * 	- `name`: nome da tarefa.
	 * 	- `duration`: duração da tarefa.
	 * 	- `startDate`: momento que iniciou a tarefa.
	 * 	- `completeDate`: momento que a tarefa finalizou.
	 * 	- `interruptDate`: momento que a tarefa foi interrompida.
	 * 	- `type`: O tipo de ciclo da tarefa.
	 *
	 * Na função `setState`, além de, recuperar as informações do estado iremos atualizar as propriedades:
	 * - `cycle`: os ciclos e o valor em minutos de cada um;
	 * - `activeTask`: tarefa ativa no ciclo;
	 * - `currentCycle`: ciclo atual da tarefa;
	 * - `secondsRemaining`: segundos restantes para a tarefa ser concluída.;
	 * - `tasks`: recuperar todas as tarefas e salvar a tarefa atual;
	 *
	 * @param event esse evento somente é utilizar o método `preventDefault()` para prevenir o recarregamento da página.
	 */
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

		// Segundos e Minutos
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

	/**
	 * Interrompe o ciclo de uma uma tarefa atualizando o estado da aplicação.
	 *
	 * Essa função modifica as seguintes propriedades:
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

		setState((prevState) => {
			/**
			 * Para atualizar a propriedade interruptDate é necessário:
			 *
			 * - recuperar todas as tarefas do estado utilizando o método `map()` nas `tasks`;
			 * - verificar se existe `activeTask` e se o `id` é igual ao `id` da `task` que queremos modificar;
			 * - caso encontrarmos, iremos recuperar todas as informações de `task` e modificar a propriedade `interruptDate` com `Date.now()`;
			 * - retornar `task`.
			 */
			const tasks = prevState.tasks.map((task) => {
				if (
					prevState.activeTask &&
					prevState.activeTask.id === task.id
				) {
					return {
						...task,
						interruptDate: Date.now(),
					}
				}
				return task
			})

			return {
				...prevState,
				activeTask: null,
				secondsRemaining: 0,
				formattedSecondsRemaining: "00:00",
				tasks,
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
