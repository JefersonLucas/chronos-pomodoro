import { Bounce, ToastContainer } from "react-toastify"
import { useThemeContext } from "../../hooks/useThemeContext"

type MessagesContainerProps = {
	children: React.ReactNode
}

export function MessagesContainer({ children }: MessagesContainerProps) {
	const { state } = useThemeContext()

	const themeStyle = {
		dark: "var(--gray-800)",
		light: "var(--gray-800)",
	}

	return (
		<>
			{children}

			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={true}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme={state}
				transition={Bounce}
				// dark: --gray-800: #181f2e
				// light: --gray-800: #cdd3e1
				toastStyle={{ border: `1px solid ${themeStyle[state]}` }}
			/>
		</>
	)
}
