import styled, { css } from 'styled-components'
import { pulseSlow } from '../SharedStyle/SharedStyle.style'

const StyledCell = styled.button<{
	$isDisabled: boolean
	$hasValue: boolean
	$isWinningCell: boolean
}>`
	aspect-ratio: 1;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${props => props.theme.colors.bgPrimary};
	border: 4px solid
		${props => (props.$isWinningCell ? props.theme.colors.yellow : props.theme.colors.border)};
	border-radius: ${props => props.theme.borderRadius.xl};
	transition: all ${props => props.theme.transitions.normal};
	cursor: ${props => (props.$isDisabled || props.$hasValue ? 'default' : 'pointer')};
	opacity: ${props => (props.$isDisabled ? 0.6 : 1)};

	${props =>
		!props.$isDisabled &&
		!props.$hasValue &&
		css`
			&:hover {
				background-color: ${props => props.theme.colors.bgSecondary};
				border-color: ${props => props.theme.colors.primary};
			}
		`}

	${props =>
		props.$isWinningCell &&
		css`
			background-color: ${props => props.theme.colors.warningLight};
			animation: ${pulseSlow} 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
		`}

	${props =>
		props.$isDisabled &&
		css`
			cursor: not-allowed;
		`}
`

const CellContent = styled.span<{ $player: 'X' | 'O' }>`
	font-size: ${props => props.theme.fontSize['6xl']};
	font-weight: ${props => props.theme.fontWeight.bold};
	color: ${props =>
		props.$player === 'X' ? props.theme.colors.playerX : props.theme.colors.playerO};
`

export { CellContent, StyledCell }
