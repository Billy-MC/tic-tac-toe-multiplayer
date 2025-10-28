import { useEffect, useState, type FC } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import { GameState, Player } from '@/types/ticTacToe'
import Board from '@/pages/TicTacToe/components/Board'
import Info from '@/pages/TicTacToe/components/Info'
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
	WaitingState,
} from './View.style'
import usePresenceStore from '@/stores/presenceStore'
import { useShallow } from 'zustand/shallow'
import { presenceService } from '@/infrastructure/FirebasePresenceService'
import OpponentStatus from '../OpponentStatus'

interface ViewProps {
	game: GameState
	userId: string
	onMakeMove: (cellIndex: number) => void
	onLeaveGame: () => void
	error: string | null
}

const View: FC<ViewProps> = ({ game, userId, onMakeMove, onLeaveGame, error }) => {
	const [mySymbol, setMySymbol] = useState<Player | null>(null)

	const { opponentStatus, setPresence, updateOpponentStatus, clearPresence } = usePresenceStore(
		useShallow(state => ({
			opponentStatus: state.opponentStatus,
			setPresence: state.setPresence,
			updateOpponentStatus: state.updateOpponentStatus,
			clearPresence: state.clearPresence,
		}))
	)

	const [prevStatus, setPrevStatus] = useState<'online' | 'offline' | 'unknown'>('unknown')

	const gameId = game.id
	const playersX = game.players.X
	const playersO = game.players.O

	useEffect(() => {
		if (playersX === userId) {
			setMySymbol('X')
		} else if (playersO === userId) {
			setMySymbol('O')
		} else {
			setMySymbol(null)
		}
	}, [playersX, playersO, userId])

	useEffect(() => {
		if (!gameId || !mySymbol) return

		presenceService.setupDisconnectHandler(gameId, mySymbol)

		// Cleanup when leaving
		return () => {
			presenceService.cleanupPresence(gameId, mySymbol)
		}
	}, [gameId, mySymbol])

	useEffect(() => {
		if (!gameId) return

		const unsubscribe = presenceService.listenToPresence(gameId, presence => {
			setPresence(presence)

			if (mySymbol) {
				updateOpponentStatus(mySymbol)
			}
		})

		return () => {
			unsubscribe()
			clearPresence()
		}
	}, [gameId, setPresence, updateOpponentStatus, clearPresence, mySymbol])

	useEffect(() => {
		// Skip initial render
		if (prevStatus === 'unknown' && opponentStatus !== 'unknown') {
			setPrevStatus(opponentStatus)
			return
		}

		// Show notification on disconnect
		if (prevStatus === 'online' && opponentStatus === 'offline') {
			toast.error('Opponent disconnected', {
				duration: 3000,
			})
		}

		// Show notification on reconnect
		if (prevStatus === 'offline' && opponentStatus === 'online') {
			toast.success('Opponent reconnected', {
				duration: 3000,
			})
		}

		setPrevStatus(opponentStatus)
	}, [opponentStatus, prevStatus])

	const isMyTurn = game.status === 'playing' && game.currentPlayer === mySymbol
	const isWaiting = game.status === 'waiting'
	const isFinished = game.status === 'finished'

	const getWinningLine = (): number[] => {
		if (game.result && game.result.type === 'win') {
			return game.result.winningLine
		}
		return []
	}

	const opponentName = mySymbol === 'X' ? 'Opponent' : game.creatorName

	return (
		<GameContainer>
			<Toaster position="top-center" />
			<Header>
				<Title>Tic Tac Toe Room</Title>
				<Button variant="danger" size="sm" onClick={onLeaveGame}>
					Leave Game
				</Button>
			</Header>

			{isWaiting ? (
				<WaitingState>
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
					{game.players.O && (
						<OpponentStatus status={opponentStatus} opponentName={opponentName} />
					)}
					<Info
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
