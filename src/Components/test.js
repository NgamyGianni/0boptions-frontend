import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Betting from "../Components/Betting"
import CurrentGame from "../Components/CurrentGame"
import TableGames from "../Components/TableGames"
import PreviousGame from "../Components/PreviousGame"
import LogsGame from "../Components/LogsGame"
import Navbar1 from "../Components/Navbar"
import Web3 from 'web3'
import SwiperCore, { Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";


const Homepage = () => {
	SwiperCore.use([Scrollbar]);
	const web3 = new Web3(window.ethereum);
	let abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_lastGame","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"}],"name":"_changeCurrentGame","type":"event"},{"anonymous":false,"inputs":[],"name":"_initCycle","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_joinDown","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_joinUp","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"uint256[]","name":"_game","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_reward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_address","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_rewardAdmin","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"update","type":"uint256"}],"name":"_setIntervalTime","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"}],"name":"_updateTreasury","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"Games","outputs":[{"internalType":"uint256","name":"upAmount","type":"uint256"},{"internalType":"uint256","name":"downAmount","type":"uint256"},{"internalType":"uint256","name":"totalAmount","type":"uint256"},{"internalType":"uint256","name":"rewardAmount","type":"uint256"},{"internalType":"uint256","name":"rewardPoolAmount","type":"uint256"},{"internalType":"bool","name":"rewardCalculated","type":"bool"},{"internalType":"uint256","name":"endTimestamp","type":"uint256"},{"internalType":"int256","name":"priceEnd","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NextCurrentGame","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentGameId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentPrice","outputs":[{"internalType":"int256","name":"_price","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserAvailableWins","outputs":[{"internalType":"uint256[]","name":"_winGames","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserGames","outputs":[{"internalType":"uint256[]","name":"games","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserTotalAmount","outputs":[{"internalType":"uint256","name":"amountGames","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserWinAmount","outputs":[{"internalType":"uint256","name":"_winAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserWins","outputs":[{"internalType":"uint256[]","name":"_winGames","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initCycle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"intervalSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"idGame","type":"uint256"},{"internalType":"address","name":"_address","type":"address"}],"name":"isWinner","outputs":[{"internalType":"bool","name":"_isWinner","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"joinDown","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"joinUp","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"idGames","type":"uint256[]"}],"name":"reward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_address","type":"address"}],"name":"rewardAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_intervalSeconds","type":"uint256"}],"name":"setIntervalSeconds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userGames","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint8","name":"poolChoice","type":"uint8"},{"internalType":"bool","name":"claimed","type":"bool"}],"stateMutability":"view","type":"function"}];
	let contract = new web3.eth.Contract(abi, "0xCa2d0B66cb00C9FFB7C35602c65EbefD06e291cB");

	const [userInfos, setUserInfos] = useState({account: "0xCa2d0B66cb00C9FFB7C35602c65EbefD06e291cB",
					balance: "0",
					network: "",
					contract: "0xCa2d0B66cb00C9FFB7C35602c65EbefD06e291cB",
				});
	const [idCurrentGame, setIdCurrentGame] = useState({
		previous: 0,
		current: 0,
		next: 0
	});
	const [selectedAccount, setSelectedAccount] = useState("");

	async function logAccount(){
		let provider = window.ethereum;

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
			
			if(selectedAccount !== ""){

				var rewardList = await contract.methods.getUserAvailableWins(selectedAccount).call();
				var reward = 0;
				var game;
				var user;

				for(var i=0; i<rewardList.length; i++){
					if(rewardList[i] > 0){
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
					rewards: parseFloat(await web3.utils.fromWei(String(reward), 'ether')),
					balance: await web3.utils.fromWei(await web3.eth.getBalance(selectedAccount), 'ether'),
					network: await web3.eth.net.getId(),
					contract: "0xCa2d0B66cb00C9FFB7C35602c65EbefD06e291cB",
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
		if(userInfos.network == "137")	await contract.methods.reward(await contract.methods.getUserAvailableWins(selectedAccount).call()).send({from: selectedAccount, type: "0x0"});
	}

	async function switchEthereumChain() {
	    try {
	      await window.ethereum.request({
	        method: 'wallet_switchEthereumChain',
	        params: [{ chainId: '0x89' }],
	      });
	    } catch (e) {
	      if (e.code === 4902) {
	        try {
	          await window.ethereum.request({
	            method: 'wallet_addEthereumChain',
	            params: [
	              {
	                chainId: '0x89',
	                chainName: 'Polygon Mainnet',
	                nativeCurrency: {
	                  name: 'Polygon',
	                  symbol: 'MATIC',
	                  decimals: 18
	                },
	                blockExplorerUrls: ['https://explorer.matic.network/'],
	                rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
	              },
	            ],
	          });
	        } catch (addError) {
	          console.error(addError);
	        }
	      }
	    }
	  }
	const [counter, setCounter] = useState(0)
	const [data, setData] = useState(0)
	useEffect(() => {
		logAccount();
		setTimeout(() => {setCounter(counter+1);}, 1000)
	}, [counter])

	useEffect(() => {
		getData();
	}, [counter])

	useEffect(() => {
		if (window.ethereum) {
			window.ethereum.on("chainChanged", () => {
				if(web3.eth.net.getId() != "137"){
					switchEthereumChain();
				}
				window.location.reload()
			})
			window.ethereum.on("accountsChanged", () => {
				if(web3.eth.net.getId() != "137"){
					switchEthereumChain();
				}
				window.location.reload()
			})
		}
	}, [selectedAccount, userInfos])
	return (
			<Main>
				<Navbar1 userInfos={userInfos} page="Homepage"/>
				{userInfos.network == "137" ? 
				<div style={{"display" : "flex", "flex-direction": "row"}}>
					<TableGames userInfos={userInfos} idCurrentGame={idCurrentGame.current}/>
					<LogsGame userInfos={userInfos} idCurrentGame={idCurrentGame.current}/>
				</div>
				: 
				<Container style={{"margin-top": "15%", "flex-direction": "column"}}>
					<RewardTextNo>Make sure Metamask is installed and connected to Polygon's network.</RewardTextNo>
					<RewardTextNo>Click below to switch networks.</RewardTextNo>
					<RewardButtonNo style={{width: "20%"}} onClick={() => switchEthereumChain()}>Switch network</RewardButtonNo>
				</Container>}
				<ButtonsContainer>
				{userInfos.network == "137" ? (<RewardText>{userInfos.rewards > 0 ? userInfos.rewards : 0} MATIC</RewardText>):("")}
				<RewardsContainer>
					<Reward>
						<RewardButton onClick={() => window.open("https://discord.gg/8YNB9yMNnm")}>Join our Discord Server</RewardButton>
					</Reward>
					{userInfos.network == "137" ? (
						<Reward>
							<RewardButton onClick={() => reward()}>
								<span>Collect Rewards</span>
								<div class="liquid"></div>
							</RewardButton>
						</Reward>
					) : (
						""
					)}
					<Reward>
						<RewardButton onClick={() => window.open("https://polygonscan.com/address/0xCa2d0B66cb00C9FFB7C35602c65EbefD06e291cB")}>
							View on Polygonscan
						</RewardButton>
					</Reward>
				</RewardsContainer>
				<RewardsContainer style={{marginTop: "3%", marginLeft: "90%"}}>
					<RewardButton onClick={() => window.open("https://twitter.com/0bLabs?ref_src=twsrc%5Etfw")}>
						<img src={require("../output-onlinepngtools.png").default} style={{width: "15%"}} alt="no image"/>
					</RewardButton>
				</RewardsContainer>
			</ButtonsContainer>
			</Main>
	)
}

const Main = styled.main`
	height: 100vh;
	width: 100vw;
	transform: unset;
    background: radial-gradient(150.6% 98.22% at 48.06% 0%, rgba(130, 71, 229, 0.6) 0%, rgba(200, 168, 255, 0) 100%), rgb(31, 33, 40);
    background-image: radial-gradient(150.6% 98.22% at 48.06% 0%, rgba(130, 71, 229, 0.6) 0%, rgba(200, 168, 255, 0) 100%), initial;
    background-position-x: initial, initial;
    background-position-y: initial, initial;
    background-size: initial, initial;
    background-repeat-x: initial, initial;
    background-repeat-y: initial, initial;
    background-attachment: initial, initial;
    background-origin: initial, initial;
    background-clip: initial, initial;
    background-color: rgb(31, 33, 40);
    background-blend-mode: overlay, normal;
`

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 5%;
`

const LoginButton = styled.button`
	color: rgb(149, 177, 254);
	padding: 0.5rem;
	border-radius: 0.5rem;
	justify-content: center;
	align-items: center;
	font-family: Inter,sans-serif;
`

const RewardNo = styled.div`
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

const RewardTextNo = styled.div`
	color: rgb(149, 177, 254);
	padding: 0.5rem;
	border-radius: 0.5rem;
	justify-content: center;
	align-items: center;
	font-family: Inter,sans-serif;
`

const RewardButtonNo = styled.button`
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
	transition: cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s;
	&:hover {
		background-image: linear-gradient(90deg, rgb(255, 150, 165) 0%, rgb(255, 185, 140) 100%);
	}
`

const Reward = styled.div`
	padding: 0.5rem;
	border-radius: 0.5rem;
	display: flex;
	flex-direction: column;
`

const RewardText = styled.div`
	color: rgb(149, 177, 254);
	padding: 0.5rem;
	border-radius: 0.5rem;
	font-size: 1.2rem;
	font-family: Inter, sans-serif;
	background-color: #191b1f;
	position: relative;
	margin-left: auto;
    margin-right: auto;
	bottom: -10px;
`

const RewardButton = styled.button`
	font-size: 100%;
	color: rgb(84, 36, 50);
	font-family: "Inter custom", sans-serif;
	background-image: linear-gradient(90deg, rgb(206, 162, 206) 0%, rgb(149, 177, 254) 100%);
	padding: 16px;
	width: 100%;
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
	transition: cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s;
	&:hover {
		background-image: linear-gradient(90deg, rgb(255, 150, 165) 0%, rgb(255, 185, 140) 100%);
	}
`

const ButtonsContainer = styled.div`
	display: flex;
	width: 100%;
	margin-top: 1rem;
	flex-direction: column;
`

const RewardsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: auto;
	padding: 0.5rem;
	border-radius: 1rem;
`

const SpecialReward = styled.button`
	position: relative;
	padding: 16px;
	display: block;
	text-decoration: none;
	width: 100%;
	overflow: hidden;
	border-radius: 20px;
	outline: none;
	border: none;
	cursor: pointer;
	&:disabled {
		cursor: auto;
		pointer-events: none;
	}
	& > span {
		position: relative;
		color: rgb(84, 36, 50);
		font-size: 1.1rem;
		font-family: "Inter custom", sans-serif;
		z-index: 1;
	}
	& > .liquid {
		position: absolute;
		top: -80px;
		left: 0;
		width: 200px;
		height: 200px;
		background: rgb(255, 150, 165);
		box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
		transition: 0.5s;
		border: none;
		outline: none;
		&::after,
		&::before {
			content: "";
			width: 200%;
			height: 200%;
			position: absolute;
			top: 0;
			left: 50%;
			transform: translate(-50%, -75%);
			background: #fff;
		}
		&::before {
			border-radius: 45%;
			background: rgba(20, 20, 20, 1);
			animation: animate 5s linear infinite;
		}
		&::after {
			border-radius: 40%;
			background: rgb(149, 177, 254);
			animation: animate 10s linear infinite;
		}
	}
	&:hover .liquid {
		top: -120px;
	}
	@keyframes animate {
		0% {
			transform: translate(-50%, -75%) rotate(0deg);
		}
		100% {
			transform: translate(-50%, -75%) rotate(360deg);
		}
	}
`

export default Homepage
