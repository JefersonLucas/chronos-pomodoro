import styles from "./styles.module.css"

export function Cycles() {
	return (
		<div className={styles.cycles}>
			<span>Ciclos:</span>

			<div className={styles.cycleDots}>
				<span
					title="Trabalho"
					className={`${styles.cycleDot} ${styles.workTime}`}
				></span>
				<span
					title="Descanso curto"
					className={`${styles.cycleDot} ${styles.shortBreakTime}`}
				></span>
				<span
					title="Trabalho"
					className={`${styles.cycleDot} ${styles.workTime}`}
				></span>
				<span
					title="Descanso curto"
					className={`${styles.cycleDot} ${styles.shortBreakTime}`}
				></span>
				<span
					title="Trabalho"
					className={`${styles.cycleDot} ${styles.workTime}`}
				></span>
				<span
					title="Descanso curto"
					className={`${styles.cycleDot} ${styles.shortBreakTime}`}
				></span>
				<span
					title="Trabalho"
					className={`${styles.cycleDot} ${styles.workTime}`}
				></span>
				<span
					title="Descanso longo"
					className={`${styles.cycleDot} ${styles.longBreakTime}`}
				></span>
			</div>
		</div>
	)
}
