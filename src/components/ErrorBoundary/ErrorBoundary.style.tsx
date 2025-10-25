import styled from 'styled-components'
import { cardBase } from '@/components/SharedStyled/mixin'

const ErrorContainer = styled.div`
	min-height: 100vh;
	background: linear-gradient(
		to bottom right,
		${props => props.theme.colors.bgGradientFrom},
		${props => props.theme.colors.bgGradientTo}
	);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;
`

const ErrorCard = styled.div`
	${cardBase};
	padding: 2rem;
`

const ErrorContent = styled.div`
	text-align: center;
`

const ErrorIcon = styled.div`
	font-size: 3.75rem;
	margin-bottom: 1rem;
`

const ErrorTitle = styled.h1`
	color: ${props => props.theme.colors.textPrimary};
	font-size: ${props => props.theme.fontSize['3xl']};
	font-weight: ${props => props.theme.fontWeight.bold};
	margin-bottom: 0.5rem;
`

const ErrorMessage = styled.p`
	color: ${props => props.theme.colors.textSecondary};
	margin-bottom: 1.5rem;
`

const ErrorList = styled.ul`
	text-align: left;
	color: ${props => props.theme.colors.textPrimary};
	margin-bottom: 1.5rem;
	list-style: none;
	padding: 0;
`

const ErrorListItem = styled.li`
	display: flex;
	align-items: flex-start;
	margin-bottom: 0.5rem;

	&::before {
		content: '•';
		margin-right: 0.5rem;
		flex-shrink: 0;
	}
`

const ErrorDetails = styled.div`
	margin-bottom: 1.5rem;
	text-align: left;
`

const DetailsToggle = styled.details`
	background-color: ${props => props.theme.colors.dangerLight};
	border: 1px solid ${props => props.theme.colors.danger};
	border-radius: ${props => props.theme.borderRadius.lg};
	padding: 1rem;
`

const DetailsSummary = styled.summary`
	cursor: pointer;
	font-weight: ${props => props.theme.fontWeight.semibold};
	color: ${props => props.theme.colors.danger};
	margin-bottom: 0.5rem;
`

const DetailsContent = styled.div`
	font-size: ${props => props.theme.fontSize.sm};
	color: ${props => props.theme.colors.danger};

	& > div {
		margin-bottom: 0.5rem;
	}

	strong {
		display: block;
		margin-bottom: 0.25rem;
	}

	pre {
		margin-top: 0.25rem;
		padding: 0.5rem;
		background-color: ${props => props.theme.colors.dangerLight};
		border-radius: ${props => props.theme.borderRadius.md};
		overflow-x: auto;
		font-size: ${props => props.theme.fontSize.xs};
	}
`

const ButtonGroup = styled.div`
	display: flex;
	gap: 0.75rem;
	justify-content: center;
`

const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
	padding: 0.75rem 1.5rem;
	font-size: ${props => props.theme.fontSize.lg};
	font-weight: ${props => props.theme.fontWeight.semibold};
	border-radius: ${props => props.theme.borderRadius.lg};
	border: none;
	cursor: pointer;
	transition: all ${props => props.theme.transitions.normal};

	${props =>
		props.$variant === 'secondary'
			? `
    background-color: ${props.theme.colors.secondary};
    color: white;

    &:hover {
		background-color: ${props.theme.colors.secondaryHover};
    }
		`
			: `
    background-color: ${props.theme.colors.primary};
    color: white;

    &:hover {
		background-color: ${props.theme.colors.primaryHover};
    }
	`}
`

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`

const FooterNote = styled.p`
	font-size: ${props => props.theme.fontSize.sm};
	color: ${props => props.theme.colors.textLight};
	margin-top: 1.5rem;
`

const TipBox = styled.div`
	margin-top: 1.5rem;
	padding: 1rem;
	background-color: ${props => props.theme.colors.primaryLight};
	border-radius: ${props => props.theme.borderRadius.lg};
	font-size: ${props => props.theme.fontSize.sm};
	color: ${props => props.theme.colors.textPrimary};

	strong {
		font-weight: ${props => props.theme.fontWeight.semibold};
	}
`

export {
	ErrorContainer,
	ErrorCard,
	ErrorContent,
	ErrorIcon,
	ErrorTitle,
	ErrorMessage,
	ErrorDetails,
	DetailsToggle,
	DetailsSummary,
	DetailsContent,
	ButtonGroup,
	StyledButton,
	FooterNote,
	ErrorList,
	ErrorListItem,
	ButtonContainer,
	TipBox,
}
