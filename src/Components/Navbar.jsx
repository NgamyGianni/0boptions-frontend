import React from "react"
import styled from "styled-components"
import Portfolio from "../Components/Portfolio"

const Navbar = ({userInfos}) => {
	return (
		<Header>
			<Title>
				<img src={require("../logo.jpg").default} style={{width:"20%"}} alt="ok"/>
				<TitleText>Automated binary options maker</TitleText>
			</Title>
			<Title style={{"margin-left": "3.5%"}}>
				<img src={require("../pngaaa.com-4112190.png").default} style={{width:"15%"}} alt="ok"/>
				<TitleText>Ethereum</TitleText>
			</Title>
			<Portfolio userInfos={userInfos}/>
		</Header>
	)
}

const Title = styled.div`
	background-image: linear-gradient(90deg, rgb(206, 162, 206) 0%, rgb(149, 177, 254) 100%);
	border: 1px solid linear-gradient(90deg, rgb(206, 162, 206) 0%, rgb(149, 177, 254) 100%);
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
	width: 100%;
	text-align: center;
`

const Header = styled.header`
	font-family: Inter,sans-serif;
	height: 60px;
	padding: 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
`

export default Navbar
