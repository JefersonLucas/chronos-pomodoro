import { TaskModel } from "../models/TaskModel"

/**
 * Status de uma tarefa.
 */
type TaskStatus = "Completa" | "Interrompida" | "Em Progresso" | "Abandonada"

/**
 * Verifica a tarefa e retorna o seu status.
 *
 * Temos os seguintes status de uma tarefa:
 * - `"Completa"`: quanto o ciclo de uma tarefa fo concluída.
 * - `"Interrompida"`: quanto o ciclo de uma tarefa fo interrompida pelo usuário.
 * - `"Em Progresso"`: quanto o ciclo de uma tarefa está fase de progresso.
 * - `"Abandonada"`: quanto o ciclo de uma tarefa foi abandonado ou a página foi atualizada. Esse status é importante para evitar que mais de uma tarefa tenha o status de `"Em progresso"`. Para isso é verificado se o `id` da tarefa é o mesmo `id` da propriedade tarefa ativa do estado `activeTask`.
 *
 * @param {TaskModel} task a tarefa.
 * @param {TaskModel} activeTask a tarefa ativa no estado.
 * @returns {TaskStatus} retorna os status da tarefa.
 */
export function getTaskStatus(
	task: TaskModel,
	activeTask: TaskModel | null,
): TaskStatus {
	if (task.completeDate) return "Completa"
	if (task.interruptDate) return "Interrompida"
	if (task.id === activeTask?.id) return "Em Progresso"
	return "Abandonada"
}
