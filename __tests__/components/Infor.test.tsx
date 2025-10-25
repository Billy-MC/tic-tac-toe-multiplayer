/// <reference types="@testing-library/jest-dom" />

import { describe, it, expect } from 'vitest'
import { render, screen } from '../test-utils'
import Info from '../../src/pages/TicTacToe/components/Info'
import { GameResult } from '../../src/types/ticTacToe'

describe('GameInfo Component', () => {
	it('displays "Your turn!" when it is player\'s turn', () => {
		render(<Info currentPlayer="X" mySymbol="X" />)

		expect(screen.getByText(/Your turn!/i)).toBeInTheDocument()
	})

	it('displays "Waiting for opponent..." when it is not player\'s turn', () => {
		render(<Info currentPlayer="O" mySymbol="X" />)

		expect(screen.getByText(/Waiting for opponent/i)).toBeInTheDocument()
	})

	it('displays "You won!" when player wins', () => {
		const result: GameResult = {
			type: 'win',
			winner: 'X',
			winningLine: [0, 1, 2],
		}

		render(<Info currentPlayer="X" mySymbol="X" result={result} />)

		expect(screen.getByText(/You won!/i)).toBeInTheDocument()
	})

	it('displays "You lost!" when opponent wins', () => {
		const result: GameResult = {
			type: 'win',
			winner: 'O',
			winningLine: [0, 1, 2],
		}

		render(<Info currentPlayer="O" mySymbol="X" result={result} />)

		expect(screen.getByText(/You lost!/i)).toBeInTheDocument()
	})

	it('displays "It\'s a draw!" when game is a draw', () => {
		const result: GameResult = {
			type: 'draw',
		}

		render(<Info currentPlayer="X" mySymbol="X" result={result} />)

		expect(screen.getByText(/It's a draw!/i)).toBeInTheDocument()
	})

	it('displays player symbol when game is in progress', () => {
		render(<Info currentPlayer="X" mySymbol="X" />)

		expect(screen.getByText(/You are playing as/i)).toBeInTheDocument()
		expect(screen.getByText('X')).toBeInTheDocument()
	})

	it('does not display player symbol when game is finished', () => {
		const result: GameResult = {
			type: 'win',
			winner: 'X',
			winningLine: [0, 1, 2],
		}

		render(<Info currentPlayer="X" mySymbol="X" result={result} />)

		expect(screen.queryByText(/You are playing as/i)).not.toBeInTheDocument()
	})

	it('displays correct player symbol for X', () => {
		render(<Info currentPlayer="X" mySymbol="X" />)

		const symbolElement = screen.getByText('X')
		expect(symbolElement).toBeInTheDocument()
	})

	it('displays correct player symbol for O', () => {
		render(<Info currentPlayer="O" mySymbol="O" />)

		const symbolElement = screen.getByText('O')
		expect(symbolElement).toBeInTheDocument()
	})

	it('handles null mySymbol correctly', () => {
		render(<Info currentPlayer="X" mySymbol={null} />)

		// Should still render waiting message
		expect(screen.getByText(/Waiting for opponent/i)).toBeInTheDocument()
	})

	it('shows appropriate emoji for each game state', () => {
		const { rerender } = render(<Info currentPlayer="X" mySymbol="X" />)
		expect(screen.getByText(/Your turn!/)).toBeInTheDocument()

		rerender(<Info currentPlayer="O" mySymbol="X" />)
		expect(screen.getByText(/Waiting for opponent.../)).toBeInTheDocument()

		const winResult: GameResult = { type: 'win', winner: 'X', winningLine: [0, 1, 2] }
		rerender(<Info currentPlayer="X" mySymbol="X" result={winResult} />)
		expect(screen.getByText(/You won!/)).toBeInTheDocument()

		const loseResult: GameResult = { type: 'win', winner: 'O', winningLine: [0, 1, 2] }
		rerender(<Info currentPlayer="X" mySymbol="X" result={loseResult} />)
		expect(screen.getByText(/You lost!/)).toBeInTheDocument()

		const drawResult: GameResult = { type: 'draw' }
		rerender(<Info currentPlayer="X" mySymbol="X" result={drawResult} />)
		expect(screen.getByText(/It's a draw!/)).toBeInTheDocument()
	})
})
