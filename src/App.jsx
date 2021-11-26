import { Routes, Route } from "react-router-dom"
import History from "./Pages/History"
import Homepage from "./Pages/Homepage"
import React from "react"

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/history" element={<History />} />
			</Routes>
		</div>
	)
}

export default App