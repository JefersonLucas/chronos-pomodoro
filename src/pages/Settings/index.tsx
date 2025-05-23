import { SaveIcon } from "lucide-react"
import { useEffect, useRef } from "react"
import { showMessage } from "../../adapters/showMessage"
import { Container } from "../../components/Container"
import { DefaultButton } from "../../components/DefaultButton"
import { DefaultInput } from "../../components/DefaultInput"
import { Heading } from "../../components/Heading"
import { useTaskContext } from "../../hooks/useTaskContext"
import { TaskActionTypes } from "../../models/TaskActionModel"
import { MainTemplate } from "../../templates/Main"

export function SettingsPage() {
	const { state, dispatch } = useTaskContext()
	const workTimeInput = useRef<HTMLInputElement>(null)
	const shortBreakTimeInput = useRef<HTMLInputElement>(null)
	const longBreakTimeInput = useRef<HTMLInputElement>(null)

	function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		showMessage.dismiss()

		const formErrors = []

		const workTime = Number(workTimeInput.current?.value)
		const shortBreakTime = Number(shortBreakTimeInput.current?.value)
		const longBreakTime = Number(longBreakTimeInput.current?.value)

		if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
			formErrors.push("Digite apenas números para TODOS os campos")
		}

		if (workTime < 1 || workTime > 99) {
			formErrors.push("Digite valores entre 1 e 99 para foco")
		}

		if (shortBreakTime < 1 || shortBreakTime > 30) {
			formErrors.push("Digite valores entre 1 e 30 para descanso curto")
		}

		if (longBreakTime < 1 || longBreakTime > 60) {
			formErrors.push("Digite valores entre 1 e 60 para descanso longo")
		}

		if (formErrors.length > 0) {
			formErrors.forEach((error) => {
				showMessage.error(error)
			})
			return
		}

		dispatch({
			type: TaskActionTypes.CHANGE_SETTINGS,
			payload: { workTime, shortBreakTime, longBreakTime },
		})

		showMessage.success("Configurações salvas")
	}

	useEffect(() => {
		document.title = "Configurações - Chronos Pomodoro"
	}, [])

	return (
		<MainTemplate>
			<Container>
				<Heading>Configurações</Heading>
			</Container>

			<Container>
				<p style={{ textAlign: "center" }}>
					Modifique as configurações para tempo de foco, descanso
					curso e descanso longo.
				</p>
			</Container>

			<Container>
				<form onSubmit={handleSaveSettings} className="form">
					<div className="formRow">
						<DefaultInput
							id="workTime"
							labelText="Foco (minutos)"
							type="number"
							ref={workTimeInput}
							defaultValue={state.cycle.workTime}
						/>
						<div className="formRow"></div>

						<DefaultInput
							id="shortBreakTime"
							labelText="Descanso curto (minutos)"
							ref={shortBreakTimeInput}
							type="number"
							defaultValue={state.cycle.shortBreakTime}
						/>
						<div className="formRow"></div>

						<DefaultInput
							id="longBreakTime"
							labelText="Descanso longo (minutos)"
							type="number"
							ref={longBreakTimeInput}
							defaultValue={state.cycle.longBreakTime}
						/>
					</div>
					<div className="formRow">
						<DefaultButton
							icon={<SaveIcon />}
							aria-label="Salvar configurações"
							title="Salvar configurações"
							type="submit"
						/>
					</div>
				</form>
			</Container>
		</MainTemplate>
	)
}
