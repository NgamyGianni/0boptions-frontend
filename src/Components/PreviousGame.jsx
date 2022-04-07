import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import Web3 from "web3"
import { abi } from "../Config/abi"
import { ADDRESS } from "../Config/contract"
import { UserContext } from "../Provider/UserProvider"

const PreviousGame = ({ idCurrentGame }) => {
	const web3 = new Web3(window.ethereum)
	let contract = new web3.eth.Contract(abi, ADDRESS)
	const { user: userInfos } = useContext(UserContext)

	const [gameInfos, setGameInfos] = useState({ CurrentGameId: 0 })

	const getGameInfos = async (idGame) => {
		let game
		let statusGame
		let currentPrice
		let currentGameId = idGame

		await contract.methods
			.Games(currentGameId)
			.call()
			.then(function (receipt) {
				game = receipt
			})

		await contract.methods
			.getCurrentPrice()
			.call()
			.then(function (receipt) {
				currentPrice = receipt / 10 ** 8
			})

		let min = String((game.endTimestamp - Math.floor(Date.now() / 1000)) % 60)
		if (min < 10) {
			min = "0" + min
		}

		let priceStart = 0
		if (currentGameId !== 0) {
			await contract.methods
				.Games(parseInt(currentGameId) - 1)
				.call()
				.then(function (receipt) {
					priceStart = receipt.priceEnd / 10 ** 8
				})
		}

		let userGame = await contract.methods.users(currentGameId, userInfos.account).call()
		let poolChoice = userGame.poolChoice
		if (poolChoice === 1) poolChoice = "UP"
		else poolChoice = "DOWN"

		statusGame = "Closed"
		setGameInfos({
			Pool1Amount: web3.utils.fromWei(game.upAmount, "ether"),
			Pool0Amount: web3.utils.fromWei(game.downAmount, "ether"),
			Pool1Payout:
				parseFloat(game.upAmount) > 0 ? ((parseFloat(game.upAmount) + parseFloat(game.downAmount)) / parseFloat(game.upAmount)).toFixed(2) : "1.00",
			Pool0Payout:
				parseFloat(game.downAmount) > 0
					? ((parseFloat(game.upAmount) + parseFloat(game.downAmount)) / parseFloat(game.downAmount)).toFixed(2)
					: "1.00",
			status: statusGame,
			PriceStart: priceStart.toFixed(3),
			PriceEnd: (game.priceEnd / 10 ** 8).toFixed(3),
			CurrentPrice: currentPrice.toFixed(3),
			CurrentGameId: currentGameId,
			playerState: parseInt(userGame.amount) > 0 ? poolChoice + " : " + web3.utils.fromWei(userGame.amount, "ether") + " MATIC" : "OUT",
			TimeLeft: String(Math.floor((game.endTimestamp - Math.floor(Date.now() / 1000)) / 60)) + " : " + min,
			winner: game.priceEnd / 10 ** 8 > priceStart ? "UP" : "DOWN"
		})
	}
	useEffect(() => {
		getGameInfos(idCurrentGame)
	}, [])
	return (
		<Container style={gameInfos.winner === "UP" ? { border: "3px solid rgb(39, 255, 96)" } : { border: "3px solid rgb(255, 67, 67)" }}>
			<StatusContainer>
				<State>{gameInfos.status}</State>
				<Id>#{gameInfos.CurrentGameId}</Id>
			</StatusContainer>
			<Up
				style={
					gameInfos.winner === "UP"
						? {}
						: {
								background: "linear-gradient(90deg, rgb(206, 162, 206) 0%, rgb(149, 177, 254) 100%)",
								color: "rgb(84, 36, 50)",
								border: "3px solid rgb(84, 36, 50)"
						  }
				}>
				UP x{gameInfos.Pool1Payout} Payout
			</Up>
			<StatsContainer>
				<Stats>
					<Key>Closed ETH price</Key>
					<Value style={gameInfos.winner === "UP" ? { border: "3px solid rgb(39, 255, 96)" } : { border: "3px solid rgb(255, 67, 67)" }}>
						{gameInfos.PriceEnd} $
					</Value>
				</Stats>
				<Stats>
					<Key>Locked ETH price</Key>
					<Value>{gameInfos.PriceStart} $</Value>
				</Stats>
				<Stats>
					<Key>Prize pool</Key>
					<Value>
						{parseFloat(gameInfos.Pool0Amount) + parseFloat(gameInfos.Pool1Amount) > 0
							? (parseFloat(gameInfos.Pool0Amount) + parseFloat(gameInfos.Pool1Amount)).toFixed(2)
							: 0}{" "}
						MATIC
					</Value>
				</Stats>
			</StatsContainer>
			<Down
				style={
					gameInfos.winner === "DOWN"
						? {}
						: {
								background: "linear-gradient(90deg, rgb(206, 162, 206) 0%, rgb(149, 177, 254) 100%)",
								color: "rgb(84, 36, 50)",
								border: "3px solid rgb(84, 36, 50)"
						  }
				}>
				DOWN x{gameInfos.Pool0Payout} Payout
			</Down>
			<OutputContainer>
				<Output>{gameInfos.playerState}</Output>
			</OutputContainer>
		</Container>
	)
}

