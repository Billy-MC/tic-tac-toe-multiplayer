export type Player = 'X' | 'O'
export type CellValue = Player | null | ''
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
	creatorName?: string
	creatorId?: string
	// Player presence tracking
	playerPresence?: {
		X: {
			online: boolean
			lastSeen: number
		}
		O: {
			online: boolean
			lastSeen: number
		} | null
	}
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
	creatorId: string
}

export type PlayerStatus = 'online' | 'offline' | 'unknown'

export type OpponentStatus = 'online' | 'offline' | 'unknown'

export interface PlayerPresence {
	online: boolean
	lastSeen: number
}

export interface GamePresence {
	X: PlayerPresence
	O: PlayerPresence | null
}
