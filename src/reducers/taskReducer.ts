import { initialTaskState } from "../contexts/Task/initialTaskState"
import { TaskActionModel, TaskActionTypes } from "../models/TaskActionModel"
import { TaskStateModel } from "../models/TaskStateModel"
import { getNextCycle } from "../utils/getNextCycle"
import { secondsToMinutes } from "../utils/secondsToMinutes"

/**
 * TypeScript + Reducer
 * - `useReducer`: hook do React que recebe um reducer e um estado inicial;
 * - `reducer`: função que recebe o estado atual e uma ação, e retorna o novo estado;
 * - `state`: o estado atual;
 * - `type`: o tipo da ação, geralmente uma string (pode ser enum, constante, etc);
 * - `action`: a ação disparada, geralmente é um objeto com type e (opcionalmente) payload;
 * - `payload`: os dados extras enviados junto com a action, se necessário para atualizar o estado.
 */
export function taskReducer(state: TaskStateModel, action: TaskActionModel) {
	switch (action.type) {
		case TaskActionTypes.START_TASK: {
			const newTask = action.payload
			const nextCycle = getNextCycle(state.currentCycle)

			// Segundos e Minutos
			const minute = 60 // valor em segundos que representa 1 minuto
			const secondsRemaining = newTask.duration * minute
			const formattedSecondsRemaining = secondsToMinutes(secondsRemaining)

			return {
				...state,
				activeTask: newTask,
				currentCycle: nextCycle,
				secondsRemaining,
				formattedSecondsRemaining,
				tasks: [...state.tasks, newTask],
			}
		}

		case TaskActionTypes.INTERRUPT_TASK: {
			/**
			 * Para atualizar a propriedade `interruptDate` é necessário:
			 *
			 * - recuperar todas as tarefas do estado utilizando o método `map()` nas `tasks`;
			 * - verificar se existe `activeTask` e se o `id` é igual ao `id` da `task` que queremos modificar;
			 * - caso encontrarmos, iremos recuperar todas as informações de `task` e modificar a propriedade `interruptDate` com `Date.now()`;
			 * - retornar `task`.
			 */
			const tasks = state.tasks.map((task) => {
				if (state.activeTask && state.activeTask.id === task.id) {
					return {
						...task,
						interruptDate: Date.now(),
					}
				}
				return task
			})

			return {
				...state,
				activeTask: null,
				secondsRemaining: 0,
				formattedSecondsRemaining: "00:00",
				tasks,
			}
		}

		case TaskActionTypes.COMPLETE_TASK: {
			/**
			 * Para atualizar a propriedade `completeDate` é necessário:
			 *
			 * - recuperar todas as tarefas do estado utilizando o método `map()` nas `tasks`;
			 * - verificar se existe `activeTask` e se o `id` é igual ao `id` da `task` que queremos modificar;
			 * - caso encontrarmos, iremos recuperar todas as informações de `task` e modificar a propriedade `completeDate` com `Date.now()`;
			 * - retornar `task`.
			 */
			const tasks = state.tasks.map((task) => {
				if (state.activeTask && state.activeTask.id === task.id) {
					return {
						...task,
						completeDate: Date.now(),
					}
				}
				return task
			})

			return {
				...state,
				activeTask: null,
				secondsRemaining: 0,
				formattedSecondsRemaining: "00:00",
				tasks,
			}
		}

		case TaskActionTypes.RESET_STATE: {
			return { ...initialTaskState }
		}

		case TaskActionTypes.COUNT_DOWN: {
			const secondsRemaining = action.payload.secondsRemaining
			const formattedSecondsRemaining = secondsToMinutes(secondsRemaining)

			return {
				...state,
				secondsRemaining,
				formattedSecondsRemaining,
			}
		}

		case TaskActionTypes.CHANGE_SETTINGS: {
			return {
				...state,
				cycle: { ...action.payload },
			}
		}
	}
}
