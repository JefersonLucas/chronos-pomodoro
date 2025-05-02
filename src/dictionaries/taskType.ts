import { CycleModel } from "../models/TaskStateModel"

// Poderia ser também: {[K in keyof CycleModel]: string}
type TaskTypeDictionary = Record<keyof CycleModel, string>

/**
 * Pequeno dicionário para as propriedades:
 * - `workTime`: foco.
 * - `shortBreakTime`: descanso curto.
 * - `longBreakTime`: descanso longo.
 *
 * @example
 * const workTimeTask  = taskTypeDictionary["workTime"]
 * console.log(workTimeTask) // Foco
 * const shortBreakTimeTask = taskTypeDictionary.shortBreakTime
 * console.log(shortBreakTimeTask) // "Descanso curto"
 */
export const taskTypeDictionary: TaskTypeDictionary = {
	workTime: "Foco",
	shortBreakTime: "Descanso curto",
	longBreakTime: "Descanso longo",
}
