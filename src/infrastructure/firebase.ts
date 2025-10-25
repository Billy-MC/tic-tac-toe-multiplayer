import { FirebaseApp, initializeApp, type FirebaseOptions } from 'firebase/app'
import { Auth, getAuth } from 'firebase/auth'
import { Database, getDatabase } from 'firebase/database'
import { ENV } from '@/env'

// Firebase configuration
const firebaseConfig: FirebaseOptions = {
	apiKey: ENV.VITE_FIREBASE_API_KEY,
	authDomain: ENV.VITE_FIREBASE_AUTH_DOMAIN,
	databaseURL: ENV.VITE_FIREBASE_DATABASE_URL || undefined,
	projectId: ENV.VITE_FIREBASE_PROJECT_ID,
	storageBucket:
		ENV.VITE_FIREBASE_STORAGE_BUCKET ?? `${ENV.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
	messagingSenderId: ENV.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: ENV.VITE_FIREBASE_APP_ID,
	measurementId: ENV.VITE_MEASUREMENT_ID,
}

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig)

// Initialize services
export const auth: Auth = getAuth(app)
export const database: Database = getDatabase(app)

export default app
