import { Routes, Route } from "react-router-dom"
import Profile from "./Pages/Profile"
import Homepage from "./Pages/Homepage"
import React from "react"

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</div>
	)
}

export default App