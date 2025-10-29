import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut as firebaseSignOut,
	updateProfile,
	onAuthStateChanged as firebaseOnAuthStateChanged,
	User as FirebaseUser,
} from 'firebase/auth'

import { auth } from '@/infrastructure/firebase'
import type { IAuthService } from '@/interfaces/IAuthService'
import type { User } from '@/types/ticTacToe'
import { Unsubscribe } from 'firebase/database'

// Helper for map Firebase's user object to our domain User type
const mapFirebaseUserToUser = (firebaseUser: FirebaseUser): User => {
	return {
		id: firebaseUser.uid,
		email: firebaseUser.email || '',
		displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Anonymous',
	}
}

/**
 * Handles authentication logic:
 * sign in, sign up, sign out, and auth state listeners.
 */
class FirebaseAuthService implements IAuthService {
	// Sign in existing user
	async signIn(email: string, password: string): Promise<User> {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password)
			return mapFirebaseUserToUser(userCredential.user)
		} catch (_error: unknown) {
			throw new Error('Failed to sign in. Please check your credentials and try again.')
		}
	}
	// Register new user account and set display name
	async signUp(email: string, password: string, displayName: string): Promise<User> {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password)
			// update the display name
			await updateProfile(userCredential.user, { displayName })

			return mapFirebaseUserToUser(userCredential.user)
		} catch (_error: unknown) {
			throw new Error('Failed to create account. Please try again later.')
		}
	}

	// Sign the current user out
	async signOut(): Promise<void> {
		try {
			await firebaseSignOut(auth)
		} catch (_error: unknown) {
			throw new Error('Failed to sign out. Please try again later.')
		}
	}

	// Get current user synchronously (may be null if not logged in)
	getCurrentUser(): User | null {
		const firebaseUser = auth.currentUser
		return firebaseUser ? mapFirebaseUserToUser(firebaseUser) : null
	}

	// Subscribe to auth state changes (login/logout). Returns unsubscribe fn
	onAuthStateChanged(callback: (user: User | null) => void): Unsubscribe {
		// Listen for auth state changes
		const unsubscribe = firebaseOnAuthStateChanged(auth, firebaseUser => {
			callback(firebaseUser ? mapFirebaseUserToUser(firebaseUser) : null)
		})
		return unsubscribe
	}
}

const authService = new FirebaseAuthService()

export { FirebaseAuthService, authService }
