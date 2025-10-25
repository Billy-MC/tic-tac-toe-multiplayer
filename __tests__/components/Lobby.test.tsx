/// <reference types="@testing-library/jest-dom" />

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../test-utils'
import userEvent from '@testing-library/user-event'
import Lobby from '../../src/pages/TicTacToe/components/Lobby/Lobby'
import { GameListItem } from '../../src/types/ticTacToe'

describe('Lobby Component', () => {
	const mockOnCreateGame = vi.fn()
	const mockOnJoinGame = vi.fn()

	const defaultProps = {
		games: [] as GameListItem[],
		onCreateGame: mockOnCreateGame,
		onJoinGame: mockOnJoinGame,
		isLoading: false,
		userName: 'Test User',
	}

	beforeEach(() => {
		mockOnCreateGame.mockClear()
		mockOnJoinGame.mockClear()
	})

	describe('Rendering', () => {
		it('renders lobby title and welcome message', () => {
			render(<Lobby {...defaultProps} />)

			expect(screen.getByText('Tic Tac Toe Lobby')).toBeInTheDocument()
			expect(screen.getByText(/Welcome, Test User!/i)).toBeInTheDocument()
		})

		it('renders create game button', () => {
			render(<Lobby {...defaultProps} />)

			expect(screen.getByRole('button', { name: /Create Game/i })).toBeInTheDocument()
		})

		it('displays empty state when no games available', () => {
			render(<Lobby {...defaultProps} />)

			expect(screen.getByText('No Games Available')).toBeInTheDocument()
			expect(
				screen.getByText(
					/There are currently no games in the lobby. Create a new game to get started/i
				)
			).toBeInTheDocument()
		})
	})

	describe('Game List', () => {
		it('renders list of available games', () => {
			const games: GameListItem[] = [
				{ id: 'game1', creatorName: 'Alice', status: 'playing', createdAt: Date.now() },
				{ id: 'game2', creatorName: 'Bob', status: 'playing', createdAt: Date.now() },
			]

			render(<Lobby {...defaultProps} games={games} />)

			expect(screen.getByText("Alice's Game")).toBeInTheDocument()
			expect(screen.getByText("Bob's Game")).toBeInTheDocument()
		})

		it('displays creator avatars with correct initials', () => {
			const games: GameListItem[] = [
				{ id: 'game1', creatorName: 'Alice', status: 'playing', createdAt: Date.now() },
				{ id: 'game2', creatorName: 'Bob', status: 'playing', createdAt: Date.now() },
			]

			render(<Lobby {...defaultProps} games={games} />)

			expect(screen.getByText('A')).toBeInTheDocument()
			expect(screen.getByText('B')).toBeInTheDocument()
		})

		it('shows join button for each game', () => {
			const games: GameListItem[] = [
				{ id: 'game1', creatorName: 'Alice', status: 'playing', createdAt: Date.now() },
				{ id: 'game2', creatorName: 'Bob', status: 'playing', createdAt: Date.now() },
			]

			render(<Lobby {...defaultProps} games={games} />)

			const joinButtons = screen.getAllByRole('button', { name: /Join Game/i })
			expect(joinButtons).toHaveLength(2)
		})

		it('displays time ago for game creation', () => {
			const now = Date.now()
			const games: GameListItem[] = [
				{ id: 'game1', creatorName: 'Alice', status: 'waiting', createdAt: now },
			]

			render(<Lobby {...defaultProps} games={games} />)

			expect(screen.getByText(/Created just now/i)).toBeInTheDocument()
		})

		it('formats time correctly for old games', () => {
			const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000
			const games: GameListItem[] = [
				{
					id: 'game1',
					creatorName: 'Alice',
					status: 'waiting',
					createdAt: twoHoursAgo,
				},
			]

			render(<Lobby {...defaultProps} games={games} />)

			expect(screen.getByText(/Created 2h ago/i)).toBeInTheDocument()
		})
	})

	describe('User Interactions', () => {
		it('calls onCreateGame when create button is clicked', async () => {
			const user = userEvent.setup()

			render(<Lobby {...defaultProps} />)

			await user.click(screen.getByRole('button', { name: /Create Game/i }))

			expect(mockOnCreateGame).toHaveBeenCalledTimes(1)
		})

		it('calls onJoinGame with correct game id when join button is clicked', async () => {
			const user = userEvent.setup()
			const games: GameListItem[] = [
				{ id: 'game1', creatorName: 'Alice', status: 'waiting', createdAt: Date.now() },
			]

			render(<Lobby {...defaultProps} games={games} />)

			await user.click(screen.getByRole('button', { name: /Join Game/i }))

			expect(mockOnJoinGame).toHaveBeenCalledWith('game1')
		})

		it('calls onJoinGame with correct id when multiple games exist', async () => {
			const user = userEvent.setup()
			const games: GameListItem[] = [
				{ id: 'game1', creatorName: 'Alice', status: 'waiting', createdAt: Date.now() },
				{ id: 'game2', creatorName: 'Bob', status: 'waiting', createdAt: Date.now() },
			]

			render(<Lobby {...defaultProps} games={games} />)

			const joinButtons = screen.getAllByRole('button', { name: /Join Game/i })

			// Click second game's join button
			await user.click(joinButtons[1])

			expect(mockOnJoinGame).toHaveBeenCalledWith('game2')
		})
	})

	describe('Loading State', () => {
		it('disables create button when loading', () => {
			render(<Lobby {...defaultProps} isLoading={true} />)

			const createButton = screen.getByRole('button', { name: /Loading.../i })
			expect(createButton).toBeDisabled()
			expect(createButton).toHaveAttribute('aria-busy', 'true')
		})

		it('disables join buttons when loading', () => {
			const games: GameListItem[] = [
				{ id: 'game1', creatorName: 'Alice', status: 'waiting', createdAt: Date.now() },
			]

			render(<Lobby {...defaultProps} games={games} isLoading={true} />)

			const joinButton = screen.getByRole('button', { name: /Join Game/i })
			expect(joinButton).toBeDisabled()
		})

		it('shows loading spinner in create button when loading', () => {
			render(<Lobby {...defaultProps} isLoading={true} />)

			const createButton = screen.getByRole('button', { name: /Loading.../i })
			expect(createButton).toBeDisabled()
			expect(screen.getByText(/Loading\.\.\./i)).toBeInTheDocument()
		})
	})
})
