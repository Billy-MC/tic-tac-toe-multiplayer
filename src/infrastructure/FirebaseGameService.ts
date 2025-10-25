import {
	ref,
	set,
	get,
	update,
	onValue,
	query,
	orderByChild,
	equalTo,
	push,
	serverTimestamp,
	DatabaseReference,
	DataSnapshot,
} from 'firebase/database'
import { database } from '@/infrastructure/firebase'
import type { IGameService } from '@/interfaces/IGameService'

import {
	createEmptyBoard,
	evaluateGameStatus,
	getNextPlayer,
	isValidMove,
	makeMove,
} from '@/domain/ticTacToeLogic'
import { GameListItem, GameState, GameUpdate, GameWrite } from '@/types/ticTacToe'
import { logger } from '@/utils/logger'

// Tic Tac Toe Game services
class FirebaseGameService implements IGameService {
	private readonly gamesRef: DatabaseReference

	constructor() {
		this.gamesRef = ref(database, 'games')
	}

	async createGame(userId: string, userName: string): Promise<string> {
		const newGameRef = push(this.gamesRef)
		const gameId = newGameRef.key

		const newGame: GameWrite = {
			id: gameId,
			board: createEmptyBoard(),
			currentPlayer: 'X',
			status: 'waiting',
			players: {
				X: userId,
				O: null,
			},
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		}

		await set(newGameRef, {
			...newGame,
			creatorName: userName,
		})
		return gameId
	}

	async joinGame(gameId: string, userId: string): Promise<void> {
		const gameRef = ref(database, `games/${gameId}`)
		const snapshot: DataSnapshot = await get(gameRef)
		if (!snapshot.exists()) {
			throw new Error('Game not found')
		}

		const game = snapshot.val() as GameState

		if (game.status !== 'waiting') {
			throw new Error('Game is not available to join')
		}

		if (game.players.X === userId) {
			throw new Error('You are already in this game')
		}

		await update(gameRef, {
			'players/O': userId,
			status: 'playing',
		})
	}

	async makeMove(gameId: string, cellIndex: number, userId: string): Promise<void> {
		const gameRef = ref(database, `games/${gameId}`)
		const snapshot: DataSnapshot = await get(gameRef)

		if (!snapshot.exists()) {
			throw new Error('Game not found')
		}

		const game = snapshot.val() as GameState

		if (game.status !== 'playing') {
			throw new Error('Game is not in progress')
		}

		const playerSymbol =
			game.players.X === userId ? 'X' : game.players.O === userId ? 'O' : null

		if (!playerSymbol) {
			throw new Error('You are not a player in this game')
		}

		if (game.currentPlayer !== playerSymbol) {
			throw new Error('It is not your turn, please wait for the other player')
		}

		if (!isValidMove(game.board, cellIndex)) {
			throw new Error('Invalid move, cell is already occupied')
		}

		const newBoard = makeMove(game.board, cellIndex, playerSymbol)
		const gameResult = evaluateGameStatus(newBoard)

		const updates: Partial<GameUpdate> = {
			board: newBoard,
			updatedAt: serverTimestamp(),
		}

		if (gameResult.type !== 'ongoing') {
			updates.status = 'finished'
			updates.result = gameResult
		} else {
			updates.currentPlayer = getNextPlayer(playerSymbol)
		}

		await update(gameRef, updates)
	}

	listenToGame(gameId: string, callback: (game: GameState | null) => void): () => void {
		const gameRef = ref(database, `games/${gameId}`)
		const unsubscribe = onValue(gameRef, snapshot => {
			if (snapshot.exists()) {
				callback(snapshot.val() as GameState)
			} else {
				callback(null)
				logger.error(`Game with ID ${gameId} does not exist.`)
			}
		})
		return unsubscribe
	}

	listenToAvailableGames(callback: (games: GameListItem[]) => void): () => void {
		const waitingGamesQuery = query(this.gamesRef, orderByChild('status'), equalTo('waiting'))

		const unsubscribe = onValue(
			waitingGamesQuery,
			snapshot => {
				const val = snapshot.val() as GameState | null

				const games: GameListItem[] = Object.entries(val ?? {})
					.map(([id, game]) => ({
						id,
						status: game.status,
						creatorName: game.creatorName ?? 'Unknown',
						createdAt: game.createdAt,
					}))
					.sort((a, b) => b.createdAt - a.createdAt)

				callback(games)
			},
			error => {
				logger.error('Error listening to available games:', error)
				callback([])
			}
		)

		return unsubscribe
	}

	async leaveGame(gameId: string, userId: string): Promise<void> {
		const gameRef = ref(database, `games/${gameId}`)
		const snapshot: DataSnapshot = await get(gameRef)

		if (!snapshot.exists()) {
			return
		}

		const game = snapshot.val() as GameState

		if (game.status === 'waiting' && game.players.X === userId) {
			await set(gameRef, null)
			return
		}

		if (game.status === 'playing') {
			const winner = game.players.X === userId ? 'O' : 'X'
			await update(gameRef, {
				status: 'finished',
				result: {
					type: 'win',
					winner,
					winningLine: [],
				},
				updatedAt: serverTimestamp(),
			})
		}
	}
}

const gameService = new FirebaseGameService()

export { FirebaseGameService, gameService }
