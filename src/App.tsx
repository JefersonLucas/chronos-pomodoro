import "./styles/global.css"
import "./styles/theme.css"

import { PlayCircleIcon } from "lucide-react"

import { Container } from "./components/Container"
import { CountDown } from "./components/CountDown"
import { Cycles } from "./components/Cycles"
import { DefaultButton } from "./components/DefaultButton"
import { DefaultInput } from "./components/DefaultInput"
import { Footer } from "./components/Footer"
import { Logo } from "./components/Logo"
import { Menu } from "./components/Menu"

export function App() {
	return (
		<>
			<Container>
				<Logo />
			</Container>

			<Container>
				<Menu />
			</Container>

			<Container>
				<CountDown />
			</Container>

			<Container>
				<form className="form" action="">
					<div className="formRow">
						<DefaultInput
							labelText="Task"
							id="meuInput"
							type="text"
							title="Descrição"
							placeholder="Digite algo"
						/>
					</div>

					<div className="formRow">
						<p>Lorem ipsum dolor sit amet.</p>
					</div>

					<div className="formRow">
						<Cycles />
					</div>

					<div className="formRow">
						<DefaultButton
							icon={<PlayCircleIcon />}
							color="green"
							title="Iniciar"
						/>
					</div>
				</form>
			</Container>

			<Container>
				<Footer />
			</Container>
		</>
	)
}
