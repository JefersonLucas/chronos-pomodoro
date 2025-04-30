/**
 * Essa variável é utilizada para evitar que um novo Worker seja executado.
 */
let isRunning = false

self.onmessage = function (event) {
	// Prevenindo que mais de um Worker seja executado
	if (isRunning) return

	isRunning = true

	// Estado envidado para o worker no TaskContextProvider
	const state = event.data
	const { activeTask, secondsRemaining } = state

	const miliseconds = 1000
	const endDate = activeTask.startDate + secondsRemaining * miliseconds // Quando irá terminar
	const currentDate = Date.now()

	// Contador decrescente de segundos
	let countDownSeconds = Math.ceil((endDate - currentDate) / miliseconds)

	/**
	 * Essa função utiliza a recursividade com a função `setTimeout()` para atualizar ao contador a cada segundo.
	 *
	 * @returns {never}
	 */
	function tickTac() {
		self.postMessage(countDownSeconds) // O contador é exibido primeiro antes de começar a subtrair

		// Atualiza o contador
		const currentDate = Date.now() // Busca uma nova data atual
		countDownSeconds = Math.floor((endDate - currentDate) / miliseconds)

		// Utlizando o timeout para atualizar em 1 em 1 segundo
		setTimeout(tickTac, miliseconds)
	}

	tickTac()
}
