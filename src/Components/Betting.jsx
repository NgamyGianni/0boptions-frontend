import React from "react"
import styled from "styled-components"
import { AiOutlineTeam } from "react-icons/ai"

const Betting = () => {
	return (
		<Container>
			<Status>Live</Status>
			<Teams>
				<AiOutlineTeam />
				<ScoreContainer>
					<Score>2 - 1</Score>
					<Time>72'</Time>
				</ScoreContainer>
				<AiOutlineTeam />
			</Teams>
			<Bets></Bets>
		</Container>
	)
}

const Container = styled.div`
	margin-top: 5rem;
	background-color: #191b1f;
	width: 400px;
	height: 350px;
	border-radius: 1rem;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	gap: 0px 0px;
	grid-template-areas:
		". . . . . ."
		". Status Status . . ."
		". . . . . ."
		". Teams Teams Teams Teams ."
		". . . . . ."
		". bets bets bets bets ."
		". . . . . .";
`
const Status = styled.div`
	grid-area: Status;
	color: green;
`

const Teams = styled.div`
	grid-area: Teams;
	display: flex;
	align-items: center;
	justify-content: center;
	& svg {
		width: 30%;
		height: 100%;
	}
`
const ScoreContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const Score = styled.p`
	font-size: 1.1rem;
	color: white;
`

const Time = styled.span`
	font-size: 0.9rem;
	color: green;
`

const Bets = styled.div`
	grid-area: bets;
`

export default Betting
