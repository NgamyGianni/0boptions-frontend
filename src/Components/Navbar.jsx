import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Portfolio from "../Components/Portfolio"

const Navbar = ({userInfos}) => {
	return (
		<Header>
			<Title>
				<img src={require("../logo.jpg").default} style={{width:"20%"}}/>
				<TitleText>Automated binary options maker</TitleText>
			</Title>
			<Title>
				<img src={require("../pngaaa.com-4112190.png").default} style={{width:"15%"}}/>
				<TitleText>Ethereum</TitleText>
			</Title>
			<Portfolio userInfos={userInfos}/>
		</Header>
	)
}

const Title = styled.div`
	background-image: linear-gradient(90deg, rgb(206, 162, 206) 0%, rgb(149, 177, 254) 100%);
	border: 1px solid #191b1f;
	padding: 0.5rem;
	border-radius: 0.5rem;
	display: flex;
	flex-direction: row;
	width: 20%;
	height: 180%;
	align-items: center;
`

const TitleText = styled.div`
	padding: 0.5rem;
	border-radius: 0.5rem;
	font-family: Inter,sans-serif;
	width: 100%;
	text-align: center;
`

const Infos = styled.div`
	background-color: #191b1f;
	border: 1px solid #191b1f;
	padding: 0.5rem;
	border-radius: 0.5rem;
	display: flex;
	flex-direction: row;
	width: 20%;
	align-items: center;
`

const InfosText = styled.div`
	color: rgb(149, 177, 254);
	padding: 0.5rem;
	border-radius: 0.5rem;
	font-family: Inter,sans-serif;
	width: 100%;
	text-align: center;
`

const Header = styled.header`
	height: 60px;
	padding: 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
`
const Tabs = styled.div`
	display: flex;
	background-color: #191b1f;
	padding: 0.5rem;
	border-radius: 0.5rem;
`
const LinkToPage = styled(Link)`
	text-decoration: none;
	color: #fff;
	transition: cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s;

	&:hover {
		color: #9b9b9b;
	}
`
const Tab = styled.div`
	padding: 0.5rem;
	border-radius: 0.5rem;
	color: #fff;
	cursor: pointer;
	&.active {
		background-color: #2c2f36;
	}
	&:first-child {
		margin-right: 1rem;
	}
`

export default Navbar
