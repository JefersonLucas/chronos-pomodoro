import { useContext } from "react"
import { ThemeContext } from "../contexts/Theme"

export function useThemeContext() {
	return useContext(ThemeContext)
}
