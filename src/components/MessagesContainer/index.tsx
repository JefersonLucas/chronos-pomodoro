import { Bounce, ToastContainer } from "react-toastify"

type MessagesContainerProps = {
	children: React.ReactNode
}

export function MessagesContainer({ children }: MessagesContainerProps) {
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
				theme="light"
				transition={Bounce}
				// dark: --gray-800: #181f2e
				// light: --gray-800: #cdd3e1
				toastStyle={{ border: "1px solid #181f2e" }}
			/>
		</>
	)
}
