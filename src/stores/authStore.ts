import { create } from 'zustand'
import type { User } from '@/types/ticTacToe'
import { authService } from '@/infrastructure/FirebaseAuthService'

interface AuthState {
	user: User | null
	isLoading: boolean
	error: string | null
	signIn: (email: string, password: string) => Promise<void>
	signUp: (email: string, password: string, displayName: string) => Promise<void>
	signOut: () => Promise<void>
	clearError: () => void
	initializeApp: () => void
}

const useAuthStore = create<AuthState>((set, __get) => ({
	user: null,
	isLoading: false,
	error: null,

	signIn: async (email: string, password: string) => {
		try {
			set({ isLoading: true, error: null })
			await authService.signIn(email, password)
		} catch (error: unknown) {
			set({
				error:
					error instanceof Error
						? error.message
						: 'An unknown error occurred during sign in.',
				isLoading: false,
			})
		}
	},

	signUp: async (email: string, password: string, displayName: string) => {
		try {
			set({ isLoading: true, error: null })
			await authService.signUp(email, password, displayName)
		} catch (error: unknown) {
			set({
				error:
					error instanceof Error
						? error.message
						: 'An unknown error occurred during sign up.',
				isLoading: false,
			})
		}
	},

	signOut: async () => {
		try {
			set({ isLoading: true, error: null })
			await authService.signOut()
			set({ user: null, isLoading: false })
		} catch (error: unknown) {
			set({
				error:
					error instanceof Error
						? error.message
						: 'An unknown error occurred during sign out.',
				isLoading: false,
			})
		}
	},

	clearError: () => set({ error: null }),

	initializeApp: () => {
		const unsubscribe = authService.onAuthStateChanged(user => {
			set({ user, isLoading: false })
		})

		return unsubscribe
	},
}))

export default useAuthStore
