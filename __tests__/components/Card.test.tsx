/// <reference types="@testing-library/jest-dom" />

import { describe, it, expect } from 'vitest'
import { render, screen } from '../test-utils'
import Card from '../../src/components/Card'

describe('Card Component', () => {
	it('renders children correctly', () => {
		render(
			<Card>
				<div>Test Content</div>
			</Card>
		)

		expect(screen.getByText('Test Content')).toBeInTheDocument()
	})

	it('renders multiple children', () => {
		render(
			<Card>
				<h1>Title</h1>
				<p>Description</p>
			</Card>
		)

		expect(screen.getByText('Title')).toBeInTheDocument()
		expect(screen.getByText('Description')).toBeInTheDocument()
	})

	it('renders nested components', () => {
		render(
			<Card>
				<div>
					<span>Nested</span>
					<span>Content</span>
				</div>
			</Card>
		)

		expect(screen.getByText('Nested')).toBeInTheDocument()
		expect(screen.getByText('Content')).toBeInTheDocument()
	})

	it('can contain interactive elements', () => {
		render(
			<Card>
				<button>Click me</button>
				<input type="text" placeholder="Type here" />
			</Card>
		)

		expect(screen.getByRole('button')).toBeInTheDocument()
		expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument()
	})

	it('renders with complex content structure', () => {
		render(
			<Card>
				<header>
					<h1>Header</h1>
				</header>
				<main>
					<p>Main content</p>
				</main>
				<footer>
					<p>Footer</p>
				</footer>
			</Card>
		)

		expect(screen.getByText('Header')).toBeInTheDocument()
		expect(screen.getByText('Main content')).toBeInTheDocument()
		expect(screen.getByText('Footer')).toBeInTheDocument()
	})
})
