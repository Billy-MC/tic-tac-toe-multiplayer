import { render, screen } from '../test-utils'
import { describe, it, expect, vi } from 'vitest'
import type { JSX } from 'react'
import { ErrorBoundary } from '../../src/components/ErrorBoundary'

const BuggyComponent = (): JSX.Element => {
	throw new Error('Boom')
}

describe('ErrorBoundary', () => {
	it('renders fallback UI when child throws', () => {
		const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
		try {
			render(
				<ErrorBoundary fallback={<div data-testid="fallback">Fallback UI</div>}>
					<BuggyComponent />
				</ErrorBoundary>
			)
			expect(screen.getByTestId('fallback')).not.toBeNull()
		} finally {
			spy.mockRestore()
		}
	})
})
