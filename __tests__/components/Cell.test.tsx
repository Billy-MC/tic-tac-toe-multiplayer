/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../test-utils'
import userEvent from '@testing-library/user-event'
import Cell from '../../src/components/Cell'

describe('Cell Component', () => {
	it('renders empty cell', () => {
		render(<Cell value={null} onClick={() => {}} isDisabled={false} isWinningCell={false} />)

		const button = screen.getByRole('button')
		expect(button).toBeInTheDocument()
		expect(button.textContent).toBe('')
	})

	it('renders cell with X', () => {
		render(<Cell value="X" onClick={() => {}} isDisabled={false} isWinningCell={false} />)

		expect(screen.getByText('X')).toBeInTheDocument()
	})

	it('renders cell with O', () => {
		render(<Cell value="O" onClick={() => {}} isDisabled={false} isWinningCell={false} />)

		expect(screen.getByText('O')).toBeInTheDocument()
	})

	it('calls onClick when clicked on empty cell', async () => {
		const handleClick = vi.fn()
		const user = userEvent.setup()

		render(<Cell value={null} onClick={handleClick} isDisabled={false} isWinningCell={false} />)

		await user.click(screen.getByRole('button'))
		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	it('does not call onClick when cell has value', async () => {
		const handleClick = vi.fn()
		const user = userEvent.setup()

		render(<Cell value="X" onClick={handleClick} isDisabled={false} isWinningCell={false} />)

		await user.click(screen.getByRole('button'))
		expect(handleClick).not.toHaveBeenCalled()
	})

	it('does not call onClick when disabled', async () => {
		const handleClick = vi.fn()
		const user = userEvent.setup()

		render(<Cell value={null} onClick={handleClick} isDisabled={true} isWinningCell={false} />)

		await user.click(screen.getByRole('button'))
		expect(handleClick).not.toHaveBeenCalled()
	})

	it('is disabled when isDisabled is true', () => {
		render(<Cell value={null} onClick={() => {}} isDisabled={true} isWinningCell={false} />)

		const button = screen.getByRole('button')
		expect(button).toBeDisabled()
	})

	it('is disabled when cell has a value', () => {
		render(<Cell value="X" onClick={() => {}} isDisabled={false} isWinningCell={false} />)

		const button = screen.getByRole('button')
		expect(button).toBeDisabled()
	})

	it('applies winning cell styles when isWinningCell is true', () => {
		render(<Cell value="X" onClick={() => {}} isDisabled={false} isWinningCell={true} />)

		const button = screen.getByRole('button')
		expect(button).toBeInTheDocument()
	})

	it('can be clicked only when empty and not disabled', async () => {
		const handleClick = vi.fn()
		const user = userEvent.setup()

		// Empty and not disabled - should be clickable
		const { rerender } = render(
			<Cell value={null} onClick={handleClick} isDisabled={false} isWinningCell={false} />
		)

		await user.click(screen.getByRole('button'))
		expect(handleClick).toHaveBeenCalledTimes(1)

		// Has value - should not be clickable
		handleClick.mockClear()
		rerender(<Cell value="X" onClick={handleClick} isDisabled={false} isWinningCell={false} />)

		await user.click(screen.getByRole('button'))
		expect(handleClick).not.toHaveBeenCalled()

		// Empty but disabled - should not be clickable
		handleClick.mockClear()
		rerender(
			<Cell value={null} onClick={handleClick} isDisabled={true} isWinningCell={false} />
		)

		await user.click(screen.getByRole('button'))
		expect(handleClick).not.toHaveBeenCalled()
	})
})
