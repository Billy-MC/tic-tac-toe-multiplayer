import type { FC } from 'react'
import type { Board as BoardType } from '@/types/ticTacToe'

import Cell from '@/components/Cell'
import { BoardGrid } from './Board.style'

interface BoardProps {
	board: BoardType
	onCellClick: (index: number) => void
	isMyTurn: boolean
	winningLine?: number[]
}

const Board: FC<BoardProps> = ({ board, onCellClick, isMyTurn, winningLine = [] }) => {
	return (
		<BoardGrid role="grid" aria-label="tic tac toe board">
			{board.map((cellValue, index) => (
				<Cell
					key={index}
					value={cellValue}
					onClick={() => onCellClick(index)}
					isDisabled={!isMyTurn || cellValue !== null}
					isWinningCell={winningLine.includes(index)}
					aria-label={`cell ${index} ${cellValue ?? 'empty'}`}
				/>
			))}
		</BoardGrid>
	)
}

export default Board
