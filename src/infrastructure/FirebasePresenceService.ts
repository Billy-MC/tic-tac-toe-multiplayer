import {
	ref,
	set,
	onValue,
	onDisconnect,
	serverTimestamp,
	type DatabaseReference,
	type DataSnapshot,
	type Unsubscribe,
	child,
} from 'firebase/database'
import { database } from '@/infrastructure/firebase'
import type { GamePresence, Player } from '@/types/ticTacToe'
import { logger } from '@/utils/logger'

class FirebasePresenceService {
	private readonly gamesRef: DatabaseReference

	constructor() {
		this.gamesRef = ref(database, 'games')
	}

	private presenceRef(gameId: string, player?: Player) {
		return player
			? child(this.gamesRef, `${gameId}/playerPresence/${player}`)
			: child(this.gamesRef, `${gameId}/playerPresence`)
	}

	// Mark player as online
	async setPlayerOnline(gameId: string, player: Player): Promise<void> {
		const presenceRef = ref(database, `games/${gameId}/playerPresence/${player}`)

		await set(presenceRef, {
			online: true,
			lastSeen: serverTimestamp(),
		})
	}

	// Mark player as offline
	async setPlayerOffline(gameId: string, player: Player): Promise<void> {
		const presenceRef = ref(database, `games/${gameId}/playerPresence/${player}`)

		await set(presenceRef, {
			online: false,
			lastSeen: serverTimestamp(),
		})
	}

	// Setup automatic disconnect handler
	setupDisconnectHandler(gameId: string, player: Player): void {
		const refForPlayer = this.presenceRef(gameId, player)

		// Set up onDisconnect callback (runs server-side automatically)
		onDisconnect(refForPlayer).set({
			online: false,
			lastSeen: serverTimestamp(),
		})

		// Also set online now
		set(refForPlayer, {
			online: true,
			lastSeen: serverTimestamp(),
		}).catch(error => {
			logger.error('Failed to set player online:', error)
		})
	}

	// Listen to presence changes for a specific game
	listenToPresence(
		gameId: string,
		callback: (presence: GamePresence | null) => void
	): Unsubscribe {
		const presenceRef = ref(database, `games/${gameId}/playerPresence`)

		const unsubscribe = onValue(
			presenceRef,
			(snapshot: DataSnapshot) => {
				if (snapshot.exists()) {
					callback(snapshot.val() as GamePresence)
				} else {
					callback(null)
					logger.warn(`Presence data for game ${gameId} does not exist.`)
				}
			},
			error => {
				logger.error('Error listening to presence:', error)
				callback(null)
			}
		)

		return unsubscribe
	}

	/**
	 * Check if player is online (with grace period)
	 * @param lastSeen - timestamp of last seen
	 * @param gracePeriod - grace period in milliseconds (default: 10 seconds)
	 */
	isPlayerOnline(lastSeen: number, gracePeriod: number = 10000): boolean {
		const now = Date.now()
		const timeSinceLastSeen = now - lastSeen

		// Consider online if seen within grace period
		return timeSinceLastSeen < gracePeriod
	}

	// Clean up presence when player leaves
	async cleanupPresence(gameId: string, player: Player): Promise<void> {
		try {
			await this.setPlayerOffline(gameId, player)
			logger.info(`Cleaned up presence for player ${player} in game ${gameId}`)
		} catch (error) {
			logger.error('Failed to cleanup presence:', error)
		}
	}
}

const presenceService = new FirebasePresenceService()

export { FirebasePresenceService, presenceService }
