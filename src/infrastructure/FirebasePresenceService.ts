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

/**
 * Manages player presence state (online/offline) for each game.
 * Uses Realtime Database and onDisconnect() for auto cleanup.
 */
class FirebasePresenceService {
	private readonly gamesRef: DatabaseReference

	constructor() {
		//  Root reference for all games in DB
		this.gamesRef = ref(database, 'games')
	}

	// Helper to get presence reference for a game (and optional player)
	private presenceRef(gameId: string, player?: Player) {
		return player
			? child(this.gamesRef, `${gameId}/playerPresence/${player}`)
			: child(this.gamesRef, `${gameId}/playerPresence`)
	}

	// Mark player as online
	async setPlayerOnline(gameId: string, player: Player): Promise<void> {
		const presenceRef = this.presenceRef(gameId, player)

		await set(presenceRef, {
			online: true,
			lastSeen: serverTimestamp(),
		})
	}

	// Mark player as offline manually
	async setPlayerOffline(gameId: string, player: Player): Promise<void> {
		const presenceRef = this.presenceRef(gameId, player)

		await set(presenceRef, {
			online: false,
			lastSeen: serverTimestamp(),
		})
	}

	/**
	 * Setup automatic disconnect handler.
	 * This ensures Firebase marks the player as offline
	 * if the client disconnects unexpectedly (e.g. tab closed).
	 */
	setupDisconnectHandler(gameId: string, player: Player): void {
		const refForPlayer = this.presenceRef(gameId, player)

		// Mark offline when connection is lost(runs server-side automatically)
		onDisconnect(refForPlayer).set({
			online: false,
			lastSeen: serverTimestamp(),
		})

		// Immediately mark as online now
		set(refForPlayer, {
			online: true,
			lastSeen: serverTimestamp(),
		}).catch(error => {
			logger.error('Failed to set player online:', error)
		})
	}

	// Listen to presence updates for a game
	listenToPresence(
		gameId: string,
		callback: (presence: GamePresence | null) => void
	): Unsubscribe {
		const presenceRef = this.presenceRef(gameId)

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
	 * Helper to check if player considered "online"
	 * within a configurable grace period (default 10s).
	 * @param lastSeen - timestamp of last seen
	 * @param gracePeriod - grace period in milliseconds (default: 10 seconds)
	 */
	isPlayerOnline(lastSeen: number, gracePeriod: number = 10000): boolean {
		const now = Date.now()
		const timeSinceLastSeen = now - lastSeen

		// Consider online if seen within grace period
		return timeSinceLastSeen < gracePeriod
	}

	// Cleanup function when player leaves or game ends
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
