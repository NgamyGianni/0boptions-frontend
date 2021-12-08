import React, { button, useState, useEffect } from "react"
import styled from "styled-components"
import { AiOutlineTeam } from "react-icons/ai"
import Web3 from 'web3'

const PreviousGame = ({userInfos, idCurrentGame}) => {
		const web3 = new Web3(window.ethereum);
		let Contract = require('web3-eth-contract');
		let abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_lastGame","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"}],"name":"_changeCurrentGame","type":"event"},{"anonymous":false,"inputs":[],"name":"_initCycle","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_joinDown","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_joinUp","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"uint256[]","name":"_game","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_reward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_address","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_rewardAdmin","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"update","type":"uint256"}],"name":"_setIntervalTime","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"}],"name":"_updateTreasury","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"Games","outputs":[{"internalType":"uint256","name":"upAmount","type":"uint256"},{"internalType":"uint256","name":"downAmount","type":"uint256"},{"internalType":"uint256","name":"totalAmount","type":"uint256"},{"internalType":"uint256","name":"rewardAmount","type":"uint256"},{"internalType":"uint256","name":"rewardPoolAmount","type":"uint256"},{"internalType":"bool","name":"rewardCalculated","type":"bool"},{"internalType":"uint256","name":"endTimestamp","type":"uint256"},{"internalType":"int256","name":"priceEnd","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NextCurrentGame","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentGameId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentPrice","outputs":[{"internalType":"int256","name":"_price","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserWins","outputs":[{"internalType":"uint256[]","name":"_winGames","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initCycle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"intervalSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"idGame","type":"uint256"},{"internalType":"address","name":"_address","type":"address"}],"name":"isWinner","outputs":[{"internalType":"bool","name":"_isWinner","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"joinDown","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"joinUp","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"idGames","type":"uint256[]"}],"name":"reward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_address","type":"address"}],"name":"rewardAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_intervalSeconds","type":"uint256"}],"name":"setIntervalSeconds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userGames","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint8","name":"poolChoice","type":"uint8"},{"internalType":"bool","name":"claimed","type":"bool"}],"stateMutability":"view","type":"function"}];
		let contract = new web3.eth.Contract(abi, "0xb95C89C253c1f4Ed8Dd8c5c4D510560b9157E51e");

		const [gameInfos, setGameInfos] = useState("");

	async function getGameInfos(idGame){
			await window.ethereum.enable();
			var game;
			var statusGame;
			var currentPrice;
			var currentGameId = idGame;
			var timeLeft;
			var nextGame;

			await contract.methods.Games(currentGameId).call()
				.then(function(receipt){
	    			game = receipt;
				});

			await contract.methods.Games(parseInt(currentGameId)+1).call()
				.then(function(receipt){
	    			nextGame = receipt;
				});

			await contract.methods.getCurrentPrice().call()
				.then(function(receipt){
	    			currentPrice = receipt/10 ** 8;
				});

			var min = String((game.endTimestamp - Math.floor(Date.now()/1000)) % 60);
			if(min < 10)	min  = "0"+ min

			var priceStart = 0;
			if(currentGameId != 0){
				await contract.methods.Games(parseInt(currentGameId)-1).call()
				.then(function(receipt){
	    			priceStart = receipt.priceEnd / 10 ** 8;
				});
			}

			var userGame = await contract.methods.users(currentGameId, userInfos.account).call();
			var result = "";
			if(parseInt(userGame.amount) > 0){
				if ((game.priceEnd / 10 ** 8) > priceStart && userGame.poolChoice == "1" || (game.priceEnd / 10 ** 8) < priceStart && userGame.poolChoice == "1"){
					result = "You won"
				}else{
					result = "You lost"
				}
			}

			statusGame = "Closed"
			setGameInfos({
				Pool1Amount : await web3.utils.fromWei(game.upAmount, 'ether'),
				Pool0Amount : await web3.utils.fromWei(game.downAmount, 'ether'),
				Pool1Payout: parseFloat(game.upAmount) > 0 ? ((parseFloat(game.upAmount)+parseFloat(game.downAmount))/parseFloat(game.upAmount)).toFixed(2) : "1.00",
				Pool0Payout: parseFloat(game.downAmount) > 0 ? ((parseFloat(game.upAmount)+parseFloat(game.downAmount))/parseFloat(game.downAmount)).toFixed(2) : "1.00",
				status: statusGame,
				PriceStart : priceStart.toFixed(3),
				PriceEnd: (game.priceEnd / 10 ** 8).toFixed(3),
				CurrentPrice: currentPrice.toFixed(3), 
				CurrentGameId: currentGameId,
				playerState: parseInt(userGame.amount) > 0 ? "IN : " + await web3.utils.fromWei(userGame.amount, 'ether') + " MATIC": "OUT",
				TimeLeft: String(Math.floor((game.endTimestamp - Math.floor(Date.now()/1000))/60)) + " : " + min,
				winner: (game.priceEnd / 10 ** 8) > priceStart ? "UP" : "DOWN",
			})
	}
	useEffect(() => {
		setTimeout(() => {  getGameInfos(idCurrentGame); }, 1000);
	},[gameInfos, idCurrentGame]);
	return (
		<Container style={gameInfos.winner == "UP" ? {border: "3px solid rgb(39, 255, 96)"} : {border: "3px solid rgb(255, 67, 67)"}}>
			<StatusContainer>
				<State>{gameInfos.status}</State>
				<Id>#{gameInfos.CurrentGameId}</Id>
			</StatusContainer>
			<Up style={gameInfos.winner == "UP" ? {} : {background:"linear-gradient(90deg, rgb(206, 162, 206) 0%, rgb(149, 177, 254) 100%)", color:"rgb(84, 36, 50)", border: "3px solid rgb(84, 36, 50)"}}>UP x{gameInfos.Pool1Payout} Payout</Up>
			<StatsContainer>
				<Stats>
					<Key>Closed price</Key>
					<Value style={gameInfos.winner == "UP" ? {border: "3px solid rgb(39, 255, 96)"} : {border: "3px solid rgb(255, 67, 67)"}}>{gameInfos.PriceEnd} $</Value>
				</Stats>
				<Stats>
					<Key>Locked price</Key>
					<Value>{gameInfos.PriceStart} $</Value>
				</Stats>
				<Stats>
					<Key>Prize pool</Key>
					<Value>{(parseFloat(gameInfos.Pool0Amount)+parseFloat(gameInfos.Pool1Amount)) > 0 ? (parseFloat(gameInfos.Pool0Amount)+parseFloat(gameInfos.Pool1Amount)).toFixed(2) : 0} MATIC</Value>
				</Stats>
			</StatsContainer>
			<Down style={gameInfos.winner == "DOWN" ? {} : {background:"linear-gradient(90deg, rgb(206, 162, 206) 0%, rgb(149, 177, 254) 100%)", color:"rgb(84, 36, 50)", border: "3px solid rgb(84, 36, 50)"}}>DOWN x{gameInfos.Pool0Payout} Payout</Down>
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
	font-family: Inter,sans-serif;
	flex-direction:column;
`

const LastContainer = styled.div`
	background-image: linear-gradient(90deg, rgb(206, 162, 206) 0%, rgb(149, 177, 254) 100%);
	color: rgb(84, 36, 50);
	margin-top: 5rem;
	width: 400px;
	height: 350px;
	border-radius: 1rem;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	gap: 0px 0px;
	font-family: Inter,sans-serif;
	grid-template-areas:
		". . . . . ."
		"StatusContainer . . . . ."
		". . . . . ."
		"Teams . . . . ."
		". . . . . .";
`

const StatusContainer = styled.div`
	background-color: #191b1f;
	border : #191b1f;
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
	color: rgb(255, 67, 67)
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
	background:rgb(149, 177, 254);
	color: rgb(39, 255, 96);
	text-align: center;
`

const Down = styled.div`
	padding: 0.5rem;
	border-radius: 0.5rem;
	width: 100%;
	border: 3px solid rgb(255, 67, 67);
	background:rgb(206, 162, 206);
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
	border : 1px solid rgb(33, 36, 41);
	padding: 0.5rem;
	border-radius: 0.5rem;
	width:100%;
	text-align: center;
	color: rgb(149, 177, 254);
`

const Value = styled.div`
	color: rgb(149, 177, 254);
	border : 1px solid rgb(33, 36, 41);
	padding: 0.5rem;
	border-radius: 0.5rem;
	width: 60%;
	text-align: center;
`

const OutputContainer = styled.div`
	background-image: linear-gradient(90deg, rgb(206, 162, 206) 0%, rgb(149, 177, 254) 100%);
	border : 1px solid linear-gradient(90deg, rgb(206, 162, 206) 0%, rgb(149, 177, 254) 100%);
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
