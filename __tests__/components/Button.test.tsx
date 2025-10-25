/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../test-utils'
import userEvent from '@testing-library/user-event'
import Button from '../../src/components/Button'

describe('Button Component', () => {
	it('renders with children text', () => {
		render(<Button>Click me</Button>)
		expect(screen.getByText('Click me')).not.toBeNull()
	})

	it('calls onClick when clicked', async () => {
		const handleClick = vi.fn()
		const user = userEvent.setup()

		render(<Button onClick={handleClick}>Click me</Button>)

		await user.click(screen.getByText('Click me'))
		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	it('does not call onClick when disabled', async () => {
		const handleClick = vi.fn()
		const user = userEvent.setup()

		render(
			<Button onClick={handleClick} disabled>
				Click me
			</Button>
		)

		await user.click(screen.getByText('Click me'))
		expect(handleClick).not.toHaveBeenCalled()
	})

	it('shows loading spinner when isLoading is true', () => {
		render(<Button isLoading>Click me</Button>)

		// Loading spinner should be visible
		const button = screen.getByRole('button')
		expect(button).toBeDisabled()
	})

	it('renders different variants correctly', () => {
		const { rerender } = render(<Button variant="primary">Primary</Button>)
		expect(screen.getByText('Primary')).not.toBeNull()

		rerender(<Button variant="secondary">Secondary</Button>)
		expect(screen.getByText('Secondary')).not.toBeNull()

		rerender(<Button variant="danger">Danger</Button>)
		expect(screen.getByText('Danger')).not.toBeNull()
	})

	it('renders different sizes correctly', () => {
		const { rerender } = render(<Button size="sm">Small</Button>)
		expect(screen.getByText('Small')).not.toBeNull()

		rerender(<Button size="md">Medium</Button>)
		expect(screen.getByText('Medium')).not.toBeNull()

		rerender(<Button size="lg">Large</Button>)
		expect(screen.getByText('Large')).not.toBeNull()
	})

	it('supports different button types', () => {
		const { rerender } = render(<Button type="button">Button</Button>)
		expect(screen.getByRole('button')).toHaveAttribute('type', 'button')

		rerender(<Button type="submit">Submit</Button>)
		expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')

		rerender(<Button type="reset">Reset</Button>)
		expect(screen.getByRole('button')).toHaveAttribute('type', 'reset')
	})
})
