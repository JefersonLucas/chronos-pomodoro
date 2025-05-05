import "./styles/global.css"
import "./styles/theme.css"

import { MessagesContainer } from "./components/MessagesContainer"
import { TaskContextProvider } from "./providers/Task"
import { ThemeContextProvider } from "./providers/Theme"
import { MainRouter } from "./routers/MainRouter"

export function App() {
	return (
		<TaskContextProvider>
			<ThemeContextProvider>
				<MessagesContainer>
					<MainRouter />
				</MessagesContainer>
			</ThemeContextProvider>
		</TaskContextProvider>
	)
}
