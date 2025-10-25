import { useEffect, useState, type FC } from 'react'

import { GameState, Player } from '@/types/ticTacToe'
import Board from '@/pages/TicTacToe/components/Board'
import GameInfo from '@/pages/TicTacToe/components/Info'
import Button from '@/components/Button'

import {
	ErrorMessage,
	FinishedActions,
	GameContainer,
	GameIdBox,
	GameIdCode,
	Header,
	Title,
	WaitingDescription,
	WaitingIcon,
	WaitingState,
} from './View.style'

interface ViewProps {
	game: GameState
	userId: string
	onMakeMove: (cellIndex: number) => void
	onLeaveGame: () => void
	error: string | null
}

const View: FC<ViewProps> = ({ game, userId, onMakeMove, onLeaveGame, error }) => {
	const [mySymbol, setMySymbol] = useState<Player | null>(null)

	useEffect(() => {
		switch (true) {
			case game.players.X === userId:
				setMySymbol('X')
				break
			case game.players.O === userId:
				setMySymbol('O')
				break
			default:
				setMySymbol(null)
				break
		}
	}, [game.players, userId])

	const isMyTurn = game.status === 'playing' && game.currentPlayer === mySymbol
	const isWaiting = game.status === 'waiting'
	const isFinished = game.status === 'finished'

	const getWinningLine = (): number[] => {
		if (game.result && game.result.type === 'win') {
			return game.result.winningLine
		}
		return []
	}

	return (
		<GameContainer>
			<Header>
				<Title>Tic Tac Toe Room</Title>
				<Button variant="danger" size="sm" onClick={onLeaveGame}>
					Leave Game
				</Button>
			</Header>

			{isWaiting ? (
				<WaitingState>
					<WaitingIcon>⏳</WaitingIcon>
					<Title>Waiting for an opponent...</Title>
					<WaitingDescription>
						Share this game with a friend to start playing!
					</WaitingDescription>
					<GameIdBox>
						<GameIdCode>Game ID: {game.id}</GameIdCode>
					</GameIdBox>
				</WaitingState>
			) : (
				<>
					<GameInfo
						currentPlayer={game.currentPlayer}
						mySymbol={mySymbol}
						result={game.result}
					/>
					<Board
						board={game.board}
						onCellClick={onMakeMove}
						isMyTurn={isMyTurn}
						winningLine={getWinningLine()}
					/>

					{error && <ErrorMessage>{error}</ErrorMessage>}
					{isFinished && (
						<FinishedActions>
							<Button variant="primary" onClick={onLeaveGame}>
								Exit Game
							</Button>
						</FinishedActions>
					)}
				</>
			)}
		</GameContainer>
	)
}

export default View
