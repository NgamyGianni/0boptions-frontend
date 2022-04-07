import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import Betting from "../Components/Betting"
import CurrentGame from "../Components/CurrentGame"
import PreviousGame from "../Components/PreviousGame"
import Navbar1 from "../Components/Navbar"
import Web3 from "web3"
import SwiperCore, { Scrollbar } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper.min.css"
import "swiper/components/scrollbar/scrollbar.min.css"
import { abi } from "../Config/abi"
import { UserContext } from "../Provider/UserProvider"
import PngTool from "../output-onlinepngtools.png"
import { ADDRESS } from "../Config/contract"
SwiperCore.use([Scrollbar])

const Homepage = () => {
	const { user, setUser } = useContext(UserContext)
	const [idCurrentGame, setIdCurrentGame] = useState({
		previous: 0,
		current: 0,
		next: 0
	})
	const web3 = new Web3(window.ethereum)
	const contract = new web3.eth.Contract(abi, ADDRESS)

	const updateUserInformation = async (selectedAccount) => {
		let rewardList = await contract.methods.getUserAvailableWins(selectedAccount).call()
		let reward = 0
		let game
		let user

		for (let i = 0; i < rewardList.length; i++) {
			if (rewardList[i] > 0) {
				await contract.methods
					.Games(rewardList[i])
					.call()
					.then((receipt) => {
						game = receipt
					})

				user = await contract.methods.users(rewardList[i], user.account).call()
				reward += (user.amount * game.rewardAmount) / game.rewardPoolAmount
			}
		}
		const balance = await web3.eth.getBalance(selectedAccount)
		const networkId = await web3.eth.net.getId()

		setUser((previousUser) => ({
			...previousUser,
			account: selectedAccount,
			rewards: parseFloat(web3.utils.fromWei(String(reward), "ether")),
			balance: web3.utils.fromWei(balance, "ether"),
			network: networkId,
			contract: "0xCa2d0B66cb00C9FFB7C35602c65EbefD06e291cB",
			status: "connected"
		}))
	}

	const logAccount = async () => {
		const provider = window.ethereum

		if (typeof provider !== "undefined") {
			await provider
				.request({ method: "eth_requestAccounts" })
				.then((accounts) => {
					updateUserInformation(accounts[0])
					console.log("accounts", accounts)
				})
				.catch((err) => {
					console.log(err)
					return
				})

			await window.ethereum.on("accountsChanged", function (accounts) {
				updateUserInformation(accounts[0])
				console.log("accounts", accounts)
			})
		}
	}

	useEffect(() => {
		logAccount()
	}, [])

	useEffect(() => {
		getData()
		console.log(user)
	}, [user])

	useEffect(() => {
		if (window.ethereum) {
			window.ethereum.on("chainChanged", () => {
				if (web3.eth.net.getId() !== 137) {
					switchEthereumChain()
				}
				window.location.reload()
			})
			window.ethereum.on("accountsChanged", () => {
				if (web3.eth.net.getId() !== 137) {
					switchEthereumChain()
				}
				window.location.reload()
			})
		}
	}, [user])

	const getData = async () => {
		await contract.methods.currentGameId
			.call()
			.call()
			.then((receipt) => {
				setIdCurrentGame({
					previous: parseInt(receipt) - 1,
					current: parseInt(receipt),
					next: parseInt(receipt) + 1
				})
			})
	}

	const reward = async () => {
		if (user.network === 137)
			await contract.methods.reward(await contract.methods.getUserAvailableWins(user.account).call()).send({ from: user.account, type: "0x0" })
	}

	const switchEthereumChain = async () => {
		try {
			await window.ethereum.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: "0x89" }]
			})
		} catch (e) {
			if (e.code === 4902) {
				try {
					await window.ethereum.request({
						method: "wallet_addEthereumChain",
						params: [
							{
								chainId: "0x89",
								chainName: "Polygon Mainnet",
								nativeCurrency: {
									name: "Polygon",
									symbol: "MATIC",
									decimals: 18
								},
								blockExplorerUrls: ["https://explorer.matic.network/"],
								rpcUrls: ["https://rpc-mainnet.maticvigil.com/"]
							}
						]
					})
				} catch (addError) {
					console.error(addError)
				}
			}
		}
	}

	return (
		<Main>
			<Navbar1 page="Homepage" />
			{user.network === 137 ? (
				<Swiper
					initialSlide={5}
					scrollbar
					slidesPerView={3}
					centeredSlides={false}
					grabCursor={true}
					spaceBetween={30}
					pagination={{
						clickable: true
					}}>
					<SwiperSlide>
						<PreviousGame idCurrentGame={idCurrentGame.previous - 3 >= 0 ? idCurrentGame.previous - 3 : idCurrentGame.previous} />
					</SwiperSlide>
					<SwiperSlide>
						<PreviousGame idCurrentGame={idCurrentGame.previous - 2 >= 0 ? idCurrentGame.previous - 2 : idCurrentGame.previous} />
					</SwiperSlide>
					<SwiperSlide>
						<PreviousGame idCurrentGame={idCurrentGame.previous - 1 >= 0 ? idCurrentGame.previous - 1 : idCurrentGame.previous} />
					</SwiperSlide>
					<SwiperSlide>
						<PreviousGame idCurrentGame={idCurrentGame.previous} />
					</SwiperSlide>
					<SwiperSlide>
						<CurrentGame idCurrentGame={idCurrentGame.current} />
					</SwiperSlide>
					<SwiperSlide>
						<Betting idCurrentGame={idCurrentGame.next} />
					</SwiperSlide>
				</Swiper>
			) : (
				<Container style={{ "margin-top": "15%", "flex-direction": "column" }}>
					<RewardTextNo>Make sure Metamask is installed and connected to Polygon's network.</RewardTextNo>
					<RewardTextNo>Click below to switch networks.</RewardTextNo>
					<RewardButtonNo style={{ width: "20%" }} onClick={() => switchEthereumChain()}>
						Switch network
					</RewardButtonNo>
				</Container>
			)}
			<ButtonsContainer>
				{user.network === 137 ? <RewardText>{user.rewards > 0 ? user.rewards : 0} MATIC</RewardText> : ""}
				<RewardsContainer>
					<Reward>
						<RewardButton onClick={() => window.open("https://discord.gg/8YNB9yMNnm")}>Join our Discord Server</RewardButton>
					</Reward>
					{user.network === 137 ? (
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
				<RewardsContainer style={{ marginTop: "3%", marginLeft: "90%" }}>
					<RewardButton onClick={() => window.open("https://twitter.com/0bLabs?ref_src=twsrc%5Etfw")}>
						<img src={PngTool} style={{ width: "15%" }} alt="png tool" />
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

// const LoginButton = styled.button`
// 	color: rgb(149, 177, 254);
// 	padding: 0.5rem;
// 	border-radius: 0.5rem;
// 	justify-content: center;
// 	align-items: center;
// 	font-family: Inter, sans-serif;
// `

// const RewardNo = styled.div`
// 	margin-left: 40%;
// 	grid-area: reward;
// 	background-color: #191b1f;
// 	border: 1px solid #191b1f;
// 	padding: 0.5rem;
// 	border-radius: 0.5rem;
// 	display: flex;
// 	flex-direction: column;
// 	width: 20%;
// 	align-items: center;
// `

const RewardTextNo = styled.div`
	color: rgb(149, 177, 254);
	padding: 0.5rem;
	border-radius: 0.5rem;
	justify-content: center;
	align-items: center;
	font-family: Inter, sans-serif;
`

const RewardButtonNo = styled.button`
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

const Reward = styled.div`
	border: 1px solid #191b1f;
	padding: 0.5rem;
	border-radius: 0.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const RewardText = styled.div`
	color: rgb(149, 177, 254);
	padding: 0.5rem;
	border-radius: 0.5rem;
	text-align: center;
	font-size: 1.2rem;
	font-family: Inter, sans-serif;
	background-color: #191b1f;
	margin: auto;
	position: relative;
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
	justify-content: center;
	gap: 2rem;
	align-items: center;
	justify-content: center;
	background-color: #191b1f;
	margin: auto;
	padding: 0.5rem;
	border-radius: 1rem;
`

// const SpecialReward = styled.button`
// 	position: relative;
// 	padding: 16px;
// 	display: block;
// 	text-decoration: none;
// 	width: 100%;
// 	overflow: hidden;
// 	border-radius: 20px;
// 	outline: none;
// 	border: none;
// 	cursor: pointer;
// 	&:disabled {
// 		cursor: auto;
// 		pointer-events: none;
// 	}
// 	& > span {
// 		position: relative;
// 		color: rgb(84, 36, 50);
// 		font-size: 1.1rem;
// 		font-family: "Inter custom", sans-serif;
// 		z-index: 1;
// 	}
// 	& > .liquid {
// 		position: absolute;
// 		top: -80px;
// 		left: 0;
// 		width: 200px;
// 		height: 200px;
// 		background: rgb(255, 150, 165);
// 		box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
// 		transition: 0.5s;
// 		border: none;
// 		outline: none;
// 		&::after,
// 		&::before {
// 			content: "";
// 			width: 200%;
// 			height: 200%;
// 			position: absolute;
// 			top: 0;
// 			left: 50%;
// 			transform: translate(-50%, -75%);
// 			background: #fff;
// 		}
// 		&::before {
// 			border-radius: 45%;
// 			background: rgba(20, 20, 20, 1);
// 			animation: animate 5s linear infinite;
// 		}
// 		&::after {
// 			border-radius: 40%;
// 			background: rgb(149, 177, 254);
// 			animation: animate 10s linear infinite;
// 		}
// 	}
// 	&:hover .liquid {
// 		top: -120px;
// 	}
// 	@keyframes animate {
// 		0% {
// 			transform: translate(-50%, -75%) rotate(0deg);
// 		}
// 		100% {
// 			transform: translate(-50%, -75%) rotate(360deg);
// 		}
// 	}
// `

export default Homepage
