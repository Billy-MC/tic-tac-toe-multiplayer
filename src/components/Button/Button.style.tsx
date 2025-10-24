import { FaSpinner } from 'react-icons/fa'
import styled, { css, keyframes } from 'styled-components'

const StyledButton = styled.button<{ $variant: string; $size: string; $isLoading: boolean }>`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-weight: ${props => props.theme.fontWeight.semibold};
	border-radius: ${props => props.theme.borderRadius.lg};
	border: none;
	cursor: pointer;
	transition: all ${props => props.theme.transitions.normal};

	/* Variant styles */
	${props =>
		props.$variant === 'primary' &&
		css`
			background-color: ${props => props.theme.colors.primary};
			color: white;

			&:hover:not(:disabled) {
				background-color: ${props => props.theme.colors.primaryHover};
			}

			&:disabled {
				background-color: ${props => props.theme.colors.primaryLight};
				cursor: not-allowed;
			}
		`}

	${props =>
		props.$variant === 'secondary' &&
		css`
			background-color: ${props => props.theme.colors.secondary};
			color: white;

			&:hover:not(:disabled) {
				background-color: ${props => props.theme.colors.secondaryHover};
			}

			&:disabled {
				background-color: ${props => props.theme.colors.secondaryLight};
				cursor: not-allowed;
			}
		`}

	${props =>
		props.$variant === 'danger' &&
		css`
			background-color: ${props => props.theme.colors.danger};
			color: white;

			&:hover:not(:disabled) {
				background-color: ${props => props.theme.colors.dangerHover};
			}

			&:disabled {
				background-color: ${props => props.theme.colors.dangerLight};
				color: ${props => props.theme.colors.danger};
				cursor: not-allowed;
			}
		`}

  /* Size styles */
	${props =>
		props.$size === 'sm' &&
		css`
			padding: 0.375rem 0.75rem;
			font-size: ${props => props.theme.fontSize.sm};
		`}

	${props =>
		props.$size === 'md' &&
		css`
			padding: 0.5rem 1rem;
			font-size: ${props => props.theme.fontSize.base};
		`}

	${props =>
		props.$size === 'lg' &&
		css`
			padding: 0.75rem 1.5rem;
			font-size: ${props => props.theme.fontSize.lg};
		`}
	${props =>
		props.$isLoading &&
		css`
			cursor: wait;
		`}
`

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const Spinner = styled(FaSpinner)`
	animation: ${spin} 1s linear infinite;
	height: 1.25rem;
	width: 1.25rem;
	margin-right: 0.5rem;
	color: currentColor;
`

export { StyledButton, Spinner }
