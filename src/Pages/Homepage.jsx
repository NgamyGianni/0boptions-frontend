import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Betting from "../Components/Betting"
import CurrentGame from "../Components/CurrentGame"
import PreviousGame from "../Components/PreviousGame"
import { BiFootball, BiBasketball, BiTennisBall } from "react-icons/bi"
import { MdSportsRugby } from "react-icons/md"
import Navbar from "../Components/Navbar"
import Portfolio from "../Components/Portfolio"
import Web3 from 'web3'

const Homepage = () => {
	const web3 = new Web3(window.ethereum);
	let Contract = require('web3-eth-contract');
	let abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_lastGame","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"}],"name":"_changeCurrentGame","type":"event"},{"anonymous":false,"inputs":[],"name":"_initCycle","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_joinDown","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_joinUp","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"uint256[]","name":"_game","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_reward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_address","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_rewardAdmin","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"update","type":"uint256"}],"name":"_setIntervalTime","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"}],"name":"_updateTreasury","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"Games","outputs":[{"internalType":"uint256","name":"upAmount","type":"uint256"},{"internalType":"uint256","name":"downAmount","type":"uint256"},{"internalType":"uint256","name":"totalAmount","type":"uint256"},{"internalType":"uint256","name":"rewardAmount","type":"uint256"},{"internalType":"uint256","name":"rewardPoolAmount","type":"uint256"},{"internalType":"bool","name":"rewardCalculated","type":"bool"},{"internalType":"uint256","name":"endTimestamp","type":"uint256"},{"internalType":"int256","name":"priceEnd","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NextCurrentGame","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentGameId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentPrice","outputs":[{"internalType":"int256","name":"_price","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserWins","outputs":[{"internalType":"uint256[]","name":"_winGames","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initCycle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"intervalSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"idGame","type":"uint256"},{"internalType":"address","name":"_address","type":"address"}],"name":"isWinner","outputs":[{"internalType":"bool","name":"_isWinner","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"joinDown","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"joinUp","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"idGames","type":"uint256[]"}],"name":"reward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_address","type":"address"}],"name":"rewardAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_intervalSeconds","type":"uint256"}],"name":"setIntervalSeconds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userGames","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint8","name":"poolChoice","type":"uint8"},{"internalType":"bool","name":"claimed","type":"bool"}],"stateMutability":"view","type":"function"}];
	let contract = new web3.eth.Contract(abi, "0xb95C89C253c1f4Ed8Dd8c5c4D510560b9157E51e");

	const [userInfos, setUserInfos] = useState({account: "0xb95C89C253c1f4Ed8Dd8c5c4D510560b9157E51e",
					balance: "0",
					network: "Not connected",
					contract: "0xb95C89C253c1f4Ed8Dd8c5c4D510560b9157E51e",
				});
	const [idCurrentGame, setIdCurrentGame] = useState({
		previous: 0,
		current: 0,
		next: 0
	});
	const [selectedAccount, setSelectedAccount] = useState("");

	async function logAccount(){
		let provider = window.ethereum;
		const web3 = new Web3(window.ethereum);

		if (typeof provider !== 'undefined') {
			await provider
				.request({ method: 'eth_requestAccounts' })
					.then((accounts) => {
					setSelectedAccount(accounts[0]);
				})
				.catch((err) => {
					console.log(err);
					return;
				});

			await window.ethereum.on('accountsChanged', function (accounts) {
				setSelectedAccount(accounts[0]);
			});
			
			if(selectedAccount != ""){

				var rewardList = await contract.methods.getUserWins(selectedAccount).call();
				var reward = 0;
				var game;
				var user;

				for(var i=0; i<rewardList.length; i++){
					if(rewardList[i] != 0){
						await contract.methods.Games(rewardList[i]).call()
							.then(function(receipt){
								game = receipt;
							});	

						user = await contract.methods.users(rewardList[i], userInfos.account).call()
						reward += (user.amount*game.rewardAmount)/game.rewardPoolAmount
					}
				}

				setUserInfos({
					account: selectedAccount,
					balance: await web3.utils.fromWei(await web3.eth.getBalance(selectedAccount), 'ether'),
					rewards: parseFloat(await web3.utils.fromWei(String(reward), 'ether')).toFixed(3),
					network: await web3.eth.net.getNetworkType(),
					contract: "0xb95C89C253c1f4Ed8Dd8c5c4D510560b9157E51e",
					status: "connected",
				});
			}
		}
	}
	async function getData(){

			await contract.methods.currentGameId.call().call()
				.then(function(receipt){
					setIdCurrentGame({
						previous: parseInt(receipt)-1,
						current: parseInt(receipt),
						next: parseInt(receipt)+1
					});
				});
	}

	async function reward(){
		await window.ethereum.enable();
		await contract.methods.reward(await contract.methods.getUserWins(selectedAccount).call()).send({from: selectedAccount});
	}
	useEffect(() => {
		logAccount();
		setTimeout(() => {  getData(); }, 1000);
		if (window.ethereum) {
			window.ethereum.on("chainChanged", () => {
				window.location.reload()
			})
			window.ethereum.on("accountsChanged", () => {
				window.location.reload()
			})
		}
	}, [selectedAccount, idCurrentGame])
	return (
		<Main>
			<Navbar userInfos={userInfos}/>
			<Container>

				<PreviousGame userInfos={userInfos} idCurrentGame={idCurrentGame.previous}/>
				<CurrentGame userInfos={userInfos} idCurrentGame={idCurrentGame.current}/>
				<Betting userInfos={userInfos} idCurrentGame={idCurrentGame.next}/>
			</Container>
			<Reward>
			<RewardText>{userInfos.rewards > 0 ? userInfos.rewards: 0} MATIC</RewardText>
				<RewardButton onClick={() => reward()}>Collect rewards</RewardButton>
			</Reward>
		</Main>
	)
}

const Main = styled.main`
	height: 100vh;
	background: #212429;
`

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 5%;
`
const Categories = styled.div`
	margin-top: 2rem;
	width: 350px;
	height: 75px;
	background-color: white;
	border-radius: 0.5rem;
	display: flex;
	justify-content: space-around;
	align-items: center;
	svg {
		height: 60px;
		width: 60px;
		cursor: pointer;
		&.active {
			background-color: #2172e5;
			border-radius: 0.8rem;
			color: white;
		}
	}
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

const Id = styled.div`
	width: 33%;
	text-align: center;
	color: rgb(149, 177, 254);
`

const Reward = styled.div`
	margin-top : 5%;
	margin-left: 40%;
	grid-area: reward;
	background-color: #191b1f;
	border: 1px solid #191b1f;
	padding: 0.5rem;
	border-radius: 0.5rem;
	display: flex;
	flex-direction: column;
	width: 20%;
	align-items: center;
`

const RewardText = styled.div`
	color: rgb(149, 177, 254);
	padding: 0.5rem;
	border-radius: 0.5rem;
	justify-content: center;
	align-items: center;
	font-family: Inter,sans-serif;
`

const RewardButton = styled.button`
	font-size: 100%;
	color: rgb(84, 36, 50);
	font-family: 'Inter custom',sans-serif;
	background-image: linear-gradient(90deg, rgb(206, 162, 206) 0%, rgb(149, 177, 254) 100%);
	padding: 16px;
	width:  100%;
	font-weight: 500;
	text-align: center;
	border-radius: 20px;
	outline: none;
	border: 1px solid #191b1f;
	text-decoration: none;
	display: flex;
	justify-content: center;
	flex-wrap: nowrap;
	align-items: center;
	cursor: pointer;
	position: relative;
	z-index: 1;
	&:disabled {
		cursor: auto;
		pointer-events: none;
	}

	will-change: transform;
	transition: transform 450ms ease;
	transform: perspective(1px) translateZ(0);

	> * {
		user-select: none;
	}

	> a {
		text-decoration: none;
	}
`

export default Homepage
