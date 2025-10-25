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

// Converts Firebase User to User type
const mapFirebaseUserToUser = (firebaseUser: FirebaseUser): User => {
	return {
		id: firebaseUser.uid,
		email: firebaseUser.email || '',
		displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Anonymous',
	}
}

class FirebaseAuthService implements IAuthService {
	async signIn(email: string, password: string): Promise<User> {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password)
			return mapFirebaseUserToUser(userCredential.user)
		} catch (_error: unknown) {
			throw new Error('Failed to sign in. Please check your credentials and try again.')
		}
	}
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

	async signOut(): Promise<void> {
		try {
			await firebaseSignOut(auth)
		} catch (_error: unknown) {
			throw new Error('Failed to sign out. Please try again later.')
		}
	}

	getCurrentUser(): User | null {
		const firebaseUser = auth.currentUser
		return firebaseUser ? mapFirebaseUserToUser(firebaseUser) : null
	}

	onAuthStateChanged(callback: (user: User | null) => void): () => void {
		const unsubscribe = firebaseOnAuthStateChanged(auth, firebaseUser => {
			callback(firebaseUser ? mapFirebaseUserToUser(firebaseUser) : null)
		})
		return unsubscribe
	}
}

const authService = new FirebaseAuthService()

export { FirebaseAuthService, authService }
