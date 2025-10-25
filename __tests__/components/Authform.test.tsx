/// <reference types="@testing-library/jest-dom" />

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../test-utils/'
import userEvent from '@testing-library/user-event'
import AuthForm from '../../src/components/AuthForm'

const deferred = <T,>() => {
	let resolve!: (v: T | PromiseLike<T>) => void
	let reject!: (e?: unknown) => void
	const promise = new Promise<T>((res, rej) => {
		resolve = res
		reject = rej
	})
	return { promise, resolve, reject }
}

describe('AuthForm Component', () => {
	const signInDef = deferred<void>()
	const mockSignIn = vi.fn(() => signInDef.promise)
	const mockSignUp = vi.fn()

	beforeEach(() => {
		mockSignIn.mockClear()
		mockSignUp.mockClear()
	})

	it('renders sign in form by default', () => {
		render(<AuthForm onSignIn={mockSignIn} onSignUp={mockSignUp} error={null} />)

		expect(screen.getByText('Sign in to start playing')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument()
	})

	it('toggles between sign in and sign up modes', async () => {
		const user = userEvent.setup()

		render(<AuthForm onSignIn={mockSignIn} onSignUp={mockSignUp} error={null} />)

		// Initially in sign in mode
		expect(screen.getByText('Sign in to start playing')).toBeInTheDocument()

		// Click toggle to sign up
		await user.click(screen.getByText(/Don't have an account/i))

		// Should show sign up form
		expect(screen.getByText('Create an account to play')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument()

		// Click toggle back to sign in
		await user.click(screen.getByText(/Already have an account/i))

		// Should show sign in form again
		expect(screen.getByText('Sign in to start playing')).toBeInTheDocument()
	})

	it('shows display name field in sign up mode', async () => {
		const user = userEvent.setup()

		render(<AuthForm onSignIn={mockSignIn} onSignUp={mockSignUp} error={null} />)

		// Toggle to sign up mode
		await user.click(screen.getByText(/Don't have an account/i))

		// Display name field should be visible
		expect(screen.getByLabelText(/Display Name/i)).toBeInTheDocument()
	})

	it('validates required fields on sign in', async () => {
		const user = userEvent.setup()

		render(<AuthForm onSignIn={mockSignIn} onSignUp={mockSignUp} error={null} />)

		// Try to submit without filling fields
		await user.click(screen.getByRole('button', { name: /Sign In/i }))

		// Should show validation error
		expect(await screen.findByText(/Email and password are required./i)).toBeInTheDocument()
		expect(mockSignIn).not.toHaveBeenCalled()
	})

	it('validates password length', async () => {
		const user = userEvent.setup()

		render(<AuthForm onSignIn={mockSignIn} onSignUp={mockSignUp} error={null} />)

		// Fill in short password
		await user.type(screen.getByLabelText(/Email/i), 'test@example.com')
		await user.type(screen.getByLabelText(/Password/i), '123')

		// Try to submit
		await user.click(screen.getByRole('button', { name: /Sign In/i }))

		// Should show password length error
		expect(
			await screen.findByText(/Password must be at least 8 characters/i)
		).toBeInTheDocument()
		expect(mockSignIn).not.toHaveBeenCalled()
	})

	it('validates display name in sign up mode', async () => {
		const user = userEvent.setup()

		render(<AuthForm onSignIn={mockSignIn} onSignUp={mockSignUp} error={null} />)

		// Toggle to sign up
		await user.click(screen.getByText(/Don't have an account/i))

		// Fill email and password but not display name
		await user.type(screen.getByLabelText(/Email/i), 'test@example.com')
		await user.type(screen.getByLabelText(/Password/i), 'password123')

		// Try to submit
		await user.click(screen.getByRole('button', { name: /Sign Up/i }))

		// Should show display name error
		expect(await screen.findByText(/Display name is required/i)).toBeInTheDocument()
		expect(mockSignUp).not.toHaveBeenCalled()
	})

	it('calls onSignIn with correct credentials', async () => {
		const user = userEvent.setup()
		mockSignIn.mockResolvedValue(undefined)

		render(<AuthForm onSignIn={mockSignIn} onSignUp={mockSignUp} error={null} />)

		// Fill in credentials
		await user.type(screen.getByLabelText(/Email/i), 'test@example.com')
		await user.type(screen.getByLabelText(/Password/i), 'password123')

		// Submit form
		await user.click(screen.getByRole('button', { name: /Sign In/i }))

		// Should call sign in with correct data
		await waitFor(() => {
			expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123')
		})
	})

	it('calls onSignUp with correct data', async () => {
		const user = userEvent.setup()
		mockSignUp.mockResolvedValue(undefined)

		render(<AuthForm onSignIn={mockSignIn} onSignUp={mockSignUp} error={null} />)

		// Toggle to sign up
		await user.click(screen.getByText(/Don't have an account/i))

		// Fill in all fields
		await user.type(screen.getByLabelText(/Display Name/i), 'Test User')
		await user.type(screen.getByLabelText(/Email/i), 'test@example.com')
		await user.type(screen.getByLabelText(/Password/i), 'password123')

		// Submit form
		await user.click(screen.getByRole('button', { name: /Sign Up/i }))

		// Should call sign up with correct data
		await waitFor(() => {
			expect(mockSignUp).toHaveBeenCalledWith('test@example.com', 'password123', 'Test User')
		})
	})

	it('displays error message when provided', () => {
		render(<AuthForm onSignIn={mockSignIn} onSignUp={mockSignUp} error="Invalid credentials" />)

		expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
	})

	it('disables submit button when loading', async () => {
		const user = userEvent.setup()

		const signInDef = deferred<void>()
		const mockSignIn = vi.fn(() => signInDef.promise)
		const mockSignUp = vi.fn()
		render(<AuthForm onSignIn={mockSignIn} onSignUp={mockSignUp} error={null} />)

		await user.type(screen.getByLabelText(/email/i), 'a@b.com')
		await user.type(screen.getByLabelText(/password/i), '12345678')

		const submit = screen.getByRole('button', { name: /sign in/i })

		await user.click(submit)

		expect(submit).toBeDisabled()
		expect(submit).toHaveAttribute('aria-busy', 'true')
		expect(mockSignIn).toHaveBeenCalledTimes(1)

		signInDef.resolve()

		await screen.findByRole('button', { name: /sign in/i })
		expect(submit).not.toBeDisabled()
	})

	it('clears form error when switching modes', async () => {
		const user = userEvent.setup()

		render(<AuthForm onSignIn={mockSignIn} onSignUp={mockSignUp} error={null} />)

		// Create a validation error
		await user.click(screen.getByRole('button', { name: /Sign In/i }))
		expect(await screen.findByText(/Email and password are required/i)).toBeInTheDocument()

		// Switch to sign up mode
		await user.click(screen.getByText(/Don't have an account/i))

		// Error should be cleared
		expect(screen.queryByText(/Email and password are required/i)).not.toBeInTheDocument()
	})
})
