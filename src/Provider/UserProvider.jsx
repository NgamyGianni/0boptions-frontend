import { createContext, useState } from "react"

const initialState = {
	userLoading: true,
	user: {
		account: "",
		rewards: 0,
		balance: "",
		network: "",
		contract: "",
		status: ""
	},
	setUser: () => {},
	idCurrentGame: {
		previous: 0,
		current: 0,
		next: 0
	},
	setIdCurrentGame: () => {},
	sessionEnd: () => {}
}

export const UserContext = createContext(initialState)

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(initialState.user)
	const [userLoading, setUserLoading] = useState(true)
	const [idCurrentGame, setIdCurrentGame] = useState(initialState.idCurrentGame)

	const sessionEnd = () => {
		setUser(initialState.user)
		setUserLoading(false)
		return
	}

	return <UserContext.Provider value={{ setUser, user, userLoading, sessionEnd, idCurrentGame, setIdCurrentGame }}>{children}</UserContext.Provider>
}
