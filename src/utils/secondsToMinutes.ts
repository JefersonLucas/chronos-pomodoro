/**
 * Recebe um valor em segundos e converte no formato `"mm:ss"`.
 
 * @example
 * // return "05:00"
 * const formattedMinutes = secondsToMinutes(300)
 * // return "15:00"
 * const formattedMinutes = secondsToMinutes(900) 
 * // return "25:00"
 * const formattedMinutes = secondsToMinutes(1500)
 * @param secondsRemaining Os segundos restantes.
 * @returns Os segundos em minutos no formato `"mm:ss"`
 */

export function secondsToMinutes(secondsRemaining: number): string {
	const minutes = String(Math.floor(secondsRemaining / 60)).padStart(2, "0")
	const seconds = String(Math.floor(secondsRemaining % 60)).padStart(2, "0")

	return `${minutes}:${seconds}`
}
