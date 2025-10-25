import type { FC } from 'react'

import { InfoContainer, StatusMessage, PlayerInfo, PlayerSymbol } from './Info.style'
import type { Player, GameResult } from '@/types/ticTacToe'

interface InfoProps {
	currentPlayer: Player
	mySymbol: Player | null
	result?: GameResult
}

type StatusKey = 'win:me' | 'win:opponent' | 'draw' | 'turn:me' | 'turn:opponent'
type StatusVariant = 'win' | 'lose' | 'draw' | 'yourTurn' | 'waiting'

const MESSAGES: Record<StatusKey, string> = {
	'win:me': 'You won!',
	'win:opponent': 'You lost!',
	draw: "It's a draw!",
	'turn:me': 'Your turn!',
	'turn:opponent': 'Waiting for opponent...',
}

const VARIANT_MAP: Record<StatusKey, StatusVariant> = {
	'win:me': 'win',
	'win:opponent': 'lose',
	draw: 'draw',
	'turn:me': 'yourTurn',
	'turn:opponent': 'waiting',
}

const computeStatusKey = (
	currentPlayer: Player,
	mySymbol: Player | null,
	result?: GameResult
): StatusKey => {
	if (result?.type === 'win') {
		return mySymbol === result.winner ? 'win:me' : 'win:opponent'
	}
	if (result?.type === 'draw') return 'draw'

	if (mySymbol === null) return 'turn:opponent'

	return mySymbol === currentPlayer ? 'turn:me' : 'turn:opponent'
}

const Info: FC<InfoProps> = ({ currentPlayer, mySymbol, result }) => {
	const statusKey = computeStatusKey(currentPlayer, mySymbol, result)

	const message = MESSAGES[statusKey]
	const variant = VARIANT_MAP[statusKey]

	return (
		<InfoContainer>
			<StatusMessage $variant={variant}>{message}</StatusMessage>
			{mySymbol && !result && (
				<PlayerInfo>
					You are playing as <PlayerSymbol $symbol={mySymbol}>{mySymbol}</PlayerSymbol>
				</PlayerInfo>
			)}
		</InfoContainer>
	)
}

export default Info
