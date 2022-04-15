import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Navbar from "../Components/Navbar"
import Web3 from 'web3'
import { Button, Text, Loading } from '@nextui-org/react';

const Claim = () => {
	const web3 = new Web3(window.ethereum);
	let abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_lastGame","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"}],"name":"_changeCurrentGame","type":"event"},{"anonymous":false,"inputs":[],"name":"_initCycle","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_joinDown","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_joinUp","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"uint256[]","name":"_game","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_reward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_address","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"_rewardAdmin","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"update","type":"uint256"}],"name":"_setIntervalTime","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_game","type":"uint256"}],"name":"_updateTreasury","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"Games","outputs":[{"internalType":"uint256","name":"upAmount","type":"uint256"},{"internalType":"uint256","name":"downAmount","type":"uint256"},{"internalType":"uint256","name":"totalAmount","type":"uint256"},{"internalType":"uint256","name":"rewardAmount","type":"uint256"},{"internalType":"uint256","name":"rewardPoolAmount","type":"uint256"},{"internalType":"bool","name":"rewardCalculated","type":"bool"},{"internalType":"uint256","name":"endTimestamp","type":"uint256"},{"internalType":"int256","name":"priceEnd","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NextCurrentGame","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentGameId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentPrice","outputs":[{"internalType":"int256","name":"_price","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserAvailableWins","outputs":[{"internalType":"uint256[]","name":"_winGames","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserGames","outputs":[{"internalType":"uint256[]","name":"games","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserTotalAmount","outputs":[{"internalType":"uint256","name":"amountGames","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserWinAmount","outputs":[{"internalType":"uint256","name":"_winAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserWins","outputs":[{"internalType":"uint256[]","name":"_winGames","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initCycle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"intervalSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"idGame","type":"uint256"},{"internalType":"address","name":"_address","type":"address"}],"name":"isWinner","outputs":[{"internalType":"bool","name":"_isWinner","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"joinDown","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"joinUp","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"idGames","type":"uint256[]"}],"name":"reward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_address","type":"address"}],"name":"rewardAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_intervalSeconds","type":"uint256"}],"name":"setIntervalSeconds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userGames","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint8","name":"poolChoice","type":"uint8"},{"internalType":"bool","name":"claimed","type":"bool"}],"stateMutability":"view","type":"function"}];
	let contract = new web3.eth.Contract(abi, "0xCa2d0B66cb00C9FFB7C35602c65EbefD06e291cB");

	let abiClaim = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AddReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"GetRewardGames","type":"event"},{"inputs":[],"name":"ObContract","outputs":[{"internalType":"contract I0bOptions","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ObToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"addReward","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentRewardAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRewardGames","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"index","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"isWinnerGames","outputs":[{"internalType":"bool","name":"","type":"bool"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"nbWinnersByIndex","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardAmountByGame","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"winners","outputs":[{"internalType":"uint256","name":"lastGameLength","type":"uint256"}],"stateMutability":"view","type":"function"}]
	let contractClaim = new web3.eth.Contract(abiClaim, "0xff5e58A9e6F2658F838fD68Dd353Da6645B004B7")

	let abiToken = [{"inputs":[{"internalType":"uint256","name":"total","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenOwner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"delegate","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"delegate","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"buyer","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
	let contractToken = new web3.eth.Contract(abiToken, "0x77127bEC1015d13B03CB6364E49c050C0FE1f22a")

	let connected = false;

	const [userInfos, setUserInfos] = useState({account: "0xCa2d0B66cb00C9FFB7C35602c65EbefD06e291cB",
					balance: "0",
					network: "",
					contract: "0xCa2d0B66cb00C9FFB7C35602c65EbefD06e291cB",
				});

	const [profileInfos, setProfileInfos] = useState({
		pendingRounds: "...",
		balance : "...",
		contractBalance : "..."
	})

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
		if(selectedAccount !== "" && userInfos.network == "137"){

			let pendingRounds = await contractClaim.methods.isWinnerGames(selectedAccount).call();
			let balance = await web3.utils.fromWei(await contractToken.methods.balanceOf(selectedAccount).call());
			let contractBalance = await web3.utils.fromWei(await contractToken.methods.balanceOf("0xff5e58A9e6F2658F838fD68Dd353Da6645B004B7").call());

			setProfileInfos({
				pendingRounds: pendingRounds[2],
				balance : balance,
				contractBalance: contractBalance
			});
		}else{
			setProfileInfos({
				pendingRounds: 0,
				balance : 0,
				contractBalance: 0
			});
		}
	}

	async function reward(){
		if(userInfos.network == "137")	await contractClaim.methods.getRewardGames().send({from: selectedAccount, type: "0x0"});
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
		if(userInfos.status !== "connected")	logAccount();
	}, [selectedAccount, counter])

	useEffect(() => {
			if(userInfos.status === "connected" && (profileInfos.balance === "..." || profileInfos.balance === "error"))	getData();
			setTimeout(() => {setCounter(counter+1);}, 1000)
	}, [counter, selectedAccount])

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
	}, [selectedAccount, profileInfos])
	return (
		<Main>
			<Navbar userInfos={userInfos} page="Claim"/>
			{userInfos.status == "connected" ?	
			userInfos.network == "137" ? 
				<ContainerGen>
					<Container>
						<StatsContainer>
							<Stats>
								<Key>Contract Balance</Key>
								<Value>{profileInfos.contractBalance == "..." ? <Loading size="xs"/> : profileInfos.contractBalance} 0b</Value>
							</Stats>
							<Stats style={{"marginTop": "10%"}}>
								<Key>Join a game with 1 MATIC or more to win 10 0bToken</Key>
								<Value>{profileInfos.pendingRounds == "..." ? <Loading size="xs"/> : profileInfos.pendingRounds} {profileInfos.pendingRounds <= 1 ? "round" : "rounds"}</Value>
								{profileInfos.pendingRounds == "..." ? "" : <Button flat color={profileInfos.pendingRounds > 0 ? "success" : "error"} onClick={() => reward()}>Collect</Button>}
							</Stats>
							<Stats>
								<Key>Pending</Key>
								<Value>{profileInfos.pendingRounds == "..." ? <Loading size="xs"/> : 10 * profileInfos.pendingRounds} 0b</Value>
							</Stats>
							<Stats>
								<Key>Your Balance</Key>
								<Value>{profileInfos.balance == "..." ? <Loading size="xs"/> : profileInfos.balance} 0b</Value>
							</Stats>
						</StatsContainer>
					</Container>
				</ContainerGen>
			: 
			<ContainerGen style={{"flex-direction": "column"}}>
					<RewardText>Make sure Metamask is installed and connected to Polygon's network.</RewardText>
					<RewardText>Click below to switch networks.</RewardText>
					<RewardButton style={{width: "20%"}} onClick={() => switchEthereumChain()}>Switch network</RewardButton>
			</ContainerGen>
			:
			<ContainerGen style={{"flex-direction": "column"}}>
				<Loading size="xl" />
				<RewardText>Make sure Metamask is installed and connected to Polygon's network.</RewardText>
				<RewardButton style={{width: "20%"}} onClick={() => window.open("https://metamask.io")}>Install Metamask</RewardButton>
				<RewardText>Click below to switch networks.</RewardText>
				<RewardButton style={{width: "20%"}} onClick={() => switchEthereumChain()}>Switch network</RewardButton>
			</ContainerGen>
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
    background-repeat: initial, initial;
    background-attachment: initial, initial;
    background-origin: initial, initial;
    background-clip: initial, initial;
    background-color: rgb(31, 33, 40);
    background-blend-mode: overlay, normal;
    overflow: hidden;
`

const ContainerGen = styled.div`
	height: 100%;
  	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 5%;
`

const Container = styled.div`
	color: rgb(84, 36, 50);
	margin-top: 5rem;
	width: 60%;
	height: 50%;
	border-radius: 1rem;
	display: flex;
	flex-direction: column;
	font-family: Inter,sans-serif;
	flex-direction:column;
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

const Reward = styled.div`
	margin-left: 40%;
	margin-top: 9%;
	grid-area: reward;
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
	transition: cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s;
	&:hover {
		background-image: linear-gradient(90deg, rgb(255, 150, 165) 0%, rgb(255, 185, 140) 100%);
	}
`

export default Claim
