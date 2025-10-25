import type { FC } from 'react'
import type { CellValue } from '@/types/ticTacToe'
import { CellContent, StyledCell } from './Cell.style'

interface CellProps {
	value: CellValue
	onClick: () => void
	isWinningCell: boolean
	isDisabled: boolean
}

const Cell: FC<CellProps> = ({ value, onClick, isWinningCell, isDisabled }) => {
	const hasValue = Boolean(value)
	const blocked = isDisabled || hasValue

	return (
		<StyledCell
			disabled={blocked}
			$isDisabled={isDisabled}
			$hasValue={Boolean(value)}
			$isWinningCell={isWinningCell}
			onClick={onClick}
		>
			{value && <CellContent $player={value}>{value}</CellContent>}
		</StyledCell>
	)
}

export default Cell
