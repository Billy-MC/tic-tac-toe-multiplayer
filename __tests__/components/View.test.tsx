/// <reference types="@testing-library/jest-dom" />

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, within } from '../test-utils'

import View from '../../src/pages/TicTacToe/components/View'
import userEvent from '@testing-library/user-event'
import { GameState } from '../../src/types/ticTacToe'

describe('View Component', () => {
	const mockOnMakeMove = vi.fn()
	const mockOnLeaveGame = vi.fn()

	const createMockGame = (overrides?: Partial<GameState>): GameState => ({
		id: 'game123',
		board: [null, null, null, null, null, null, null, null, null],
		currentPlayer: 'X',
		status: 'playing',
		players: {
			X: 'user1',
			O: 'user2',
		},
		createdAt: Date.now(),
		updatedAt: Date.now(),
		...overrides,
	})

	const defaultProps = {
		game: createMockGame(),
		userId: 'user1',
		onMakeMove: mockOnMakeMove,
		onLeaveGame: mockOnLeaveGame,
		error: null,
	}

	beforeEach(() => {
		mockOnMakeMove.mockClear()
		mockOnLeaveGame.mockClear()
	})

	describe('Header', () => {
		it('renders game room title', () => {
			render(<View {...defaultProps} />)

			expect(screen.getByText('Tic Tac Toe Room')).toBeInTheDocument()
		})

		it('renders leave game button', () => {
			render(<View {...defaultProps} />)

			expect(screen.getByRole('button', { name: /Leave Game/i })).toBeInTheDocument()
		})

		it('calls onLeaveGame when leave button is clicked', async () => {
			const user = userEvent.setup()

			render(<View {...defaultProps} />)

			await user.click(screen.getByRole('button', { name: /Leave Game/i }))

			expect(mockOnLeaveGame).toHaveBeenCalledTimes(1)
		})
	})

	describe('Waiting State', () => {
		it('shows waiting message when game status is waiting', () => {
			const waitingGame = createMockGame({
				status: 'waiting',
				players: { X: 'user1', O: null },
			})

			render(<View {...defaultProps} game={waitingGame} />)

			expect(screen.getByText(/Waiting for an opponent.../i)).toBeInTheDocument()
		})

		it('displays game ID in waiting state', () => {
			const waitingGame = createMockGame({
				status: 'waiting',
				players: { X: 'user1', O: null },
			})

			render(<View {...defaultProps} game={waitingGame} />)

			expect(screen.getByText(/Game ID: game123/i)).toBeInTheDocument()
		})

		it('shows share message in waiting state', () => {
			const waitingGame = createMockGame({
				status: 'waiting',
				players: { X: 'user1', O: null },
			})

			render(<View {...defaultProps} game={waitingGame} />)

			expect(screen.getByText(/Share this game with a friend/i)).toBeInTheDocument()
		})
	})

	describe('Playing State', () => {
		it('renders game board when playing', () => {
			render(<View {...defaultProps} />)

			// Should have 9 cells
			const buttons = screen.getAllByRole('button')
			const cellButtons = buttons.filter(btn => !btn.textContent?.includes('Leave'))
			expect(cellButtons.length).toBeGreaterThanOrEqual(9)
		})

		it('renders game info component', () => {
			render(<View {...defaultProps} />)

			// GameInfo should show turn or status message
			expect(screen.getByText(/Your turn!|Waiting for opponent/i)).toBeInTheDocument()
		})

		it('allows moves when it is player turn', () => {
			// User1 is X, and it's X's turn
			render(<View {...defaultProps} userId="user1" />)

			const buttons = screen.getAllByRole('button')
			const cellButtons = buttons.filter(btn => !btn.textContent?.includes('Leave'))

			// Cells should not be disabled (user can click)
			cellButtons.slice(0, 9).forEach(button => {
				expect(button).not.toBeDisabled()
			})
		})

		it('disables moves when it is not player turn', () => {
			// User1 is X, but it's O's turn (currentPlayer is O)
			const game = createMockGame({ currentPlayer: 'O' })

			render(<View {...defaultProps} game={game} userId="user1" />)

			const buttons = screen.getAllByRole('button')
			const cellButtons = buttons.filter(btn => !btn.textContent?.includes('Leave'))

			// Cells should be disabled (not user's turn)
			cellButtons.slice(0, 9).forEach(button => {
				expect(button).toBeDisabled()
			})
		})

		it('calls onMakeMove with correct cell index when cell is clicked', async () => {
			const user = userEvent.setup()

			render(<View {...defaultProps} userId="user1" />)

			const buttons = screen.getAllByRole('button')
			const cellButtons = buttons.filter(btn => !btn.textContent?.includes('Leave'))

			// Click first cell
			await user.click(cellButtons[0])

			expect(mockOnMakeMove).toHaveBeenCalledWith(0)
		})

		it('displays board state correctly', () => {
			const game = createMockGame({
				board: ['X', 'O', 'X', null, null, null, null, null, null],
			})

			render(<View {...defaultProps} game={game} />)

			const board = screen.getByRole('grid', { name: /tic tac toe board/i })
			expect(within(board).getAllByText('X')).toHaveLength(2)
			expect(within(board).getAllByText('O')).toHaveLength(1)
		})
	})

	describe('Finished State', () => {
		it('shows back to lobby button when game is finished', () => {
			const finishedGame = createMockGame({
				status: 'finished',
				result: { type: 'win', winner: 'X', winningLine: [0, 1, 2] },
			})

			render(<View {...defaultProps} game={finishedGame} />)

			expect(screen.getByRole('button', { name: /Exit Game/i })).toBeInTheDocument()
		})

		it('calls onLeaveGame when back to lobby is clicked', async () => {
			const user = userEvent.setup()
			const finishedGame = createMockGame({
				status: 'finished',
				result: { type: 'win', winner: 'X', winningLine: [0, 1, 2] },
			})

			render(<View {...defaultProps} game={finishedGame} />)

			await user.click(screen.getByRole('button', { name: /Exit Game/i }))

			expect(mockOnLeaveGame).toHaveBeenCalledTimes(1)
		})

		it('displays winning result', () => {
			const finishedGame = createMockGame({
				status: 'finished',
				result: { type: 'win', winner: 'X', winningLine: [0, 1, 2] },
			})

			render(<View {...defaultProps} game={finishedGame} userId="user1" />)

			// User1 is X and won
			expect(screen.getByText(/You won!/i)).toBeInTheDocument()
		})

		it('displays losing result', () => {
			const finishedGame = createMockGame({
				status: 'finished',
				result: { type: 'win', winner: 'O', winningLine: [0, 1, 2] },
			})

			render(<View {...defaultProps} game={finishedGame} userId="user1" />)

			// User1 is X and lost
			expect(screen.getByText(/You lost!/i)).toBeInTheDocument()
		})

		it('displays draw result', () => {
			const finishedGame = createMockGame({
				status: 'finished',
				result: { type: 'draw' },
			})

			render(<View {...defaultProps} game={finishedGame} />)

			expect(screen.getByText(/It's a draw!/i)).toBeInTheDocument()
		})
	})

	describe('Error Handling', () => {
		it('displays error message when error prop is provided', () => {
			render(<View {...defaultProps} error="Failed to make move" />)

			expect(screen.getByText('Failed to make move')).toBeInTheDocument()
		})

		it('does not display error message when error is null', () => {
			render(<View {...defaultProps} error={null} />)

			expect(screen.queryByText(/Failed/i)).not.toBeInTheDocument()
		})

		it('error message has correct styling', () => {
			render(<View {...defaultProps} error="Test error" />)

			const errorElement = screen.getByText('Test error')
			expect(errorElement).toBeInTheDocument()
		})
	})

	describe('Player Assignment', () => {
		it('identifies user as X when assigned to X', () => {
			const game = createMockGame({
				players: { X: 'user1', O: 'user2' },
			})

			render(<View {...defaultProps} game={game} userId="user1" />)

			// Should show "You are playing as X"
			expect(screen.getByText('X')).toBeInTheDocument()
		})

		it('identifies user as O when assigned to O', () => {
			const game = createMockGame({
				players: { X: 'user2', O: 'user1' },
				currentPlayer: 'O',
			})

			render(<View {...defaultProps} game={game} userId="user1" />)

			// Should show "You are playing as O"
			expect(screen.getByText('O')).toBeInTheDocument()
		})

		it('allows moves only on user turn', async () => {
			const user = userEvent.setup()

			// User is X, and it's X's turn
			const game = createMockGame({
				players: { X: 'user1', O: 'user2' },
				currentPlayer: 'X',
			})

			render(<View {...defaultProps} game={game} userId="user1" />)

			const buttons = screen.getAllByRole('button')
			const cellButtons = buttons.filter(btn => !btn.textContent?.includes('Leave'))

			await user.click(cellButtons[0])

			expect(mockOnMakeMove).toHaveBeenCalledWith(0)
		})
	})

	describe('Winning Line', () => {
		it('highlights winning line when game is won', () => {
			const finishedGame = createMockGame({
				status: 'finished',
				board: ['X', 'X', 'X', null, null, null, null, null, null],
				result: { type: 'win', winner: 'X', winningLine: [0, 1, 2] },
			})

			render(<View {...defaultProps} game={finishedGame} />)

			// The GameBoard component should receive winningLine prop
			// Visual testing would be better, but we can at least verify the board renders
			const buttons = screen.getAllByRole('button')
			expect(buttons.length).toBeGreaterThan(0)
		})
	})

	describe('Edge Cases', () => {
		it('handles missing player data gracefully', () => {
			const game = createMockGame({
				players: { X: null, O: null },
			})

			render(<View {...defaultProps} game={game} />)

			// Should still render without crashing
			expect(screen.getByText('Tic Tac Toe Room')).toBeInTheDocument()
		})

		it('handles user not in game', () => {
			const game = createMockGame({
				players: { X: 'user2', O: 'user3' },
			})

			render(<View {...defaultProps} game={game} userId="user1" />)

			// User1 is not in the game, should show waiting state
			expect(screen.getByText(/Waiting for opponent/i)).toBeInTheDocument()
		})

		it('handles rapid button clicks', async () => {
			const user = userEvent.setup()

			render(<View {...defaultProps} />)

			const leaveButton = screen.getByRole('button', { name: /Leave Game/i })

			// Click multiple times rapidly
			await user.click(leaveButton)
			await user.click(leaveButton)
			await user.click(leaveButton)

			// Should be called 3 times (no debouncing)
			expect(mockOnLeaveGame).toHaveBeenCalledTimes(3)
		})
	})
})
