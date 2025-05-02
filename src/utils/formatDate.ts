import { format } from "date-fns"

/**
 * Formata a data recebendo o tempo em milissegundos para o formato  dd/MM/yyyy HH:mm
 * @param timestamp tempo em milissegundos
 * @returns {string} data no formato dd/MM/yyyy HH:mm
 */
export function formatDate(timestamp: number): string {
	const date = new Date(timestamp)
	return format(date, "dd/MM/yyyy HH:mm")
}
