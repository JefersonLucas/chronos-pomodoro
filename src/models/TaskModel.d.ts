import { TaskStateModel } from "./TaskStateModel"

/**
 * Representa a tarefa.
 * @property {string} id O identificador da tarefa.
 * @property {string} name O nome da tarefa.
 * @property {number} duration A duração da tarefa.
 * @property {number} startDate O momento que iniciou a tarefa.
 * @property {number} completeDate O momento que a tarefa finalizou.
 * @property {number} interruptDate O momento que a tarefa foi interrompida.
 * @property {TaskStateModel["cycle"]} type O tipo de ciclo da tarefa.
 */
export type TaskModel = {
	id: string
	name: string
	duration: number
	startDate: number
	completeDate: number | null // quando o timer chega ao final
	interruptDate: number | null // quando a task for interrompida
	type: keyof TaskStateModel["config"]
}
