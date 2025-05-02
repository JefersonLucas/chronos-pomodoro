import { useEffect } from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router"
import { AboutPage } from "../../pages/About"
import { HistoryPage } from "../../pages/History"
import { HomePage } from "../../pages/Home"
import { NotFoundPage } from "../../pages/NotFound"

/**
 * Faz o scroll para o topo de modo suave.
 * @returns {null} não possui retorno
 */
function ScrollToTop(): null {
	const { pathname } = useLocation()

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" })
	}, [pathname])

	return null
}

export function MainRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/about/" element={<AboutPage />} />
				<Route path="/history/" element={<HistoryPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
			<ScrollToTop />
		</BrowserRouter>
	)
}
