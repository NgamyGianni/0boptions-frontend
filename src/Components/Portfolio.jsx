import React, { Component } from "react"
import styled from "styled-components"
import { FaEthereum } from "react-icons/fa"
import Web3 from 'web3'

export let selectedAccount;

class Portfolio extends Component{

	constructor(){
		super();
		this.state = {
			address: '',
			balance: '',
			network: ''
		}
	}

	componentWillMount(){
		this.logAccount();
	}

	async logAccount(){
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
			this.setState({ 
		    	account: selectedAccount,
		    	balance: web3.utils.fromWei(await web3.eth.getBalance(selectedAccount), 'ether'),
    			network: await web3.eth.net.getNetworkType()
		    });
		}
	}

	render() {
		return (
			<Container>
				<Currency>
					<FaEthereum />
					Ethereum
				</Currency>
				<Money>0 ETH</Money>
				<Address>{this.state.account}</Address>
			</Container>
		)
	}
}

const Container = styled.div`
	background-color: #191b1f;
	padding: 0.5rem;
	border-radius: 0.5rem;
	display: flex;
	width: 40%;
	justify-content: space-between;
`

const Currency = styled.div`
	background-color: #2f3031;
	color: white;
	padding: 0.5rem;
	border-radius: 0.5rem;
`

const Money = styled.div`
	background-color: #2f3031;
	color: white;
	padding: 0.5rem;
	border-radius: 0.5rem;
`

const Address = styled.div`
	background-color: #2f3031;
	color: white;
	padding: 0.5rem;
	border-radius: 0.5rem;
`

export default Portfolio
