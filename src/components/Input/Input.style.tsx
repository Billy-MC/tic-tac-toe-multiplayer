import styled from 'styled-components'

const InputWrapper = styled.div`
	width: 100%;
`

const Label = styled.label`
	display: block;
	font-size: ${props => props.theme.fontSize.sm};
	font-weight: ${props => props.theme.fontWeight.medium};
	color: ${props => props.theme.colors.textPrimary};
	margin-bottom: 0.25rem;
`

const StyledInput = styled.input<{ $hasError: boolean }>`
	width: 100%;
	padding: 0.5rem 1rem;
	border: 1px solid
		${props => (props.$hasError ? props.theme.colors.danger : props.theme.colors.border)};
	border-radius: ${props => props.theme.borderRadius.lg};
	font-size: ${props => props.theme.fontSize.base};
	transition: all ${props => props.theme.transitions.normal};

	&:focus {
		outline: none;
		border-color: ${props => props.theme.colors.primary};
		box-shadow: 0 0 0 3px ${props => props.theme.colors.primaryLight};
	}

	&::placeholder {
		color: ${props => props.theme.colors.textLight};
	}
`

const ErrorMessage = styled.p`
	margin-top: 0.25rem;
	font-size: ${props => props.theme.fontSize.sm};
	color: ${props => props.theme.colors.danger};
`

export { InputWrapper, Label, StyledInput, ErrorMessage }
