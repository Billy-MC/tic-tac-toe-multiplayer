import { GamePresence, OpponentStatus } from '@/types/ticTacToe'
import { create } from 'zustand'

export interface PresenceStore {
	presence: GamePresence | null
	opponentStatus: OpponentStatus

	setPresence: (presence: GamePresence | null) => void
	updateOpponentStatus: (mySymbol: 'X' | 'O') => void
	clearPresence: () => void
}

const usePresenceStore = create<PresenceStore>((set, get) => ({
	presence: null,
	opponentStatus: 'unknown',

	setPresence: presence => {
		set({ presence })
	},

	updateOpponentStatus: mySymbol => {
		const { presence } = get()

		if (!presence) {
			set({ opponentStatus: 'unknown' })
			return
		}

		const opponentSymbol = mySymbol === 'X' ? 'O' : 'X'
		const opponentPresence = presence[opponentSymbol]

		if (!opponentPresence) {
			set({ opponentStatus: 'unknown' })
			return
		}

		// Check if last seen is recent (within 10 seconds)
		const now = Date.now()
		const timeSinceLastSeen = now - opponentPresence.lastSeen
		const isOnline = opponentPresence.online && timeSinceLastSeen < 10000

		set({ opponentStatus: isOnline ? 'online' : 'offline' })
	},

	clearPresence: () => {
		set({ presence: null, opponentStatus: 'unknown' })
	},
}))

export default usePresenceStore
