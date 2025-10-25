import type { FC } from 'react'

import { useState, useEffect } from 'react'
import Lobby from '@/pages/TicTacToe/components/Lobby'
import View from '@/pages/TicTacToe/components/View'
import Button from '@/components/Button'
import ErrorBoundary from '@/components/ErrorBoundary'
import useGameStore from '@/stores/gameStore'
import { logger } from '@/utils/logger'
import { AppContainer, Container, Header, Main, Subtitle, Title } from './TicTacToePage.style'

const TicTacToePage: FC = () => {
	const [currentGameId, setCurrentGameId] = useState<string | null>(null)

	const {
		currentGame,
		availableGames,
		isLoading: gameLoading,
		error: gameError,
		createGame,
		joinGame,
		makeMove,
		leaveGame,
		subscribeToGame,
		subscribeToAvailableGames,
		clearGame,
		clearError: clearGameError,
	} = useGameStore()

	useEffect(() => {
		if (!currentGameId) {
			const unsubscribe = subscribeToAvailableGames()
			return () => unsubscribe()
		}
	}, [currentGameId, subscribeToAvailableGames])

	useEffect(() => {
		if (currentGameId) {
			const unsubscribe = subscribeToGame(currentGameId)
			return () => {
				unsubscribe()
				clearGame()
			}
		}
	}, [currentGameId, subscribeToGame, clearGame])

	useEffect(() => {
		clearGameError()
	}, [currentGame, clearGameError])

	const handleCreateGame = async () => {
		try {
			const gameId = await createGame('user_1', 'Player 1') // TODO: Replace with actual user ID and name
			setCurrentGameId(gameId)
		} catch (error) {
			logger.error('Failed to create game:', error)
		}
	}

	const handleJoinGame = async (gameId: string) => {
		try {
			await joinGame(gameId, 'user_2') // TODO: Replace with actual user ID
			setCurrentGameId(gameId)
		} catch (error) {
			logger.error('Failed to join game:', error)
		}
	}

	const handleMakeMove = async (cellIndex: number) => {
		if (!currentGameId) return
		try {
			await makeMove(currentGameId, cellIndex, 'user_1') // TODO: Replace with actual user ID
		} catch (error) {
			logger.error('Failed to make move:', error)
		}
	}

	const handleLeaveGame = async () => {
		if (!currentGameId) return
		try {
			await leaveGame(currentGameId, 'user_1') // TODO: Replace with actual user ID
			setCurrentGameId(null)
		} catch (error) {
			logger.error('Failed to leave game:', error)
		}
	}

	return (
		<ErrorBoundary>
			<AppContainer>
				<Container>
					{/* Header */}
					<Header>
						<div>
							<Title>Tic Tac Toe Multiplayer</Title>
							<Subtitle>Welcome, Player 1</Subtitle>{' '}
							{/** TODO: Replace with actual player name */}
						</div>
						<Button onClick={handleCreateGame} variant="secondary">
							Sign Out
						</Button>
					</Header>
					{/* Main Content */}
					<Main>
						{currentGame ? (
							<View
								game={currentGame}
								userId="user_1"
								onMakeMove={handleMakeMove}
								onLeaveGame={handleLeaveGame}
								error={gameError}
							/>
						) : (
							<Lobby
								games={availableGames}
								onJoinGame={handleJoinGame}
								onCreateGame={handleCreateGame}
								isLoading={gameLoading}
								userName="Player 1"
							/>
						)}
					</Main>
				</Container>
			</AppContainer>
		</ErrorBoundary>
	)
}

export default TicTacToePage
