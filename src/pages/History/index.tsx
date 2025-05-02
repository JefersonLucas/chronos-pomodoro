import { TrashIcon } from "lucide-react"
import { Container } from "../../components/Container"
import { DefaultButton } from "../../components/DefaultButton"
import { Heading } from "../../components/Heading"
import { MainTemplate } from "../../templates/Main"

import { useTaskContext } from "../../hooks/useTaskContext"
import { formatDate } from "../../utils/formatDate"
import { getTaskStatus } from "../../utils/getTaskStatus"
import styles from "./styles.module.css"

export function HistoryPage() {
	const { state } = useTaskContext()
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
								<th>Tarefa</th>
								<th>Duração</th>
								<th>Data</th>
								<th>Status</th>
								<th>Tipo</th>
							</tr>
						</thead>

						<tbody>
							{state.tasks.map((task) => {
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
										<td>{task.type}</td>
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
