import type { GameListItem, GameState, User } from '@/types/ticTacToe'

export interface IAuthService {
	signIn(email: string, password: string): Promise<User>
	signUp(email: string, password: string, displayName: string): Promise<User>
	signOut(): Promise<void>
	getCurrentUser(): User | null
	onAuthStateChanged(callback: (user: User | null) => void): () => void
}

export interface IGameService {
	createGame(userId: string, userName: string): Promise<string>
	joinGame(gameId: string, userId: string): Promise<void>
	makeMove(gameId: string, cellIndex: number, userId: string): Promise<void>
	listenToGame(gameId: string, callback: (game: GameState | null) => void): () => void
	listenToAvailableGames(callback: (games: GameListItem[]) => void): () => void
	leaveGame(gameId: string, userId: string): Promise<void>
}
