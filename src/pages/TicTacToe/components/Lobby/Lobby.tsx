import type { FC } from 'react'

import {
	format,
	isToday,
	isYesterday,
	differenceInMinutes,
	differenceInHours,
	differenceInDays,
} from 'date-fns'

import { GameListItem } from '@/types/ticTacToe'
import {
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
} from './Lobby.style'
import Button from '@/components/Button'

interface LobbyProps {
	games: GameListItem[]
	onCreateGame: () => void
	onJoinGame: (gameId: string) => void
	isLoading: boolean
	userName: string
}

// Format the date into a human-readable string
const formatDate = (timestamp: number): string => {
	const date = new Date(timestamp)
	const now = new Date()

	const diffMins = differenceInMinutes(now, date)
	const diffHours = differenceInHours(now, date)
	const diffDays = differenceInDays(now, date)

	if (diffMins < 1) return 'just now'

	if (isYesterday(date)) return `Yesterday ${format(date, 'p')}`

	if (diffMins < 60) return `${diffMins}m ago`
	if (diffHours < 24) return `${diffHours}h ago`
	if (isToday(date)) return `Today ${format(date, 'p')}`
	if (diffDays < 7) return `${diffDays}d ago`

	return format(date, 'MMM d, yyyy')
}

// Lobby component to display available games and allow creating/joining games
const Lobby: FC<LobbyProps> = ({ games, onCreateGame, onJoinGame, isLoading, userName }) => {
	return (
		<LobbyContainer>
			<Header>
				<div>
					<Title>Tic Tac Toe Lobby</Title>
					<Subtitle>
						Welcome, {userName}! Create or join a game to start playing.
					</Subtitle>
				</div>
				<Button onClick={onCreateGame} isLoading={isLoading} size="lg">
					Create Game
				</Button>
			</Header>
			<GamesList>
				{games.length === 0 ? (
					<EmptyState>
						<EmptyTitle>No Games Available</EmptyTitle>
						<EmptyDescription>
							There are currently no games in the lobby. Create a new game to get
							started!
						</EmptyDescription>
					</EmptyState>
				) : (
					games.map(game => {
						return (
							<GameItem key={game.id}>
								<GameItemContent>
									<GameItemInner>
										<Avatar>
											<AvatarText>
												{game.creatorName[0]?.toUpperCase()}
											</AvatarText>
										</Avatar>
										<div>
											<CreatorName>{game.creatorName}'s Game</CreatorName>
											<GameTime>
												Created {formatDate(game.createdAt)}
											</GameTime>
										</div>
									</GameItemInner>
								</GameItemContent>
								<Button
									onClick={() => onJoinGame(game.id)}
									size="sm"
									disabled={isLoading}
								>
									Join Game
								</Button>
							</GameItem>
						)
					})
				)}
			</GamesList>
		</LobbyContainer>
	)
}

export default Lobby
