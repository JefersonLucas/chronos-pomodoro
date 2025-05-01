import "./styles/global.css"
import "./styles/theme.css"

import { HomePage } from "./pages/Home"
import { TaskContextProvider } from "./providers/Task"
import { MessagesContainer } from "./components/MessagesContainer"

export function App() {
	return (
		<TaskContextProvider>
			<MessagesContainer>
				<HomePage />
			</MessagesContainer>
		</TaskContextProvider>
	)
}
