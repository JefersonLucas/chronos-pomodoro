import { useEffect, useReducer } from "react"
import { ThemeContext } from "../../contexts/Theme"
import { initialThemeState } from "../../contexts/Theme/initialThemeState"
import { ThemeModel } from "../../models/ThemeModel"
import { themeReducer } from "../../reducers/themeReducer"

type ThemeContextProviderProps = {
	children: React.ReactNode
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
	const [state, dispatch] = useReducer(
		themeReducer,
		initialThemeState,
		() => {
			// Recuperando do localStorage
			const storageTheme =
				(localStorage.getItem("theme") as ThemeModel) || "dark"
			return storageTheme
		},
	)

	useEffect(() => {
		// Modificando o data attibute data-theme
		document.documentElement.setAttribute("data-theme", state)
		// Salvando no localStorage
		localStorage.setItem("theme", state)
	}, [state])

	return (
		<ThemeContext.Provider value={{ state, dispatch }}>
			{children}
		</ThemeContext.Provider>
	)
}
