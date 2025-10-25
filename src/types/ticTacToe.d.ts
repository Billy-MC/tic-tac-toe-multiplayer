export type Player = 'X' | 'O'
export type CellValue = Player | null
export type Board = CellValue[]

export type GameStatus =
	| 'waiting' // Waiting for second player
	| 'playing' // Game in progress
	| 'finished' // Game ended

export type GameResult =
	| { type: 'win'; winner: Player; winningLine: number[] }
	| { type: 'draw' }
	| { type: 'ongoing' }

export interface GameState {
	id: string
	board: Board
	currentPlayer: Player
	status: GameStatus
	players: {
		X: string | null // User ID
		O: string | null // User ID
	}
	createdAt: number
	updatedAt: number
	result?: GameResult
}

type RTDBServerTimestamp = ReturnType<typeof serverTimestamp>
type GameWrite = Omit<GameState, 'createdAt' | 'updatedAt'> & {
	createdAt: number | RTDBServerTimestamp
	updatedAt: number | RTDBServerTimestamp
}
type GameUpdate = Partial<GameWrite>

export interface User {
	id: string
	email: string
	displayName: string
}

export interface GameListItem {
	id: string
	status: GameStatus
	creatorName: string
	createdAt: number
}
