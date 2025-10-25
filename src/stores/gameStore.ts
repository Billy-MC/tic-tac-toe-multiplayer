import type { GameState, GameListItem } from '@/types/ticTacToe'
import { create } from 'zustand'

interface GameStore {
	currentGame: GameState | null
	availableGames: GameListItem[]
	isLoading: boolean
	error: string | null

	createGame: (userId: string, userName: string) => Promise<string>
	joinGame: (gameId: string, userId: string) => Promise<void>
	makeMove: (gameId: string, cellIndex: number, userId: string) => Promise<void>
	leaveGame: (gameId: string, userId: string) => Promise<void>
	subscribeToGame: (gameId: string) => () => void
	subscribeToAvailableGames: () => () => void
	clearGame: () => void
	clearError: () => void
}

const useGameStore = create<GameStore>((set, get) => ({
	currentGame: null,
	availableGames: [],
	isLoading: false,
	error: null,

	createGame: async (userId: string, userName: string) => {
		try {
			set({ isLoading: true, error: null })
			const gameId = '123' // TODO: Fake data first
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000))
			set({
				isLoading: false,
			})
			return gameId
		} catch (error: unknown) {
			const errorMessage = error instanceof Error ? error.message : 'Failed to create game'

			set({ error: errorMessage, isLoading: false })

			throw new Error(errorMessage)
		}
	},

	joinGame: async (gameId: string, userId: string) => {
		try {
			set({ isLoading: true, error: null })
			await new Promise(resolve => setTimeout(resolve, 1000))
			set({
				isLoading: false,
			})
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Failed to join game'

			set({ error: errorMessage, isLoading: false })

			throw new Error(errorMessage)
		}
	},

	makeMove: async (gameId: string, cellIndex: number, userId: string) => {
		try {
			set({ error: null })
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 500))
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Failed to make move'

			set({ error: errorMessage, isLoading: false })

			throw new Error(errorMessage)
		}
	},

	leaveGame: async (gameId: string, userId: string) => {
		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 500))
			set({ currentGame: null })
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Failed to leave game'

			set({ error: errorMessage, isLoading: false })

			throw new Error(errorMessage)
		}
	},

	subscribeToGame: (gameId: string) => {
		const game: GameState = {
			id: 'game_1',
			board: [null, null, null, null, null, null, null, null, null],
			currentPlayer: 'X',
			status: 'waiting',
			players: {
				X: 'user_1',
				O: null,
			},
			createdAt: Date.now() - 5 * 60 * 1000,
			updatedAt: Date.now() - 5 * 60 * 1000,
		}
		return () => {
			set({ currentGame: game })
		}
	},

	subscribeToAvailableGames: () => {
		const games: GameListItem[] = [
			{
				id: 'game_1',
				status: 'waiting',
				creatorName: 'Alice',
				createdAt: Date.now() - 1 * 60 * 1000,
			},
			{
				id: 'game_2',
				status: 'playing',
				creatorName: 'Bob',
				createdAt: Date.now() - 20 * 60 * 1000,
			},
			{
				id: 'game_3',
				status: 'finished',
				creatorName: 'Charlie',
				createdAt: Date.now() - 3 * 60 * 60 * 1000,
			},
			{
				id: 'game_4',
				status: 'waiting',
				creatorName: 'Diana',
				createdAt: Date.now() - 12 * 60 * 60 * 1000,
			},
			{
				id: 'game_5',
				status: 'finished',
				creatorName: 'Ethan',
				createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
			},
		]

		return () => {
			set({ availableGames: games })
		}
	},

	clearGame: () => set({ currentGame: null, error: null }),

	clearError: () => set({ error: null }),
}))

export default useGameStore
