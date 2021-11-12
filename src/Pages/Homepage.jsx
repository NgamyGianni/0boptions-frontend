import React, { Component } from "react"
import styled from "styled-components"
import Betting from "../Components/Betting"
import { BiFootball, BiBasketball, BiTennisBall } from "react-icons/bi"
import { MdSportsRugby } from "react-icons/md"
import Navbar from "../Components/Navbar"
import Portfolio from "../Components/Portfolio"
import Web3 from 'web3'

export let selectedAccount;

class Homepage extends Component{

	componentWillMount(){
		this.loadAccount();
	}

	async loadAccount(){
		let provider = window.ethereum;
		const web3 = new Web3(window.ethereum);
		if (typeof provider !== 'undefined') {
			await provider
				.request({ method: 'eth_requestAccounts' })
				.then((accounts) => {
					selectedAccount = accounts[0];
					console.log(`Selected account is ${selectedAccount}`);
				})
				.catch((err) => {
					console.log(err);
					return;
				});

			await window.ethereum.on('accountsChanged', function (accounts) {
				selectedAccount = accounts[0];
				console.log(`Selected account changed to ${selectedAccount}`);
			});
			await this.setState({ 
		    	account: selectedAccount, 
		    });
		}
    	this.setState({ 
    		balance: web3.utils.fromWei(await web3.eth.getBalance(selectedAccount), 'ether'),
    		network: await web3.eth.net.getNetworkType()
    	});
    	console.log(this.state.account)
    	console.log(this.state.balance)
    	console.log(this.state.network)
    	console.log(this.state.contract)
	}

	constructor(){
		super();
		this.state = {
			account: '',
			contract: '0xc4Cb5b35ED0a23DBbF6D9e7Dd46278D13Ce12264',
			balance: '',
			network: ''
		}
	}

	render(){
		return (
			<Main>
				<Navbar />
				<Container>
					<Categories>
						<BiFootball className="active" />
						<BiBasketball />
						<BiTennisBall />
						<MdSportsRugby />
					</Categories>
					<Betting />
				</Container>
			</Main>
		)
	}
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
