import {
	HistoryIcon,
	HouseIcon,
	MoonIcon,
	SettingsIcon,
	SunIcon,
} from "lucide-react"
import { useEffect, useState } from "react"
import { RouterLink } from "../RouterLink"
import styles from "./styles.module.css"

type AvailableThemes = "dark" | "light"

export function Menu() {
	const [theme, setTheme] = useState<AvailableThemes>(() => {
		// Recuperando do localStorage
		const storageTheme =
			(localStorage.getItem("theme") as AvailableThemes) || "dark"
		return storageTheme
	})

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

		setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))
	}

	useEffect(() => {
		// Modificando o data attibute data-theme
		document.documentElement.setAttribute("data-theme", theme)
		// Salvando no localStorage
		localStorage.setItem("theme", theme)
	}, [theme])

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
				aria-label={`Mudar para tema ${nextThemeText[theme]}`}
				title={`Mudar para tema ${nextThemeText[theme]}`}
				onClick={handleThemeChange}
			>
				{nextThemeIcon[theme]}
			</RouterLink>
		</nav>
	)
}
