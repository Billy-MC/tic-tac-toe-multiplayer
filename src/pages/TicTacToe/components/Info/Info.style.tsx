import styled, { css } from 'styled-components'
import { Player } from '@/types/ticTacToe'
import { baseTitleStyle } from '@/components/SharedStyle/SharedStyle.style'

type StatusVariant = 'win' | 'lose' | 'draw' | 'yourTurn' | 'waiting'

const InfoContainer = styled.div`
	margin-bottom: 1.5rem;
`

const StatusMessage = styled.div<{ $variant: StatusVariant }>`
	padding: 1rem 1.5rem;
	border-radius: ${props => props.theme.borderRadius.lg};
	text-align: center;
	font-weight: ${props => props.theme.fontWeight.bold};
	font-size: ${props => props.theme.fontSize.xl};
	transition: all ${props => props.theme.transitions.slow};

	${props =>
		props.$variant === 'win' &&
		css`
			color: ${props => props.theme.colors.green};
			background-color: ${props => props.theme.colors.successLight};
		`}

	${props =>
		props.$variant === 'lose' &&
		css`
			color: ${props => props.theme.colors.red};
			background-color: ${props => props.theme.colors.dangerLight};
		`}

	${props =>
		props.$variant === 'draw' &&
		css`
			color: ${props => props.theme.colors.yellow};
			background-color: ${props => props.theme.colors.warningLight};
		`}

	${props =>
		props.$variant === 'yourTurn' &&
		css`
			color: ${props => props.theme.colors.blue};
			background-color: ${props => props.theme.colors.primaryLight};
		`}

	${props =>
		props.$variant === 'waiting' &&
		css`
			color: ${props => props.theme.colors.textSecondary};
			background-color: ${props => props.theme.colors.bgSecondary};
		`}
`

const PlayerInfo = styled.div`
	margin-top: 0.75rem;
	text-align: center;
	color: ${props => props.theme.colors.textSecondary};
`

const PlayerSymbol = styled.span<{ $symbol: Player }>`
	${baseTitleStyle};
	color: ${({ $symbol, theme }) =>
		$symbol === 'X' ? theme.colors.playerX : theme.colors.playerO};
`

export { InfoContainer, StatusMessage, PlayerInfo, PlayerSymbol }
