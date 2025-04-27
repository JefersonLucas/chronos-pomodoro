import "./styles/global.css"
import "./styles/theme.css"

import { HomePage } from "./pages/Home"
import { TaskContextProvider } from "./providers/Task"

export function App() {
	return (
		<TaskContextProvider>
			<HomePage />
		</TaskContextProvider>
	)
}
