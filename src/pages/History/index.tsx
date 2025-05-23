import { TrashIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Container } from "../../components/Container"
import { DefaultButton } from "../../components/DefaultButton"
import { Heading } from "../../components/Heading"
import { taskTypeDictionary } from "../../dictionaries/taskType"
import { useTaskContext } from "../../hooks/useTaskContext"
import { MainTemplate } from "../../templates/Main"
import { formatDate } from "../../utils/formatDate"
import { getTaskStatus } from "../../utils/getTaskStatus"
import { SortTasksOptions, sortTasks } from "../../utils/sortTasks"

import { showMessage } from "../../adapters/showMessage"
import { TaskActionTypes } from "../../models/TaskActionModel"
import styles from "./styles.module.css"

export function HistoryPage() {
	const { state, dispatch } = useTaskContext()
	const [confirmClearHistory, setConfirmClearHistory] = useState(false)
	const hasTasks = state.tasks.length > 0
	const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(
		() => {
			return {
				tasks: sortTasks({ tasks: state.tasks }),
				field: "startDate",
				direction: "desc",
			}
		},
	)

	function handleSortTasks({ field }: Pick<SortTasksOptions, "field">) {
		const newDirection =
			sortTasksOptions.direction === "asc" ? "desc" : "asc"

		setSortTasksOptions({
			tasks: sortTasks({
				direction: newDirection,
				tasks: sortTasksOptions.tasks,
			}),
			direction: newDirection,
			field,
		})
	}

	function handleResetHistory() {
		showMessage.dismiss()
		showMessage.confirm("Tem certeza?", (confirmation) => {
			setConfirmClearHistory(confirmation)
		})
	}

	useEffect(() => {
		// Fazendo a ordenação quando o estado das tarefas for mudar
		setSortTasksOptions((prevState) => ({
			...prevState,
			tasks: sortTasks({
				tasks: state.tasks,
				direction: prevState.direction,
				field: prevState.field,
			}),
		}))
	}, [state.tasks])

	useEffect(() => {
		if (!confirmClearHistory) return
		// Resetando o estado
		dispatch({ type: TaskActionTypes.RESET_STATE })

		return () => {}
	}, [confirmClearHistory, dispatch])

	useEffect(() => {
		// Fechando as mensagens quando a página é desmontada
		return () => showMessage.dismiss()
	}, [])

	useEffect(() => {
		document.title = "Histórico - Chronos Pomodoro"
	}, [])

	return (
		<MainTemplate>
			<Container>
				<Heading>
					<span>Histórico</span>
					{hasTasks && (
						<span className={styles.buttonContainer}>
							<DefaultButton
								icon={<TrashIcon />}
								color="red"
								aria-label="Apagar todo o histórico"
								title="Apagar histórico"
								onClick={handleResetHistory}
							/>
						</span>
					)}
				</Heading>
			</Container>

			<Container>
				{hasTasks && (
					<div className={styles.responsiveTable}>
						<table>
							<thead>
								<tr>
									<th
										onClick={() =>
											handleSortTasks({ field: "name" })
										}
										className={styles.thSort}
									>
										Tarefa ↕
									</th>
									<th
										onClick={() =>
											handleSortTasks({
												field: "duration",
											})
										}
										className={styles.thSort}
									>
										Duração ↕
									</th>
									<th
										onClick={() =>
											handleSortTasks({
												field: "startDate",
											})
										}
										className={styles.thSort}
									>
										Data ↕
									</th>
									<th>Status</th>
									<th>Tipo</th>
								</tr>
							</thead>

							<tbody>
								{sortTasksOptions.tasks.map((task) => {
									return (
										<tr key={task.id}>
											<td>{task.name}</td>
											<td>{task.duration}min</td>
											<td>
												{formatDate(task.startDate)}
											</td>
											<td>
												{getTaskStatus(
													task,
													state.activeTask,
												)}
											</td>
											<td>
												{taskTypeDictionary[task.type]}
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
				)}
				{!hasTasks && (
					<p style={{ textAlign: "center", fontWeight: "bold" }}>
						Ainda não existem tarefas criadas.
					</p>
				)}
			</Container>
		</MainTemplate>
	)
}
