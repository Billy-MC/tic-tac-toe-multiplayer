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
	const hasValue = value !== null && value !== ''

	const shouldDisable = isDisabled || hasValue

	const handleClick = () => {
		if (!shouldDisable) {
			onClick()
		}
	}

	return (
		<StyledCell
			onClick={handleClick}
			disabled={shouldDisable}
			$isDisabled={isDisabled}
			$hasValue={hasValue}
			$isWinningCell={isWinningCell}
		>
			{value && <CellContent $player={value}>{value}</CellContent>}
		</StyledCell>
	)
}

export default Cell
