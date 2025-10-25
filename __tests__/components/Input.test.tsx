/// <reference types="@testing-library/jest-dom" />

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../test-utils'
import userEvent from '@testing-library/user-event'
import Input from '../../src/components/Input'

describe('Input Component', () => {
	it('renders with label', () => {
		render(<Input label="Email" value="" onChange={() => {}} />)
		expect(screen.getByLabelText('Email')).toBeInTheDocument()
	})

	it('renders with placeholder', () => {
		render(<Input placeholder="Enter email" value="" onChange={() => {}} />)
		expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
	})

	it('calls onChange when user types', async () => {
		const handleChange = vi.fn()
		const user = userEvent.setup()

		render(<Input value="" onChange={handleChange} />)

		const input = screen.getByRole('textbox')
		await user.type(input, 'test')

		expect(handleChange).toHaveBeenCalled()
	})

	it('displays error message when error prop is provided', () => {
		render(<Input value="" onChange={() => {}} error="This field is required" />)

		expect(screen.getByText('This field is required')).toBeInTheDocument()
	})

	it('applies disabled state correctly', () => {
		render(<Input value="" onChange={() => {}} disabled />)

		const input = screen.getByRole('textbox')
		expect(input).toBeDisabled()
	})

	it('applies required attribute', () => {
		render(<Input value="" onChange={() => {}} required />)

		const input = screen.getByRole('textbox')
		expect(input).toBeRequired()
	})

	it('renders different input types correctly', () => {
		const { rerender } = render(<Input type="text" value="" onChange={() => {}} />)
		expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')

		rerender(<Input type="email" value="" onChange={() => {}} />)
		expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')

		rerender(<Input type="password" value="" onChange={() => {}} />)
		const passwordInput = document.querySelector('input[type="password"]')
		expect(passwordInput).toBeInTheDocument()
	})

	it('supports controlled component pattern', async () => {
		const handleChange = vi.fn()
		const user = userEvent.setup()

		const { rerender } = render(<Input value="" onChange={handleChange} />)

		const input = screen.getByRole('textbox') as HTMLInputElement

		// Simulate typing
		await user.type(input, 'a')

		// Update with new value
		rerender(<Input value="a" onChange={handleChange} />)

		expect(input.value).toBe('a')
	})

	it('shows label and error message together', () => {
		render(<Input label="Username" value="" onChange={() => {}} error="Username is required" />)

		expect(screen.getByLabelText('Username')).toBeInTheDocument()
		expect(screen.getByText('Username is required')).toBeInTheDocument()
	})
})
