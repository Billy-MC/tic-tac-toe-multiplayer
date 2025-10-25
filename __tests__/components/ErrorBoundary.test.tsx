import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import type { JSX } from 'react'
import { ErrorBoundary } from '../../src/components/ErrorBoundary'

const BuggyComponent = (): JSX.Element => {
	throw new Error('Boom')
}

describe('ErrorBoundary', () => {
	it('renders fallback UI when child throws', () => {
		render(
			<ErrorBoundary fallback={<div data-testid="fallback">Fallback UI</div>}>
				<BuggyComponent />
			</ErrorBoundary>
		)
		expect(screen.getByTestId('fallback')).not.toBeNull()
	})
})
