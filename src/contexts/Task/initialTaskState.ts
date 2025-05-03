import { TaskStateModel } from "../../models/TaskStateModel"

/**
 * Estado inicial das tarefas.
 *
 * Aqui temos as propriedades:
 * - `tasks`: array de `tasks` vazio;
 * - `secondsRemaining`: segundos restantes definido como `0`;
 * - `formattedSecondsRemaining`: segundos restantes formatado definido como `"00:00"`;
 * - `activeTask`: tarefa ativa como `null`;
 * - `currentCycle`: ciclo atual como `0`;
 * - `cycle`: objeto do ciclo com valores padrões:
 * 	- `workTime`: ciclo de foco definido para `25` (minutos);
 * 	- `shortBreakTime`: ciclo de descanso curto definido para `5` (minutos);
 * 	- `longBreakTime`: ciclo de descanso longo definido para `15` (minutos).
 */
export const initialTaskState: TaskStateModel = {
	tasks: [],
	secondsRemaining: 0,
	formattedSecondsRemaining: "00:00",
	activeTask: null,
	currentCycle: 0,
	cycle: {
		workTime: 25,
		shortBreakTime: 5,
		longBreakTime: 15,
	},
}
