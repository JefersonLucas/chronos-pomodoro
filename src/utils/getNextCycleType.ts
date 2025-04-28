import { TaskModel } from "../models/TaskModel"

/**
 * Essa função recebe o número do `currentCycle` e retorna o tipo do próximo ciclo.
 * 
 * Se o valor do `currentCycle` for `0` ou um número par, irá retornar `"shortBreakTime"`.
 * Se não for, isso quer dizer que o valor do `currentCycle` for `1` ou número impar, retornando `"workTime"`.
 * Quando o valor do `currentCycle` for igual a `8` irá retornar `"longBreakTime"`.

 * @example
 * // retorna "workTime"
 * const nextCycleType = getNextCycleType(0)
 * // retorna "shortBreakTime"
 * const nextCycleType = getNextCycleType(1)
 * // retorna "workTime"
 * const nextCycleType = getNextCycleType(2)
 * // retorna "longBreakTime"
 * const nextCycleType = getNextCycleType(8)
 *
 * @param {number} currentCycle valor do ciclo atual.
 * @returns {TaskModel["type"]} o tipo da tarefa.
 */
export function getNextCycleType(currentCycle: number): TaskModel["type"] {
	const isLongBreakTime = currentCycle % 8 === 0
	const isShortBreakTime = currentCycle % 2 === 0

	if (isLongBreakTime) return "longBreakTime"
	if (isShortBreakTime) return "shortBreakTime"
	return "workTime"
}
