import type { User } from '@/types/ticTacToe'

export interface IAuthService {
	signIn(email: string, password: string): Promise<User>
	signUp(email: string, password: string, displayName: string): Promise<User>
	signOut(): Promise<void>
	getCurrentUser(): User | null
	onAuthStateChanged(callback: (user: User | null) => void): () => void
}
