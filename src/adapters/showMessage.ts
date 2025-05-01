import { toast } from "react-toastify"

/**
 * Um [adapter](https://refactoring.guru/design-patterns/adapter) para o [React-toastify](https://fkhadra.github.io/react-toastify/introduction).
 *
 * @property {} success Mensagem de sucesso.
 * @property {} error Mensagem de erro.
 * @property {} warn Mensagem de alerta.
 * @property {} warning Mensagem de alerta.
 * @property {} info Mensagem de informação.
 * @property {} dismiss Limpa as mensagens.
 */
export const showMessage = {
	success: (msg: string) => toast.success(msg),
	error: (msg: string) => toast.error(msg),
	warn: (msg: string) => toast.warn(msg),
	warning: (msg: string) => toast.warning(msg),
	info: (msg: string) => toast.info(msg),
	dismiss: () => toast.dismiss(),
}
