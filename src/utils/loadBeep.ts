import beep from "../assets/audios/beep.mp3"

/**
 * Carrega o áudio e retorna uma função executa o áudio.
 * @returns {ReturnType<typeof loadBeep}
 */
export function loadBeep(): () => void {
	// Carregando o áudio
	const audio = new Audio(beep)
	audio.load()

	// Função que executa o áudio
	return () => {
		audio.currentTime = 0 // Áudio volta para o começo
		audio.play().catch((error) => console.log("Erro ao tocar áudio", error))
	}
}
