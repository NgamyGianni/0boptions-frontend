import React from "react"
import styled from "styled-components"
import { FaEthereum } from "react-icons/fa"

const Portfolio = () => {
	return (
		<Container>
			<Currency>
				<FaEthereum />
			</Currency>
			<Money>0 ETH</Money>
		</Container>
	)
}

const Container = styled.div`
	background-color: #191b1f;
	padding: 0.5rem;
	border-radius: 0.5rem;
	display: flex;
	width: 150px;
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

export default Portfolio
