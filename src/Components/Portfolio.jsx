import React, { Component } from "react"
import styled from "styled-components"
import { FaEthereum } from "react-icons/fa"

const Portfolio = ({userInfos}) => {
	return (
		<Container>
			<Currency>
				Polygon
			</Currency>
			<Money>{parseFloat(userInfos.balance).toFixed(3)} MATIC</Money>
			<Address>{userInfos.account}</Address>
		</Container>
	)
}


const Container = styled.div`
	background-color: #191b1f;
	border : 1px solid #191b1f;
	padding: 0.5rem;
	border-radius: 0.5rem;
	display: flex;
	width: 40%;
	justify-content: space-between;
`

const Currency = styled.div`
	background-color: rgb(33, 36, 41);
	border: 1px solid rgb(33, 36, 41);
	color: rgb(149, 103, 255);
	padding: 0.5rem;
	border-radius: 0.5rem;
	font-family: Inter,sans-serif;
`

const Money = styled.div`
	background-color: rgb(33, 36, 41);
	border : 1px solid rgb(33, 36, 41);
	color: white;
	padding: 0.5rem;
	border-radius: 0.5rem;
	font-family: Inter,sans-serif;
`

const Address = styled.div`
	background-color: rgb(33, 36, 41);
	border : 1px solid rgb(33, 36, 41);
	color: white;
	padding: 0.5rem;
	border-radius: 0.5rem;
`

export default Portfolio
