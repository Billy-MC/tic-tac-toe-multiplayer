import { StyledCard } from '@/components/SharedStyled/SharedStyled'
import styled from 'styled-components'

const LobbyContainer = styled(StyledCard)`
	width: 100%;
	max-width: 42rem;
`

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 1.5rem;
`

const Title = styled.h2`
	font-size: ${props => props.theme.fontSize['3xl']};
	color: ${props => props.theme.colors.textPrimary};
	font-weight: ${props => props.theme.fontWeight.bold};
`

const Subtitle = styled.p`
	color: ${props => props.theme.colors.textSecondary};
	margin-top: 0.25rem;
`

const GamesList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`

const EmptyState = styled.div`
	text-align: center;
	padding: 3rem 0;
	color: ${props => props.theme.colors.textLight};
`

const EmptyTitle = styled.p`
	font-size: ${props => props.theme.fontSize.lg};
`

const EmptyDescription = styled.p`
	font-size: ${props => props.theme.fontSize.sm};
	margin-top: 0.5rem;
`

const GameItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem;
	border: 1px solid ${props => props.theme.colors.borderLight};
	border-radius: ${props => props.theme.borderRadius.lg};
	transition: all ${props => props.theme.transitions.normal};

	&:hover {
		border-color: ${props => props.theme.colors.primary};
		box-shadow: ${props => props.theme.shadows.md};
	}
`

const GameItemContent = styled.div`
	flex: 1;
`

const GameItemInner = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
`

const Avatar = styled.div`
	width: 2.5rem;
	height: 2.5rem;
	background-color: ${props => props.theme.colors.primaryLight};
	border-radius: ${props => props.theme.borderRadius.full};
	display: flex;
	align-items: center;
	justify-content: center;
`

const AvatarText = styled.span`
	color: ${props => props.theme.colors.primary};
	font-weight: ${props => props.theme.fontWeight.bold};
	font-size: ${props => props.theme.fontSize.lg};
`

const CreatorName = styled.p`
	font-weight: ${props => props.theme.fontWeight.semibold};
	color: ${props => props.theme.colors.textPrimary};
`

const GameTime = styled.p`
	font-size: ${props => props.theme.fontSize.sm};
	color: ${props => props.theme.colors.textLight};
`

export {
	LobbyContainer,
	Header,
	Title,
	Subtitle,
	GamesList,
	EmptyState,
	EmptyTitle,
	EmptyDescription,
	GameItem,
	GameItemContent,
	GameItemInner,
	Avatar,
	AvatarText,
	CreatorName,
	GameTime,
}
