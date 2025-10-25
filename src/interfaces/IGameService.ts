import type { GameListItem, GameState } from '@/types/ticTacToe'

export interface IGameService {
	createGame(userId: string, userName: string): Promise<string>
	joinGame(gameId: string, userId: string): Promise<void>
	makeMove(gameId: string, cellIndex: number, userId: string): Promise<void>
	listenToGame(gameId: string, callback: (game: GameState | null) => void): () => void
	listenToAvailableGames(callback: (games: GameListItem[]) => void): () => void
	leaveGame(gameId: string, userId: string): Promise<void>
}
