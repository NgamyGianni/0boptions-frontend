import { Routes, Route } from "react-router-dom"
import Profile from "./Pages/Profile"
import Homepage from "./Pages/Homepage"
import Claim from "./Pages/Claim"
import Stacking from "./Pages/Stacking"
import React from "react"

import { NextUIProvider } from '@nextui-org/react';

function App() {
	return (
		<div className="App">
				<NextUIProvider>
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/claim" element={<Claim />} />
						<Route path="/stacking" element={<Stacking />} />
					</Routes>
				</NextUIProvider>
		</div>
	)
}

export default App