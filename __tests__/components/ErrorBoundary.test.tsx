/// <reference types="@testing-library/jest-dom" />

import { render, screen, within } from '../test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { ErrorBoundary } from '../../src/components/ErrorBoundary'

vi.mock('../../src/utils/logger', () => ({
	logger: { error: vi.fn() },
}))
import { logger } from '../../src/utils/logger'

const AlwaysBuggy: React.FC = () => {
	throw new Error('Boom')
}

const muteConsoleError = () => vi.spyOn(console, 'error').mockImplementation(() => {})

const stubReload = () => {
	const original = window.location
	const reload = vi.fn()
	Object.defineProperty(window, 'location', {
		configurable: true,
		value: { ...original, reload },
	})
	return {
		reload,
		restore: () =>
			Object.defineProperty(window, 'location', { configurable: true, value: original }),
	}
}
describe('ErrorBoundary (default fallback path)', () => {
	let consoleSpy: ReturnType<typeof muteConsoleError>

	beforeEach(() => {
		consoleSpy = muteConsoleError()
		vi.clearAllMocks()
	})

	afterEach(() => {
		consoleSpy.mockRestore()
	})

	it('renders built-in fallback UI (no custom fallback) and shows DEV details', () => {
		render(
			<ErrorBoundary>
				<AlwaysBuggy />
			</ErrorBoundary>
		)

		expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()
		expect(
			screen.getByText(/The application encountered an unexpected error/i)
		).toBeInTheDocument()

		expect(screen.getByText(/Error Details \(Development Only\)/i)).toBeInTheDocument()

		const details = screen.getByText(/Error Details \(Development Only\)/i).closest('details')!
		expect(within(details).getByText(/Error: Boom/)).toBeInTheDocument()

		expect(logger.error).toHaveBeenCalledTimes(1)
		expect(logger.error).toHaveBeenCalledWith(
			expect.stringMatching(/Uncaught error/),
			expect.any(Error),
			expect.objectContaining({ componentStack: expect.any(String) })
		)
	})

	it('clicking "Try Again" resets boundary and calls onReset', async () => {
		const user = userEvent.setup()

		let shouldThrow = true
		const ThrowUntilReset: React.FC = () => {
			if (shouldThrow) throw new Error('Boom')
			return <div>Recovered</div>
		}

		const onReset = vi.fn(() => {
			shouldThrow = false
		})

		render(
			<ErrorBoundary onReset={onReset}>
				<ThrowUntilReset />
			</ErrorBoundary>
		)

		expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument()

		await user.click(screen.getByRole('button', { name: /Try Again/i }))

		expect(onReset).toHaveBeenCalledTimes(1)
		expect(screen.getByText('Recovered')).toBeInTheDocument()
	})

	it('clicking "Reload Page" triggers window.location.reload', async () => {
		const user = userEvent.setup()
		const { reload, restore } = stubReload()

		try {
			render(
				<ErrorBoundary>
					<AlwaysBuggy />
				</ErrorBoundary>
			)

			const reloadBtn = screen.getByRole('button', { name: /Reload Page/i })
			await user.click(reloadBtn)

			expect(reload).toHaveBeenCalledTimes(1)
		} finally {
			restore()
		}
	})
})
