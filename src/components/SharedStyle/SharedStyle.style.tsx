import { css, keyframes } from 'styled-components'

const pulseSlow = keyframes`
	0%, 100% {
		opacity: 1;
	}
	50% {
		opacity: 0.5;
}
`

const cardBase = css`
	max-width: 42rem;
	background-color: ${({ theme }) => theme.colors.bgPrimary};
	border-radius: ${({ theme }) => theme.borderRadius.xl};
	box-shadow: ${({ theme }) => theme.shadows.lg};
`

const baseTitleStyle = css`
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	color: ${({ theme }) => theme.colors.textPrimary};
`

export { pulseSlow, cardBase, baseTitleStyle }
