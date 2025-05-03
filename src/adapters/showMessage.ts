import { toast } from "react-toastify"
import { Dialog } from "../components/Dialog"

/**
 * Um [adapter](https://refactoring.guru/design-patterns/adapter) para o [React-toastify](https://fkhadra.github.io/react-toastify/introduction).
 *
 * @property {} success Mensagem de sucesso.
 * @property {} error Mensagem de erro.
 * @property {} warn Mensagem de alerta.
 * @property {} warning Mensagem de alerta.
 * @property {} info Mensagem de informação.
 * @property {} dismiss Limpa as mensagens.
 * @property {} confirm Mensagem de confirmação.
 */
export const showMessage = {
	success: (msg: string) => toast.success(msg),
	error: (msg: string) => toast.error(msg),
	warn: (msg: string) => toast.warn(msg),
	warning: (msg: string) => toast.warning(msg),
	info: (msg: string) => toast.info(msg),
	dismiss: () => toast.dismiss(),
	confirm: (data: string, onClosing: (confirmation: boolean) => void) =>
		toast(Dialog, {
			data,
			onClose: (confirmation) => {
				if (confirmation) return onClosing(true)
				return onClosing(false)
			},
			position: "top-center",
			autoClose: false,
			closeOnClick: false,
			closeButton: false,
			draggable: false,
		}),
}
