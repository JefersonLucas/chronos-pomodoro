import { createContext } from "react"
import { ThemeActionModel } from "../../models/ThemeActionModel"
import { ThemeModel } from "../../models/ThemeModel"
import { initialThemeState } from "./initialThemeState"

type ThemeContextProps = {
	state: ThemeModel
	dispatch: React.Dispatch<ThemeActionModel>
}

const initialContextValue = {
	state: initialThemeState,
	dispatch: () => {},
}

export const ThemeContext =
	createContext<ThemeContextProps>(initialContextValue)
