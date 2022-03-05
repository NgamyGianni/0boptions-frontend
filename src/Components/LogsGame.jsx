import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Web3 from 'web3'

const LogsGame = ({userInfos, idCurrentGame}) => {
		const web3 = new Web3(window.ethereum);
		let abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_lastGame","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"}],"name":"_changeCurrentGame","type":"event"},{"anonymous":false,"inputs":[],"name":"_initCycle","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_joinDown","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_joinUp","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"uint256[]","name":"_game","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_reward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_address","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_rewardAdmin","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"update","type":"uint256"}],"name":"_setIntervalTime","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"}],"name":"_updateTreasury","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"Games","outputs":[{"internalType":"uint256","name":"upAmount","type":"uint256"},{"internalType":"uint256","name":"downAmount","type":"uint256"},{"internalType":"uint256","name":"totalAmount","type":"uint256"},{"internalType":"uint256","name":"rewardAmount","type":"uint256"},{"internalType":"uint256","name":"rewardPoolAmount","type":"uint256"},{"internalType":"bool","name":"rewardCalculated","type":"bool"},{"internalType":"uint256","name":"endTimestamp","type":"uint256"},{"internalType":"int256","name":"priceEnd","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NextCurrentGame","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentGameId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentPrice","outputs":[{"internalType":"int256","name":"_price","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserAvailableWins","outputs":[{"internalType":"uint256[]","name":"_winGames","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserGames","outputs":[{"internalType":"uint256[]","name":"games","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserTotalAmount","outputs":[{"internalType":"uint256","name":"amountGames","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserWinAmount","outputs":[{"internalType":"uint256","name":"_winAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserWins","outputs":[{"internalType":"uint256[]","name":"_winGames","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initCycle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"intervalSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"idGame","type":"uint256"},{"internalType":"address","name":"_address","type":"address"}],"name":"isWinner","outputs":[{"internalType":"bool","name":"_isWinner","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"joinDown","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"joinUp","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"idGames","type":"uint256[]"}],"name":"reward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_address","type":"address"}],"name":"rewardAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_intervalSeconds","type":"uint256"}],"name":"setIntervalSeconds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userGames","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint8","name":"poolChoice","type":"uint8"},{"internalType":"bool","name":"claimed","type":"bool"}],"stateMutability":"view","type":"function"}];
		let contract = new web3.eth.Contract(abi, "0xCa2d0B66cb00C9FFB7C35602c65EbefD06e291cB");

		const [gameInfos, setGameInfos] = useState("");

	async function getGameInfos(idGame){
			var game;
			var statusGame;
			var currentPrice;
			var currentGameId = idGame;

			await contract.methods.Games(currentGameId).call()
				.then(function(receipt){
	    			game = receipt;
				});

			await contract.methods.getCurrentPrice().call()
				.then(function(receipt){
	    			currentPrice = receipt/10 ** 8;
				});

			var min = String((game.endTimestamp - Math.floor(Date.now()/1000)) % 60);
			if(min < 10)	min  = "0"+ min

			var priceStart = 0;
			if(currentGameId !== 0){
				await contract.methods.Games(parseInt(currentGameId)-1).call()
				.then(function(receipt){
	    			priceStart = receipt.priceEnd / 10 ** 8;
				});
			}

			var state = (currentPrice - priceStart).toFixed(3);
			if (state > 0){
				state = "UP"
			}else{
				if(state < 0){
					state = "DOWN"
				}
				else{
					state = "---"
				}
			}

			var user = await contract.methods.users(currentGameId, userInfos.account).call();
			var poolChoice = user.poolChoice;
			if(poolChoice == 1)	poolChoice = "UP"
			else	poolChoice = "DOWN"
			
			setGameInfos({
				Pool1Amount : await web3.utils.fromWei(game.upAmount, 'ether'),
				Pool0Amount : await web3.utils.fromWei(game.downAmount, 'ether'),
				Pool1Payout: parseFloat(game.upAmount) > 0 ? ((parseFloat(game.upAmount)+parseFloat(game.downAmount))/parseFloat(game.upAmount)).toFixed(2) : "1.00",
				Pool0Payout: parseFloat(game.downAmount) > 0 ? ((parseFloat(game.upAmount)+parseFloat(game.downAmount))/parseFloat(game.downAmount)).toFixed(2) : "1.00",
				priceStart : priceStart.toFixed(3),
				CurrentPrice: currentPrice.toFixed(3),
				CurrentGameId: currentGameId,
				playerState: parseInt(user.amount) > 0 ? poolChoice + " : " + await web3.utils.fromWei(user.amount, 'ether') + " MATIC": "OUT",
				State: state,
				previousTime: game.endTimestamp,
				min: min,
				TimeLeft: Math.floor((game.endTimestamp - Math.floor(Date.now()/1000))/60) >= 0 ? "Time left : " + String(Math.floor((game.endTimestamp - Math.floor(Date.now()/1000))/60)) + " : " + min : "Calculating"
			})
	}
	const [counter, setCounter] = useState(0)
	useEffect(() => {
		getGameInfos(idCurrentGame.current);
		setTimeout(() => {setCounter(counter+1);}, 1000)
	},[counter]);
	return (
		<Container>
			<StatsContainer>
				<Stats>
					<Key>Id</Key>
					<Key>Address</Key>
					<Key>Amount</Key>
					<Key>Type</Key>
				</Stats>
				<Stats>
					<Value>#{idCurrentGame.events != "" && idCurrentGame.events != null && idCurrentGame.events.length >= 1 ?idCurrentGame.events[0].returnValues[1] : ""}</Value>
					<Value>{idCurrentGame.events != "" && idCurrentGame.events != null && idCurrentGame.events.length >= 1 ? idCurrentGame.events[0].returnValues[0].substring(0, 5) + "..." + idCurrentGame.events[0].returnValues[0].substring((idCurrentGame.events[0].returnValues[0].length)-4) : ""}</Value>
					<Value>{idCurrentGame.events != "" && idCurrentGame.events != null && idCurrentGame.events.length >= 1 ? web3.utils.fromWei(idCurrentGame.events[0].returnValues[2], 'ether') + " MATIC": ""}</Value>
					<Value>{idCurrentGame.events != "" && idCurrentGame.events != null && idCurrentGame.events.length >= 1 ? idCurrentGame.events[0].event.substring(5, idCurrentGame.events[0].event.length) : ""}</Value>
				</Stats>
				<Stats>
					<Value>#{idCurrentGame.events != "" && idCurrentGame.events != null && idCurrentGame.events.length >= 2 ?idCurrentGame.events[1].returnValues[1] : ""}</Value>
					<Value>{idCurrentGame.events != "" && idCurrentGame.events != null && idCurrentGame.events.length >= 2 ? idCurrentGame.events[1].returnValues[0].substring(0, 5) + "..." + idCurrentGame.events[1].returnValues[0].substring((idCurrentGame.events[1].returnValues[0].length)-4) : ""}</Value>
					<Value>{idCurrentGame.events != "" && idCurrentGame.events != null && idCurrentGame.events.length >= 2 ? web3.utils.fromWei(idCurrentGame.events[1].returnValues[2], 'ether') + " MATIC": ""}</Value>
					<Value>{idCurrentGame.events != "" && idCurrentGame.events != null && idCurrentGame.events.length >= 2 ? idCurrentGame.events[1].event.substring(5, idCurrentGame.events[1].event.length) : ""}</Value>
				</Stats>
				<Stats>
					<Value>#{idCurrentGame.events != "" && idCurrentGame.events != null && idCurrentGame.events.length >= 3 ?idCurrentGame.events[2].returnValues[1] : ""}</Value>
					<Value>{idCurrentGame.events != "" && idCurrentGame.events != null && idCurrentGame.events.length >= 3 ? idCurrentGame.events[2].returnValues[0].substring(0, 5) + "..." + idCurrentGame.events[2].returnValues[0].substring((idCurrentGame.events[2].returnValues[0].length)-4) : ""}</Value>
					<Value>{idCurrentGame.events != "" && idCurrentGame.events != null && idCurrentGame.events.length >= 3 ? web3.utils.fromWei(idCurrentGame.events[2].returnValues[2], 'ether') + " MATIC": ""}</Value>
					<Value>{idCurrentGame.events != "" && idCurrentGame.events != null && idCurrentGame.events.length >= 3 ? idCurrentGame.events[2].event.substring(5, idCurrentGame.events[2].event.length) : ""}</Value>
				</Stats>
				<Stats>
					<Value>#{idCurrentGame.events != "" && idCurrentGame.events != null && idCurrentGame.events.length >= 4 ?idCurrentGame.events[3].returnValues[1] : ""}</Value>
					<Value>{idCurrentGame.events != "" && idCurrentGame.events != null && idCurrentGame.events.length >= 4 ? idCurrentGame.events[3].returnValues[0].substring(0, 5) + "..." + idCurrentGame.events[3].returnValues[0].substring((idCurrentGame.events[3].returnValues[0].length)-4) : ""}</Value>
					<Value>{idCurrentGame.events != "" && idCurrentGame.events != null && idCurrentGame.events.length >= 4 ? web3.utils.fromWei(idCurrentGame.events[3].returnValues[2], 'ether') + " MATIC": ""}</Value>
					<Value>{idCurrentGame.events != "" && idCurrentGame.events != null && idCurrentGame.events.length >= 4 ? idCurrentGame.events[3].event.substring(5, idCurrentGame.events[3].event.length) : ""}</Value>
				</Stats>
				<Stats>
					<Value>#{idCurrentGame.events != "" && idCurrentGame.events != null && idCurrentGame.events.length >= 5 ?idCurrentGame.events[4].returnValues[1] : ""}</Value>
					<Value>{idCurrentGame.events != "" && idCurrentGame.events != null && idCurrentGame.events.length >= 5 ? idCurrentGame.events[4].returnValues[0].substring(0, 5) + "..." + idCurrentGame.events[4].returnValues[0].substring((idCurrentGame.events[4].returnValues[0].length)-4) : ""}</Value>
					<Value>{idCurrentGame.events != "" && idCurrentGame.events != null && idCurrentGame.events.length >= 5 ? web3.utils.fromWei(idCurrentGame.events[4].returnValues[2], 'ether') + " MATIC": ""}</Value>
					<Value>{idCurrentGame.events != "" && idCurrentGame.events != null && idCurrentGame.events.length >= 5 ? idCurrentGame.events[4].event.substring(5, idCurrentGame.events[4].event.length) : ""}</Value>
				</Stats>
				
			</StatsContainer>
		</Container>
	)
}

const Container = styled.div`
	background-image: linear-gradient(90deg, rgb(206, 162, 206) 0%, rgb(149, 177, 254) 100%);
	color: rgb(84, 36, 50);
	margin-top: 0.5%;
	width: 50%;
	height: 60%;
	border-radius: 1rem;
	display: flex;
	font-family: Inter,sans-serif;
	flex-direction:column;
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
	width: 33%;
	text-align: center;
	color: rgb(149, 177, 254);
`

const Time = styled.div`
	width: 33%;
	text-align: center;
	color: rgb(149, 177, 254);
`

const Id = styled.div`
	width: 33%;
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

export default LogsGame
