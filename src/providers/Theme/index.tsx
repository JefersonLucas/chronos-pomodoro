import { useReducer } from "react"
import { ThemeContext } from "../../contexts/Theme"
import { initialThemeState } from "../../contexts/Theme/initialThemeState"
import { themeReducer } from "../../reducers/themeReducer"

type ThemeContextProviderProps = {
	children: React.ReactNode
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
	const [state, dispatch] = useReducer(themeReducer, initialThemeState)

	return (
		<ThemeContext.Provider value={{ state, dispatch }}>
			{children}
		</ThemeContext.Provider>
	)
}
