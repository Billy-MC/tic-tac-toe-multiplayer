import type { Player, Board, GameResult } from '@/types/ticTacToe'

/**
 * All possible 3-in-a-row lines on a 3x3 board.
 * Using ReadonlyArray keeps the constants immutable.
 */
const WINNING_LINES: ReadonlyArray<readonly [number, number, number]> = [
	[0, 1, 2], // Top row
	[3, 4, 5], // Middle row
	[6, 7, 8], // Bottom row
	[0, 3, 6], // Left column
	[1, 4, 7], // Center column
	[2, 5, 8], // Right column
	[0, 4, 8], // Diagonal \
	[2, 4, 6], // Diagonal /
]

// Create an empty 3x3 tic-tac-toe board as a flat array of 9 cells.
export const createEmptyBoard = (): Board => Array(9).fill('')

/**
 * Check if a specific cell is empty.
 * Accepts both '' and null as "empty" to be robust against input.
 */
export const isCellEmpty = (board: Board, index: number): boolean => {
	return board[index] === null || board[index] === ''
}

/**
 * Return a new board with the player's move applied at the given index.
 * - Enforces immutability by cloning the board.
 * - Throws if the target cell is not empty (caller should validate first).
 */
export const makeMove = (board: Board, index: number, player: Player): Board => {
	if (!isCellEmpty(board, index)) {
		throw new Error('Cell is already occupied')
	}
	const newBoard = [...board] // Create a copy of the board to make sure immutability
	newBoard[index] = player
	return newBoard
}

//  True if every cell is non-empty.
export const isBoardFull = (board: Board): boolean => board.every(cell => cell !== '')

/**
 * Check whether the given player occupies all three cells of a line.
 */
const checkWinningLine = (
	board: Board,
	player: Player,
	line: readonly [number, number, number]
): boolean => line.every(index => board[index] === player)

/**
 * Find the first winning line on the board.
 * Returns the winning player and the line indexes, otherwise null.
 */
const findWinningLine = (board: Board): { player: Player; line: number[] } | null => {
	for (const line of WINNING_LINES) {
		const [a, b, c] = line
		const cellValue = board[a]
		if (cellValue && checkWinningLine(board, cellValue, line)) {
			return { player: cellValue, line: [a, b, c] }
		}
	}
	return null
}

/**
 * Evaluate the current game status based on the board:
 * - 'win' with winner and winningLine
 * - 'draw' if the board is full with no winner
 * - 'ongoing' otherwise
 */
export const evaluateGameStatus = (board: Board): GameResult => {
	const winningLine = findWinningLine(board)

	if (winningLine) {
		return { type: 'win', winner: winningLine.player, winningLine: winningLine.line }
	}

	if (isBoardFull(board)) {
		return { type: 'draw' }
	}

	return { type: 'ongoing' }
}

// Toggle to the other player.
export const getNextPlayer = (currentPlayer: Player): Player => (currentPlayer === 'X' ? 'O' : 'X')

/**
 * Validate whether a move is legal:
 * - index is in range
 * - target cell is empty
 */
export const isValidMove = (board: Board, index: number): boolean =>
	index >= 0 && index < board.length && isCellEmpty(board, index)
