import "./styles/global.css"
import "./styles/theme.css"

import { MessagesContainer } from "./components/MessagesContainer"
import { TaskContextProvider } from "./providers/Task"
import { MainRouter } from "./routers/MainRouter"

export function App() {
	return (
		<TaskContextProvider>
			<MessagesContainer>
				<MainRouter />
			</MessagesContainer>
		</TaskContextProvider>
	)
}
