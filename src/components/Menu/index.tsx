import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from "lucide-react"
import styles from "./styles.module.css"

export function Menu() {
	return (
		<nav className={styles.menu}>
			<a className={styles.menuLink} title="Início" href="#">
				<HouseIcon />
			</a>

			<a className={styles.menuLink} title="Histórico" href="#">
				<HistoryIcon />
			</a>

			<a className={styles.menuLink} title="Configurações" href="#">
				<SettingsIcon />
			</a>

			<a className={styles.menuLink} title="Tema" href="#">
				<SunIcon />
			</a>
		</nav>
	)
}
