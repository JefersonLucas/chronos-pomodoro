import { TrashIcon } from "lucide-react"
import { useState } from "react"
import { Container } from "../../components/Container"
import { DefaultButton } from "../../components/DefaultButton"
import { Heading } from "../../components/Heading"
import { MainTemplate } from "../../templates/Main"

import { taskTypeDictionary } from "../../dictionaries/taskType"
import { useTaskContext } from "../../hooks/useTaskContext"
import { formatDate } from "../../utils/formatDate"
import { getTaskStatus } from "../../utils/getTaskStatus"
import { SortTasksOptions, sortTasks } from "../../utils/sortTasks"
import styles from "./styles.module.css"

export function HistoryPage() {
	const { state } = useTaskContext()
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

	return (
		<MainTemplate>
			<Container>
				<Heading>
					<span>Histórico</span>
					<span className={styles.buttonContainer}>
						<DefaultButton
							icon={<TrashIcon />}
							color="red"
							aria-label="Apagar todo o histórico"
							title="Apagar histórico"
						/>
					</span>
				</Heading>
			</Container>

			<Container>
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
										handleSortTasks({ field: "duration" })
									}
									className={styles.thSort}
								>
									Duração ↕
								</th>
								<th
									onClick={() =>
										handleSortTasks({ field: "startDate" })
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
										<td>{formatDate(task.startDate)}</td>
										<td>
											{getTaskStatus(
												task,
												state.activeTask,
											)}
										</td>
										<td>{taskTypeDictionary[task.type]}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</Container>
		</MainTemplate>
	)
}
