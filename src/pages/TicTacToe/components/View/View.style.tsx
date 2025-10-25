import { baseTitleStyle, cardBase, pulseSlow } from '@/components/SharedStyled/mixin'
import styled from 'styled-components'

const GameContainer = styled.div`
	${cardBase};
	padding: 1.5rem;
`

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 1.5rem;
`

const Title = styled.h2`
	${baseTitleStyle};
`

const WaitingState = styled.div`
	text-align: center;
	padding: 3rem 0;
`

const WaitingIcon = styled.div`
	animation: ${pulseSlow} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	font-size: 3.75rem;
	margin-bottom: 1rem;
`

const WaitingTitle = styled.p`
	font-size: ${props => props.theme.fontSize.xl};
	font-weight: ${props => props.theme.fontWeight.semibold};
	color: ${props => props.theme.colors.textPrimary};
	margin-bottom: 0.5rem;
`

const WaitingDescription = styled.p`
	color: ${props => props.theme.colors.textSecondary};
`

const GameIdBox = styled.div`
	margin-top: 1rem;
	padding: 0.75rem;
	background-color: ${props => props.theme.colors.bgSecondary};
	border-radius: ${props => props.theme.borderRadius.lg};
	display: inline-block;
`

const GameIdCode = styled.code`
	font-size: ${props => props.theme.fontSize.sm};
	color: ${props => props.theme.colors.textPrimary};
`

const ErrorMessage = styled.div`
	margin-top: 1rem;
	background-color: ${props => props.theme.colors.dangerLight};
	border: 1px solid ${props => props.theme.colors.danger};
	color: ${props => props.theme.colors.danger};
	padding: 0.75rem 1rem;
	border-radius: ${props => props.theme.borderRadius.lg};
`

const FinishedActions = styled.div`
	margin-top: 1.5rem;
	text-align: center;
`

export {
	GameContainer,
	Header,
	Title,
	WaitingState,
	WaitingIcon,
	WaitingTitle,
	WaitingDescription,
	GameIdBox,
	GameIdCode,
	ErrorMessage,
	FinishedActions,
}
