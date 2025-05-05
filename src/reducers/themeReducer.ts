import { ThemeActionModel, ThemeActionType } from "../models/ThemeActionModel"
import { ThemeModel } from "../models/ThemeModel"

export function themeReducer(state: ThemeModel, action: ThemeActionModel) {
	switch (action.type) {
		case ThemeActionType.CHANGE_THEME: {
			return state === "dark" ? "light" : "dark"
		}
		default: {
			return state
		}
	}
}
