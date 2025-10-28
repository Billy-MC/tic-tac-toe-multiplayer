import type { FC } from 'react'
import { StatusContainer, StatusDot, StatusText } from './OpponentStatus.style'

interface OpponentStatusProps {
	status: 'online' | 'offline' | 'unknown'
	opponentName?: string
}

const OpponentStatus: FC<OpponentStatusProps> = ({ status, opponentName }) => {
	return (
		<StatusContainer>
			<StatusDot $status={status} />
			<StatusText>
				{opponentName}
				{status === 'offline' && ' (disconnected)'}
			</StatusText>
		</StatusContainer>
	)
}

export default OpponentStatus
