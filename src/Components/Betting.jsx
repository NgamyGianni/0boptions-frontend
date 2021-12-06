import React, { button, useState, useEffect } from "react"
import styled from "styled-components"
import { AiOutlineTeam } from "react-icons/ai"
import Web3 from 'web3'

const Betting = ({userInfos, idCurrentGame}) => {
		const web3 = new Web3(window.ethereum);
		let Contract = require('web3-eth-contract');
		let abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_lastGame","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"}],"name":"_changeCurrentGame","type":"event"},{"anonymous":false,"inputs":[],"name":"_initCycle","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_joinDown","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_joinUp","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"uint256[]","name":"_game","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_reward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_address","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_rewardAdmin","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"update","type":"uint256"}],"name":"_setIntervalTime","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"}],"name":"_updateTreasury","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"Games","outputs":[{"internalType":"uint256","name":"upAmount","type":"uint256"},{"internalType":"uint256","name":"downAmount","type":"uint256"},{"internalType":"uint256","name":"totalAmount","type":"uint256"},{"internalType":"uint256","name":"rewardAmount","type":"uint256"},{"internalType":"uint256","name":"rewardPoolAmount","type":"uint256"},{"internalType":"bool","name":"rewardCalculated","type":"bool"},{"internalType":"uint256","name":"endTimestamp","type":"uint256"},{"internalType":"int256","name":"priceEnd","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NextCurrentGame","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentGameId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentPrice","outputs":[{"internalType":"int256","name":"_price","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserWins","outputs":[{"internalType":"uint256[]","name":"_winGames","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initCycle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"intervalSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"idGame","type":"uint256"},{"internalType":"address","name":"_address","type":"address"}],"name":"isWinner","outputs":[{"internalType":"bool","name":"_isWinner","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"joinDown","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"joinUp","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"idGames","type":"uint256[]"}],"name":"reward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_address","type":"address"}],"name":"rewardAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_intervalSeconds","type":"uint256"}],"name":"setIntervalSeconds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userGames","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint8","name":"poolChoice","type":"uint8"},{"internalType":"bool","name":"claimed","type":"bool"}],"stateMutability":"view","type":"function"}];
		let contract = new web3.eth.Contract(abi, "0xb95C89C253c1f4Ed8Dd8c5c4D510560b9157E51e");

		const [gameInfos, setGameInfos] = useState("");

	async function betUp(){
		await window.ethereum.enable();
	 	await contract.methods.joinUp().send({from: userInfos.account, value: "100000000000000000"});
	}

	async function betDown(){
		await window.ethereum.enable();
	 	await contract.methods.joinDown().send({from: userInfos.account, value: "100000000000000000"});
	}

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

			var priceStart = 0;
			var previousTime = 0;
			if(currentGameId != 0){
				await contract.methods.Games(parseInt(currentGameId)-1).call()
				.then(function(receipt){
	    			priceStart = receipt.priceEnd / 10 ** 8;
	    			previousTime = receipt.endTimestamp;
				});
			}

			var min = String((previousTime - Math.floor(Date.now()/1000)) % 60);
			if(min < 10)	min  = "0"+ min

			var userAmount = await contract.methods.users(currentGameId, userInfos.account).call();

			
			statusGame = "Next"
			setGameInfos({
				Pool1Amount : await web3.utils.fromWei(game.upAmount, 'ether'),
				Pool0Amount : await web3.utils.fromWei(game.downAmount, 'ether'),
				Pool1Payout: parseFloat(game.upAmount) > 0 ? parseFloat(await web3.utils.fromWei(((game.upAmount+game.downAmount)/game.upAmount), 'ether')).toFixed(2) : 1,
				Pool0Payout: parseFloat(game.downAmount) > 0 ? parseFloat(await web3.utils.fromWei(((game.upAmount+game.downAmount)/game.downAmount), 'ether')).toFixed(2) : 1,
				status: statusGame,
				priceStart : priceStart.toFixed(3),
				CurrentPrice: currentPrice.toFixed(3), 
				CurrentGameId: currentGameId,
				playerState: parseInt(userAmount.amount) > 0 ? "IN : " + await web3.utils.fromWei(userAmount.amount, 'ether'): "OUT",
				TimeLeft: Math.floor((previousTime - Math.floor(Date.now()/1000))/60) >= 0 ? "Time left : " + String(Math.floor((previousTime - Math.floor(Date.now()/1000))/60)) + " : " + min : "Locked"
			})
	}
	useEffect(() => {
		setTimeout(() => {  getGameInfos(idCurrentGame); }, 1000);
	},[gameInfos, idCurrentGame]);
	return (
		<Container>
			<Status>{gameInfos.status}</Status>
			<Teams>
				<ScoreContainer>
					<Score> #{gameInfos.CurrentGameId}</Score>
					<Score> prize pool {(parseFloat(gameInfos.Pool0Amount)+parseFloat(gameInfos.Pool1Amount)) > 0 ? (parseFloat(gameInfos.Pool0Amount)+parseFloat(gameInfos.Pool1Amount)).toFixed(2) : 0} MATIC</Score>
					<Score> {gameInfos.TimeLeft}</Score>
					<Score> {gameInfos.playerState} </Score>
				</ScoreContainer>
			</Teams>
			<Bets>
				<BetsButton style={{border: "1px solid rgb(255, 67, 67)", background:"rgb(206, 162, 206)" , color: "rgb(255, 67, 67)"}} onClick={() => betDown()}>DOWN x{gameInfos.Pool0Payout}</BetsButton>
				<BetsButton style={{border: "1px solid rgb(39, 255, 96)",background:"rgb(149, 177, 254)", color: "rgb(39, 255, 96)"}} onClick={() => betUp()}>UP x{gameInfos.Pool1Payout}</BetsButton>
			</Bets>
		</Container>
	)
}

const Container = styled.div`
	color: rgb(84, 36, 50);
	font-family: Inter,sans-serif;
	margin-top: 5rem;
	background-image: linear-gradient(90deg, rgb(206, 162, 206) 0%, rgb(149, 177, 254) 100%);
	width: 400px;
	height: 350px;
	border-radius: 1rem;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	gap: 0px 0px;
	grid-template-areas:
		". . . . . ."
		". Status Status . . ."
		". . . . . ."
		". Teams Teams Teams Teams ."
		". . . . . ."
		". bets bets bets bets ."
`
const Status = styled.div`
	grid-area: Status;
`

const Teams = styled.div`
	grid-area: Teams;
	display: flex;
	align-items: center;
	justify-content: center;
	& svg {
		width: 30%;
		height: 100%;
	}
`
const ScoreContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const Score = styled.p`
	font-size: 1.1rem;
`

const CurrentPrice = styled.span`
	font-size: 0.9rem;
	color: green;
`

const Bets = styled.div`
	grid-area: bets;
	background-image: transparent;
	padding: 0.5rem;
	border-radius: 0.5rem;
	display: flex;
	width: 100%;
	justify-content: space-between;
`

const BetsButton = styled.button`
	cursor: pointer;
	background-color: #2f3031;
	color: white;
	padding: 0.5rem;
	border-radius: 0.5rem;
	width: 40%;
`

export default Betting