const Container = styled.div`
	background-image: linear-gradient(90deg, rgb(206, 162, 206) 0%, rgb(149, 177, 254) 100%);
	color: rgb(84, 36, 50);
	margin-top: 5rem;
	width: 400px;
	height: 350px;
	border-radius: 1rem;
	display: flex;
	flex-direction: column;
	font-family: Inter, sans-serif;
	flex-direction: column;
`

const StatusContainer = styled.div`
	background-color: #191b1f;
	border: #191b1f;
	padding: 0.5rem;
	border-radius: 0.5rem;
	display: flex;
	width: 100%;
	height: 100%;
`

const State = styled.div`
	grid-area: Status;
	width: 50%;
	text-align: center;
	color: rgb(255, 67, 67);
`

const Id = styled.div`
	grid-area: Status;
	width: 50%;
	text-align: center;
	color: rgb(149, 177, 254);
`

const Up = styled.div`
	padding: 0.5rem;
	border-radius: 0.5rem;
	width: 100%;
	border: 3px solid rgb(39, 255, 96);
	background: rgb(149, 177, 254);
	color: rgb(39, 255, 96);
	text-align: center;
`

const Down = styled.div`
	padding: 0.5rem;
	border-radius: 0.5rem;
	width: 100%;
	border: 3px solid rgb(255, 67, 67);
	background: rgb(206, 162, 206);
	color: rgb(255, 67, 67);
	text-align: center;
`

const StatsContainer = styled.div`
	background-color: #191b1f;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 0.5rem;
`

const Stats = styled.div`
	padding: 0.7rem;
	border-radius: 0.5rem;
	display: flex;
	width: 100%;
`

const Key = styled.div`
	background-color: rgb(33, 36, 41);
	border: 1px solid rgb(33, 36, 41);
	padding: 0.5rem;
	border-radius: 0.5rem;
	width: 100%;
	text-align: center;
	color: rgb(149, 177, 254);
`

const Value = styled.div`
	color: rgb(149, 177, 254);
	border: 1px solid rgb(33, 36, 41);
	padding: 0.5rem;
	border-radius: 0.5rem;
	width: 60%;
	text-align: center;
`

const OutputContainer = styled.div`
	background-image: linear-gradient(90deg, rgb(206, 162, 206) 0%, rgb(149, 177, 254) 100%);
	border: 1px solid linear-gradient(90deg, rgb(206, 162, 206) 0%, rgb(149, 177, 254) 100%);
	padding: 0.5rem;
	border-radius: 0.5rem;
	width: 100%;
	height: 10%;
	justify-content: center;
`

const Output = styled.p`
	text-align: center;
`

export default PreviousGame
