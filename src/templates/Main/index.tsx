import { Container } from "../../components/Container"
import { Footer } from "../../components/Footer"
import { Menu } from "../../components/Menu"

type MainTemplateProps = {
	children: React.ReactNode
}

export function MainTemplate({ children }: MainTemplateProps) {
	return (
		<>
			<Container>
				<Menu />
			</Container>

			{children}

			<Container>
				<Footer />
			</Container>
		</>
	)
}
