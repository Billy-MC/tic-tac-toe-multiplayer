/// <reference types="@testing-library/jest-dom" />

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../test-utils'
import userEvent from '@testing-library/user-event'
import Board from '../../src/pages/TicTacToe/components/Board'
import { Board as BoardType } from '../../src/types/ticTacToe'

describe('GameBoard Component', () => {
	const emptyBoard: BoardType = [null, null, null, null, null, null, null, null, null]

	it('renders 9 cells', () => {
		render(<Board board={emptyBoard} onCellClick={() => {}} isMyTurn={true} />)

		const buttons = screen.getAllByRole('button')
		expect(buttons).toHaveLength(9)
	})

	it('displays board state correctly', () => {
		const board: BoardType = ['X', 'O', 'X', null, 'O', null, null, null, null]

		render(<Board board={board} onCellClick={() => {}} isMyTurn={true} />)

		// Expect 9 buttons (cells)
		const cells = screen.getAllByRole('button')
		expect(cells).toHaveLength(9)

		// Expect two X, two O
		expect(screen.getAllByRole('button', { name: 'X' })).toHaveLength(2)
		expect(screen.getAllByRole('button', { name: 'O' })).toHaveLength(2)

		expect(cells[0]).toBeDisabled() // 'X'
		expect(cells[1]).toBeDisabled() // 'O'
		expect(cells[2]).toBeDisabled() // 'X'
		expect(cells[3]).toBeEnabled() // null
	})
	it('calls onCellClick with correct index when cell is clicked', async () => {
		const handleCellClick = vi.fn()
		const user = userEvent.setup()

		render(<Board board={emptyBoard} onCellClick={handleCellClick} isMyTurn={true} />)

		const buttons = screen.getAllByRole('button')

		// Click first cell
		await user.click(buttons[0])
		expect(handleCellClick).toHaveBeenCalledWith(0)

		// Click last cell
		await user.click(buttons[8])
		expect(handleCellClick).toHaveBeenCalledWith(8)
	})

	it('disables cells when not my turn', () => {
		render(<Board board={emptyBoard} onCellClick={() => {}} isMyTurn={false} />)

		const buttons = screen.getAllByRole('button')
		buttons.forEach(button => {
			expect(button).toBeDisabled()
		})
	})

	it('highlights winning cells', () => {
		const board: BoardType = ['X', 'X', 'X', null, null, null, null, null, null]
		const winningLine = [0, 1, 2]

		render(
			<Board
				board={board}
				onCellClick={() => {}}
				isMyTurn={false}
				winningLine={winningLine}
			/>
		)

		// All cells should be rendered
		const buttons = screen.getAllByRole('button')
		expect(buttons).toHaveLength(9)
	})

	it('renders game in progress correctly', () => {
		const board: BoardType = ['X', 'O', null, 'X', 'O', null, null, null, null]

		render(<Board board={board} onCellClick={() => {}} isMyTurn={true} />)

		const buttons = screen.getAllByRole('button')

		// First two cells should be disabled (filled)
		expect(buttons[0]).toBeDisabled()
		expect(buttons[1]).toBeDisabled()

		// Empty cells should be enabled (when it's my turn)
		expect(buttons[2]).not.toBeDisabled()
	})

	it('does not call onClick for occupied cells', async () => {
		const handleCellClick = vi.fn()
		const user = userEvent.setup()
		const board: BoardType = ['X', null, null, null, null, null, null, null, null]

		render(<Board board={board} onCellClick={handleCellClick} isMyTurn={true} />)

		const buttons = screen.getAllByRole('button')

		// Try to click occupied cell
		await user.click(buttons[0])
		expect(handleCellClick).not.toHaveBeenCalled()

		// Click empty cell
		await user.click(buttons[1])
		expect(handleCellClick).toHaveBeenCalledWith(1)
	})

	it('handles full board correctly', () => {
		const board: BoardType = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O']

		render(<Board board={board} onCellClick={() => {}} isMyTurn={true} />)

		const buttons = screen.getAllByRole('button')

		// All cells should be disabled when filled
		buttons.forEach(button => {
			expect(button).toBeDisabled()
		})
	})
})
