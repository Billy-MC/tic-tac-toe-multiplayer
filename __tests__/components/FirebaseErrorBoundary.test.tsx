import { describe, it, expect, vi } from 'vitest'
import type { JSX } from 'react'
import { screen } from '@testing-library/react'
import { render } from '../test-utils'
import { FirebaseErrorBoundary } from '../../src/components/ErrorBoundary'
import { beforeAll } from 'vitest'

const Buggy: React.FC = (): JSX.Element => {
	throw new Error('Boom')
}

const setupReloadSpy = () => {
	// JSDOM's location is not directly writable; re-define with a spy-able reload
	const original = window.location
	const reload = vi.fn()
	Object.defineProperty(window, 'location', {
		configurable: true,
		value: { ...original, reload },
	})
	return {
		restore: () =>
			Object.defineProperty(window, 'location', { configurable: true, value: original }),
		reload,
	}
}

describe('FirebaseErrorBoundary', () => {
	beforeAll(() => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
	})

	it('renders children when no error occurs', () => {
		render(
			<FirebaseErrorBoundary>
				<div>OK</div>
			</FirebaseErrorBoundary>
		)

		expect(screen.getByText('OK')).toBeInTheDocument()
	})

	it('renders Firebase fallback UI when a child throws (with onRetry)', async () => {
		const onRetry = vi.fn()

		render(
			<FirebaseErrorBoundary onRetry={onRetry}>
				<Buggy />
			</FirebaseErrorBoundary>
		)

		// Headline and message
		expect(screen.getByText('Connection Error')).toBeInTheDocument()
		expect(screen.getByText(/Unable to connect to the game server/i)).toBeInTheDocument()

		// Bullet items
		expect(screen.getByText('Internet connection issues')).toBeInTheDocument()
		expect(screen.getByText('Firebase configuration errors')).toBeInTheDocument()
		expect(screen.getByText('Server maintenance')).toBeInTheDocument()

		// Buttons exist
		const retryBtn = screen.getByRole('button', { name: /Retry Connection/i })
		const reloadBtn = screen.getByRole('button', { name: /Reload Page/i })
		expect(retryBtn).toBeInTheDocument()
		expect(reloadBtn).toBeInTheDocument()

		// Clicking Retry calls onRetry
		retryBtn.click()
		expect(onRetry).toHaveBeenCalledTimes(1)

		// Clicking Reload triggers window.location.reload
		const { reload, restore } = setupReloadSpy()
		try {
			reloadBtn.click()
			expect(reload).toHaveBeenCalledTimes(1)
		} finally {
			restore()
		}

		// Tip
		expect(
			screen.getByText(/Check your internet connection and Firebase configuration/i)
		).toBeInTheDocument()
	})

	it('renders fallback without Retry button when onRetry is not provided', () => {
		render(
			<FirebaseErrorBoundary>
				<Buggy />
			</FirebaseErrorBoundary>
		)

		expect(screen.queryByRole('button', { name: /Retry Connection/i })).toBeNull()
		expect(screen.getByRole('button', { name: /Reload Page/i })).toBeInTheDocument()
	})
})
