import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Portfolio from "../Components/Portfolio"

const Navbar = ({userInfos}) => {
	return (
		<Header>
			<Tabs>
				<Tab className="active">
					<LinkToPage to="/">Open Games</LinkToPage>
				</Tab>
				<Tab>
					<LinkToPage to="/history">History</LinkToPage>
				</Tab>
			</Tabs>
			<Portfolio userInfos={userInfos}/>
		</Header>
	)
}

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
