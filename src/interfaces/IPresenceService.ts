import { GamePresence, Player } from '@/types/ticTacToe'
import { Unsubscribe } from 'firebase/database'

export interface IPresenceService {
	setPlayerOnline(gameId: string, player: Player): Promise<void>
	setPlayerOffline(gameId: string, player: Player): Promise<void>
	setupDisconnectHandler(gameId: string, player: Player): void
	listenToPresence(gameId: string, callback: (presence: GamePresence | null) => void): Unsubscribe
	isPlayerOnline(lastSeen: number, gracePeriod?: number): boolean
	cleanupPresence(gameId: string, player: Player): Promise<void>
}
