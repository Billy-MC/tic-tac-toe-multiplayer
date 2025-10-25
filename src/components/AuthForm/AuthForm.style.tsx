import styled from 'styled-components'
import Button, { type ButtonProps } from '@/components/Button'

const FormContainer = styled.div`
	width: 100%;
	max-width: 28rem;
	background-color: ${props => props.theme.colors.bgPrimary};
	border-radius: ${props => props.theme.borderRadius.xl};
	box-shadow: ${props => props.theme.shadows.lg};
	padding: 1.5rem;
`

const Header = styled.div`
	text-align: center;
	margin-bottom: 1.5rem;
`

const Title = styled.h1`
	font-size: ${props => props.theme.fontSize['4xl']};
	font-weight: ${props => props.theme.fontWeight.bold};
	color: ${props => props.theme.colors.textPrimary};
	margin-bottom: 0.5rem;
`

const Subtitle = styled.p`
	color: ${props => props.theme.colors.textSecondary};
`

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`

const ErrorMessage = styled.div`
	background-color: ${props => props.theme.colors.dangerLight};
	border: 1px solid ${props => props.theme.colors.danger};
	color: ${props => props.theme.colors.danger};
	padding: 0.75rem 1rem;
	border-radius: ${props => props.theme.borderRadius.lg};
`

const FullWidthButton = styled(Button)<ButtonProps>`
	width: 100%;
`

const Footer = styled.div`
	margin-top: 1.5rem;
	text-align: center;
`

const ToggleButton = styled.button`
	color: ${props => props.theme.colors.primary};
	font-weight: ${props => props.theme.fontWeight.medium};
	background: none;
	border: none;
	cursor: pointer;
	transition: color ${props => props.theme.transitions.normal};

	&:hover {
		color: ${props => props.theme.colors.primaryHover};
	}
`

export {
	FormContainer,
	Header,
	Title,
	Subtitle,
	Form,
	ErrorMessage,
	FullWidthButton,
	Footer,
	ToggleButton,
}
