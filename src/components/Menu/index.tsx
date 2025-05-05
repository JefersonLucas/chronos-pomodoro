import {
	HistoryIcon,
	HouseIcon,
	MoonIcon,
	SettingsIcon,
	SunIcon,
} from "lucide-react"
import { showMessage } from "../../adapters/showMessage"
import { useThemeContext } from "../../hooks/useThemeContext"
import { ThemeActionType } from "../../models/ThemeActionModel"
import { RouterLink } from "../RouterLink"
import styles from "./styles.module.css"

export function Menu() {
	const { state, dispatch } = useThemeContext()

	const nextThemeIcon = {
		dark: <SunIcon />,
		light: <MoonIcon />,
	}

	const nextThemeText = {
		dark: "claro",
		light: "escuro",
	}

	function handleThemeChange(
		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
	) {
		event.preventDefault() // Não segue o link
		showMessage.dismiss()

		dispatch({ type: ThemeActionType.CHANGE_THEME })
	}

	return (
		<nav className={styles.menu}>
			<RouterLink
				className={styles.menuLink}
				href="/"
				aria-label="Início"
				title="Início"
			>
				<HouseIcon />
			</RouterLink>

			<RouterLink
				className={styles.menuLink}
				href="/history"
				aria-label="Histórico"
				title="Histórico"
			>
				<HistoryIcon />
			</RouterLink>

			<RouterLink
				className={styles.menuLink}
				href="/settings"
				aria-label="Configurações"
				title="Configurações"
			>
				<SettingsIcon />
			</RouterLink>

			<RouterLink
				className={styles.menuLink}
				href="#"
				aria-label={`Mudar para tema ${nextThemeText[state]}`}
				title={`Mudar para tema ${nextThemeText[state]}`}
				onClick={handleThemeChange}
			>
				{nextThemeIcon[state]}
			</RouterLink>
		</nav>
	)
}
