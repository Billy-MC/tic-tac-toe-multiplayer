import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types/ticTacToe'
import { authService } from '@/infrastructure/FirebaseAuthService'
import { Unsubscribe } from 'firebase/database'

interface AuthState {
	user: User | null
	isLoading: boolean
	error: string | null
	signIn: (email: string, password: string) => Promise<void>
	signUp: (email: string, password: string, displayName: string) => Promise<void>
	signOut: () => Promise<void>
	clearError: () => void
	initializeApp: Unsubscribe
}

const useAuthStore = create<AuthState>()(
	persist(
		(set, __get) => ({
			user: null,
			isLoading: false,
			error: null,

			signIn: async (email: string, password: string) => {
				try {
					set({ isLoading: true, error: null })
					await authService.signIn(email, password)
					// User will be set by onAuthStateChanged in initializeApp
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
					// User will be set by onAuthStateChanged in initializeApp
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
		}),
		{
			name: 'auth-storage',
			// Persist user data
			partialize: state => ({
				user: state.user,
			}),
		}
	)
)

export default useAuthStore
