import type { Player, Board, GameStatus, GameResult } from '@/types/ticTacToe'

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

// Create an empty tic-tac-toe board
export const createEmptyBoard = (): Board => Array(9).fill(null)

// Checks if a cell is empty (null)
export const isCellEmpty = (board: Board, index: number): boolean => board[index] === null

// Move on the board
export const makeMove = (board: Board, index: number, player: Player): Board => {
	if (!isCellEmpty(board, index)) {
		throw new Error('Cell is already occupied')
	}
	const newBoard = [...board] // Create a copy of the board to make sure immutability
	newBoard[index] = player
	return newBoard
}

// Checks if the board is full
export const isBoardFull = (board: Board): boolean => board.every(cell => cell !== null)

// Checks if there is a winning line for the given player
const checkWinningLine = (
	board: Board,
	player: Player,
	line: readonly [number, number, number]
): boolean => line.every(index => board[index] === player)

// Finds a winning line on the Board
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

// Evaluates the game status
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

// Get the next player
export const getNextPlayer = (currentPlayer: Player): Player => (currentPlayer === 'X' ? 'O' : 'X')

// Validate if a move is valid
export const isValidMove = (board: Board, index: number): boolean =>
	index >= 0 && index < board.length && isCellEmpty(board, index)
