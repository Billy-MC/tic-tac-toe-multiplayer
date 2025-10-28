import type { FC } from 'react'

import { useEffect } from 'react'
import Lobby from '@/pages/TicTacToe/components/Lobby'
import View from '@/pages/TicTacToe/components/View'
import Button from '@/components/Button'
import { ErrorBoundary, FirebaseErrorBoundary } from '@/components/ErrorBoundary'
import useGameStore from '@/stores/gameStore'
import AuthForm from '@/components/AuthForm'
import useAuthStore from '@/stores/authStore'
import { logger } from '@/utils/logger'
import {
	AppContainer,
	AuthContainer,
	Container,
	Header,
	LoadingContainer,
	LoadingContent,
	LoadingText,
	Main,
	Subtitle,
	Title,
} from './TicTacToePage.style'
import { Spinner } from '@/components/Button/Button.style'

// Main TicTacToePage component
const TicTacToePage: FC = () => {
	const {
		user,
		isLoading: authLoading,
		error: authError,
		signIn,
		signUp,
		signOut,
		initializeApp,
		clearError: clearAuthError,
	} = useAuthStore()

	const {
		currentGameId,
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

	// Initialize authentication state
	useEffect(() => {
		initializeApp()
	}, [initializeApp])

	// Subscribe to current game updates
	useEffect(() => {
		if (!currentGameId) return

		const unsubscribe = subscribeToGame(currentGameId)

		// Cleanup on unmount or game change
		return () => {
			unsubscribe()
			clearGame()
		}
	}, [currentGameId, subscribeToGame, clearGame])

	// Subscribe to available games when not in a game and user is logged in
	useEffect(() => {
		if (user && !currentGameId) {
			const unsubscribe = subscribeToAvailableGames()

			return () => {
				unsubscribe()
			}
		}
	}, [currentGameId, user, subscribeToAvailableGames])

	// Clear errors when game or auth state changes
	useEffect(() => {
		clearGameError()
		clearAuthError()
	}, [currentGame, clearGameError, clearAuthError])

	const handleCreateGame = async () => {
		if (!user) return
		try {
			await createGame(user.id, user.displayName)
		} catch (error) {
			logger.error('Failed to create game:', error)
		}
	}

	const handleJoinGame = async (gameId: string) => {
		if (!user) return

		try {
			await joinGame(gameId, user.id)
		} catch (error) {
			logger.error('Failed to join game:', error)
		}
	}

	const handleMakeMove = async (cellIndex: number) => {
		if (!user || !currentGameId) return
		try {
			await makeMove(currentGameId, cellIndex, user.id)
		} catch (error) {
			logger.error('Failed to make move:', error)
		}
	}

	const handleLeaveGame = async () => {
		if (!user || !currentGameId) return
		try {
			await leaveGame(currentGameId, user.id)
		} catch (error) {
			logger.error('Failed to leave game:', error)
		}
	}

	const handleSignOut = async () => {
		try {
			if (currentGameId && user) {
				await leaveGame(currentGameId, user.id)
			}
			await signOut()
		} catch (error: unknown) {
			logger.error('Failed to sign out:', error instanceof Error ? error.message : error)
		}
	}

	// Loading state
	if (authLoading) {
		return (
			<LoadingContainer>
				<LoadingContent>
					<Spinner />
					<LoadingText>{authError ? `Error: ${authError}` : 'Loading...'}</LoadingText>
				</LoadingContent>
			</LoadingContainer>
		)
	}

	// If not authenticated, show auth form
	if (!user) {
		return (
			<ErrorBoundary>
				<AuthContainer>
					<FirebaseErrorBoundary onRetry={() => window.location.reload()}>
						<AuthForm onSignIn={signIn} onSignUp={signUp} error={authError} />
					</FirebaseErrorBoundary>
				</AuthContainer>
			</ErrorBoundary>
		)
	}

	return (
		<ErrorBoundary>
			<AppContainer>
				<Container>
					{/* Header */}
					<Header>
						<div>
							<Title>Tic Tac Toe Multiplayer</Title>
							<Subtitle>Welcome, {user.displayName}</Subtitle>{' '}
						</div>
						<Button onClick={handleSignOut} variant="secondary">
							Sign Out
						</Button>
					</Header>
					{/* Main Content */}
					<Main>
						<FirebaseErrorBoundary onRetry={() => window.location.reload()}>
							{currentGame ? (
								<View
									game={currentGame}
									userId={user.id}
									onMakeMove={handleMakeMove}
									onLeaveGame={handleLeaveGame}
									error={gameError}
								/>
							) : (
								<Lobby
									games={availableGames.filter(
										game => game.creatorId !== user.id
									)}
									onJoinGame={handleJoinGame}
									onCreateGame={handleCreateGame}
									isLoading={gameLoading}
									userName={user.displayName}
								/>
							)}
						</FirebaseErrorBoundary>
					</Main>
				</Container>
			</AppContainer>
		</ErrorBoundary>
	)
}

export default TicTacToePage
