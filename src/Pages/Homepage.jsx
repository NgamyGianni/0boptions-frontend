import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Betting from "../Components/Betting"
import CurrentGame from "../Components/CurrentGame"
import TableGames from "../Components/TableGames"
import PreviousGame from "../Components/PreviousGame"
import LogsGame from "../Components/LogsGame"
import NextGame from "../Components/NextGame"
import ActualGame from "../Components/ActualGame"
import Navbar1 from "../Components/Navbar"
import Web3 from 'web3'
import SwiperCore, { Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";
import { Progress, Text, Loading } from '@nextui-org/react';


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
		next: 0,
		game: "",
		timeLeft: "",
		timestampLeft:"",
		event : ""
	});
	const [selectedAccount, setSelectedAccount] = useState("");

	const [timeLeft, setTimeLeft] = useState("");

	const [userReward, setUserReward] = useState({rewards: ""});

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

				setUserInfos({
					account: selectedAccount,
					balance: await web3.utils.fromWei(await web3.eth.getBalance(selectedAccount), 'ether'),
					network: await web3.eth.net.getId(),
					contract: "0xCa2d0B66cb00C9FFB7C35602c65EbefD06e291cB",
					status: "connected",
				});
			}
		}
	}
	async function getData(){
		if(timeLeft !== ""){
			let current = timeLeft.current;
			let game = timeLeft.game;

			let currentBlock = await web3.eth.getBlockNumber();

			let joinEvents = await contract.getPastEvents('_joinUp',
			    {fromBlock: currentBlock - 999}//, toBlock:currentBlock}
			);

			let joinDownEvents = await contract.getPastEvents('_joinDown',
			    {fromBlock: currentBlock - 999}//, toBlock:currentBlock}
			);


			let events = [];

			for(let i=0; i<joinEvents.length; i++){
				if(joinEvents[i].event == "_joinUp" || joinEvents[i].event == "_joinDown")	events.push(joinEvents[i])
			}

			setIdCurrentGame({
				current: current,
				game: game,
				events : events.reverse()
			});
		}
	}

	async function getTime(){
		let current;
		let game;
		let gamePred;

		await contract.methods.currentGameId.call().call()
				.then(function(receipt){
					current = parseInt(receipt)
				});
		await contract.methods.Games(current-1).call()
				.then(function(receipt){
					gamePred = receipt
		})

		await contract.methods.Games(current).call()
				.then(function(receipt){
					game = receipt
				})

		/*let min = String((game.endTimestamp - Math.floor(Date.now()/1000)) % 60);
		if(min < 10)	min  = "0"+ min*/

		setTimeLeft({
			/*timeLeft: Math.floor((game.endTimestamp - Math.floor(Date.now()/1000))/60) >= 0 ? "Time left : " + String(Math.floor((game.endTimestamp - Math.floor(Date.now()/1000))/60)) + " : " + min : "Calculating",
			timestampLeft:((Date.now()/1000) - gamePred.endTimestamp)*100/(game.endTimestamp - gamePred.endTimestamp),*/
			gameEndTimestamp: game.endTimestamp,
			gamePredEndTimestamp: gamePred.endTimestamp,
			game: game,
			gamePred: gamePred,
			current: current
		})
	}

	async function getReward(){
		if(selectedAccount !== "" && await web3.eth.net.getId() == "137"){
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
					reward += await (user.amount*game.rewardAmount)/game.rewardPoolAmount
				}
			}

			setUserReward({
				rewards: parseFloat(await web3.utils.fromWei(String(reward), 'ether'))
			})
		}
		else{
			setUserReward({
				rewards: ""
			})
		}
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
	const [counterData, setCounterData] = useState(0)
	const [counterTime, setCounterTime] = useState(0)
	const [data, setData] = useState(0)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		if(userInfos.status !== "connected")	logAccount();	
	}, [counterTime, selectedAccount])

	useEffect(() => {
		getData();
		if(idCurrentGame.game !== "")	setTimeout(() => {setCounterData(counterData+1);}, 15000)
		else	setTimeout(() => {setCounterData(counterData+1);}, 2000)
	}, [counterData])

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

	const [timeLeftVar, setTimeLeftVar] = useState(0)
	const [timeLeftTimestamp, setTimeLeftTimestamp] = useState(0)

	useEffect(() => {
		getTime();
	}, [idCurrentGame.current])

	useEffect(() => {
		setTimeout(() => {setCounterTime(counterTime+1);}, 1000)

		let min = String((timeLeft.gameEndTimestamp - Math.floor(Date.now()/1000)) % 60);
		if(min < 10)	min  = "0"+ min

		setTimeLeftVar(Math.floor((timeLeft.gameEndTimestamp - Math.floor(Date.now()/1000))/60) >= 0 ? "Time left : " + String(Math.floor((timeLeft.gameEndTimestamp - Math.floor(Date.now()/1000))/60)) + " : " + min : "Calculating")
		setTimeLeftTimestamp(((Date.now()/1000) - timeLeft.gamePredEndTimestamp)*100/(timeLeft.gameEndTimestamp - timeLeft.gamePredEndTimestamp))

	}, [counterTime])

	useEffect(() => {
		//if(counter >= 5 && data < 3){
			if(userInfos.status === "connected" && userReward.rewards === "")	{
				getReward();
			}
			//setTimeout(() => {setCounter(counter+1);}, 1000)
			//setData(data+1)
		//}
	}, [selectedAccount, counterTime])

	return (
			<Main>
				<Navbar1 userInfos={userInfos} page="Homepage"/>
				{userInfos.status == "connected" ?
				<div>
				<div style={{"justify-content": "center", "text-align": "center"}}>
				<Text color = "success" weight="bold">{timeLeftVar}</Text>
				<Progress value={timeLeftTimestamp} shadow color="gradient" status="primary"/>
				</div>
				<div style={{"display" : "flex", "flex-direction": "row"}}>
				<StatsContainer style={{"marginTop": "0%", "width": "50%"}}>
							<Stats>
								<Key>Id</Key>
								<Key>Pool size</Key>
								<Key>Up payout</Key>
								<Key>Down payout</Key>
								<Key>Locked price</Key>
								<Key>Current price</Key>
							</Stats>
							<ActualGame userInfos={userInfos} idCurrentGame={idCurrentGame}/>
				</StatsContainer>
				<StatsContainer style={{"marginTop": "0%", "width": "50%"}}>
							<Stats>
								<Key>Id</Key>
								<Key>Pool size</Key>
								<Key>Up payout</Key>
								<Key>Down payout</Key>
							</Stats>
							<NextGame userInfos={userInfos} idCurrentGame={idCurrentGame.current+1} events={idCurrentGame.events}/>
				</StatsContainer>
				</div>
				<div style={{"display" : "flex", "flex-direction": "row"}}>
					<Container2>
						<StatsContainer>
							<Stats>
								<Key>Id</Key>
								<Key>Pool size</Key>
								<Key>Up payout</Key>
								<Key>Down payout</Key>
								<Key>Locked price</Key>
								<Key>Closed price</Key>
							</Stats>
						<TableGames userInfos={userInfos} idCurrentGame={idCurrentGame.current-1 >= 0 ? idCurrentGame.current-1 : idCurrentGame.current}/>
						<TableGames userInfos={userInfos} idCurrentGame={idCurrentGame.current-2 >= 0 ? idCurrentGame.current-2 : idCurrentGame.current}/>
						<TableGames userInfos={userInfos} idCurrentGame={idCurrentGame.current-3 >= 0 ? idCurrentGame.current-3 : idCurrentGame.current}/>
						<TableGames userInfos={userInfos} idCurrentGame={idCurrentGame.current-4 >= 0 ? idCurrentGame.current-4 : idCurrentGame.current}/>
						<TableGames userInfos={userInfos} idCurrentGame={idCurrentGame.current-5 >= 0 ? idCurrentGame.current-5 : idCurrentGame.current}/>
						</StatsContainer>
					</Container2>
					<LogsGame userInfos={userInfos} idCurrentGame={idCurrentGame}/>
				</div>
				
				<ButtonsContainer>
				{userInfos.network == "137" ? (<RewardText>{userReward.rewards === "" ? <Loading size="xs"/> : userReward.rewards} MATIC</RewardText>):("")}
				<RewardsContainer>
					<Reward>
						<RewardButton onClick={() => window.open("https://discord.gg/8YNB9yMNnm")}>Join our Discord Server</RewardButton>
					</Reward>
					{userInfos.network == "137" ? (
						<Reward>
							<RewardButton onClick={() => reward()}>
								<span>Collect Winnings</span>
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
			</ButtonsContainer>
			</div>
			:
			<ContainerLoading style={{"flex-direction": "column"}}>
				<Loading size="xl" />
				<RewardTextNo>Make sure Metamask is installed and connected to Polygon's network.</RewardTextNo>
				<RewardButton style={{width: "20%"}} onClick={() => window.open("https://metamask.io")}>Install Metamask</RewardButton>
				<RewardTextNo>Click below to switch networks.</RewardTextNo>
				<RewardButton style={{width: "20%"}} onClick={() => switchEthereumChain()}>Switch network</RewardButton>
			</ContainerLoading>
			}
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
    overflow: hidden;
`

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 5%;
`

const StatsContainer = styled.div`
	background-color: #191b1f;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 0.5rem;
`

const ContainerLoading = styled.div`
	height: 100%;
  	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 5%;
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

const Container2 = styled.div`
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
