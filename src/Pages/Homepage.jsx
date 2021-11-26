import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Betting from "../Components/Betting"
import { BiFootball, BiBasketball, BiTennisBall } from "react-icons/bi"
import { MdSportsRugby } from "react-icons/md"
import Navbar from "../Components/Navbar"
import Portfolio from "../Components/Portfolio"
import Web3 from 'web3'

const Homepage = () => {
	const [userInfos, setUserInfos] = useState({account: "Not connected",
		 		    balance: "0",
		     		network: "Not connected",
		     		contract: "0xB9CB82DE47db637938a408CeD9E7Edb2f0748130"});
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
		 		setUserInfos({ 
		 		    account: selectedAccount,
		 		    balance: await web3.utils.fromWei(await web3.eth.getBalance(selectedAccount), 'ether'),
		     		network: await web3.eth.net.getNetworkType(),
		     		contract: "0xB9CB82DE47db637938a408CeD9E7Edb2f0748130",
		     		status: "connected"
		 		});
		 	}
	 	}
	}
	useEffect(() => {
		logAccount();
        if (window.ethereum) {
            window.ethereum.on("chainChanged", () => {
                window.location.reload()
            })
            window.ethereum.on("accountsChanged", () => {
                window.location.reload()
            })
        }
    }, [selectedAccount])
	return (
		<Main>
			<Navbar userInfos={userInfos}/>
			<Container>
				<Betting userInfos={userInfos}/>
			</Container>
		</Main>
	)
}

const Main = styled.main`
	height: 100vh;
	background: linear-gradient(0deg, #030a1a 0%, rgba(1, 1, 1, 1) 100%);
`

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
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

export default Homepage
