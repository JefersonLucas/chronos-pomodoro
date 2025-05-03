import { useEffect } from "react"
import { Container } from "../../components/Container"
import { CountDown } from "../../components/CountDown"
import { MainForm } from "../../components/MainForm"
import { MainTemplate } from "../../templates/Main"

export function HomePage() {
	useEffect(() => {
		document.title = "Chronos Pomodoro"
	}, [])
	return (
		<MainTemplate>
			<Container>
				<CountDown />
			</Container>

			<Container>
				<MainForm />
			</Container>
		</MainTemplate>
	)
}
