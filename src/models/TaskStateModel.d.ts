import { TaskModel } from "./TaskModel"

/**
 * Representa o estado atual de uma tarefa.
 *
 * @property {TaskModel[]} tasks As tarefas.
 * @property {number} secondsRemaining Os segundos restantes para a tarefa ser concluída.
 * @property {number} formattedSecondsRemaining Os segundos restantes formatado no padrão `"mm:ss"`.
 * @property {TaskModel | null} activeTask Tarefa ativa no ciclo, podendo possuir uma tarefa ou não.
 * @property {number} currentCycle O ciclo atual de uma tarefa. Esse propriedade tem o valor que vai de 0 até 8.
 * @property {CycleModel} config Os ciclos e o valor em minutos de cada um.
 */
export type TaskStateModel = {
	tasks: TaskModel[]
	secondsRemaining: number
	formattedSecondsRemaining: string
	activeTask: TaskModel | null
	currentCycle: number
	config: CycleModel
}

/**
 * Representa cada tipo de ciclo de uma tarefa e o valor em minutos de cada um.
 *
 * @property {number} workTime Valor em minutos em um momento de foco.
 * @property {number} shortBreakTime Valor em minutos em um momento descanso curto.
 * @property {number} longBreakTime Valor em minutos em um momento de descanso longo.
 */
type CycleModel = {
	workTime: number
	shortBreakTime: number
	longBreakTime: number
}
