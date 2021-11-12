import React, { Component } from "react"
import styled from "styled-components"
import Betting from "../Components/Betting"
import { BiFootball, BiBasketball, BiTennisBall } from "react-icons/bi"
import { MdSportsRugby } from "react-icons/md"
import Navbar from "../Components/Navbar"
import Portfolio from "../Components/Portfolio"
import Web3 from 'web3'

const Homepage = () => {
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
