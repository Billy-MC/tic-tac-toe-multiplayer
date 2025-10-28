import type { GameState, GameListItem } from '@/types/ticTacToe'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { gameService } from '@/infrastructure/FirebaseGameService'

interface GameStore {
	currentGame: GameState | null
	currentGameId: string | null
	availableGames: GameListItem[]
	isLoading: boolean
	error: string | null

	setCurrentGameId: (gameId: string | null) => void
	createGame: (userId: string, userName: string) => Promise<string>
	joinGame: (gameId: string, userId: string) => Promise<void>
	makeMove: (gameId: string, cellIndex: number, userId: string) => Promise<void>
	leaveGame: (gameId: string, userId: string) => Promise<void>
	subscribeToGame: (gameId: string) => () => void
	subscribeToAvailableGames: () => () => void
	clearGame: () => void
	clearError: () => void
}

const useGameStore = create<GameStore>()(
	persist(
		(set, __get) => ({
			currentGame: null,
			currentGameId: null,
			availableGames: [],
			isLoading: false,
			error: null,

			setCurrentGameId: (gameId: string | null) => {
				set({ currentGameId: gameId })
			},

			createGame: async (userId: string, userName: string) => {
				try {
					set({ isLoading: true, error: null })
					const gameId = await gameService.createGame(userId, userName)
					set({
						currentGameId: gameId,
						isLoading: false,
					})
					return gameId
				} catch (error: unknown) {
					const errorMessage =
						error instanceof Error ? error.message : 'Failed to create game'

					set({ error: errorMessage, isLoading: false })

					throw new Error(errorMessage)
				}
			},

			joinGame: async (gameId: string, userId: string) => {
				try {
					set({ isLoading: true, error: null })
					await gameService.joinGame(gameId, userId)
					set({ currentGameId: gameId, isLoading: false })
				} catch (error) {
					const errorMessage =
						error instanceof Error ? error.message : 'Failed to join game'

					set({ error: errorMessage, isLoading: false })

					throw new Error(errorMessage)
				}
			},

			makeMove: async (gameId: string, cellIndex: number, userId: string) => {
				try {
					set({ error: null })
					await gameService.makeMove(gameId, cellIndex, userId)
				} catch (error) {
					const errorMessage =
						error instanceof Error ? error.message : 'Failed to make move'
					set({ error: errorMessage, isLoading: false })
					throw new Error(errorMessage)
				}
			},

			leaveGame: async (gameId: string, userId: string) => {
				try {
					await gameService.leaveGame(gameId, userId)
					set({ currentGame: null, currentGameId: null })
				} catch (error) {
					const errorMessage =
						error instanceof Error ? error.message : 'Failed to leave game'
					set({ error: errorMessage, isLoading: false })
					throw new Error(errorMessage)
				}
			},

			subscribeToGame: (gameId: string) => {
				const unsubscribe = gameService.listenToGame(gameId, game => {
					if (game) {
						set({ currentGame: game })
					} else {
						// Game was deleted
						set({
							currentGame: null,
							currentGameId: null,
						})
					}
				})
				return unsubscribe
			},

			subscribeToAvailableGames: () => {
				const unsubscribe = gameService.listenToAvailableGames(games => {
					set({ availableGames: games })
				})
				return unsubscribe
			},

			clearGame: () => set({ currentGame: null, error: null }),

			clearError: () => set({ error: null }),
		}),
		{
			name: 'game-storage',
			partialize: state => ({
				currentGameId: state.currentGameId,
			}),
		}
	)
)

export default useGameStore
