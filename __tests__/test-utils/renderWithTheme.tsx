import type { ReactElement, ReactNode } from 'react'
import { render as rtlRender } from '@testing-library/react'
import type { RenderOptions, RenderResult } from '@testing-library/react'

import { ThemeProvider, type DefaultTheme } from 'styled-components'
import { theme as baseTheme } from '@/styles/theme'

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
	theme?: DefaultTheme
}

export function renderWithTheme(ui: ReactElement, options: CustomRenderOptions = {}): RenderResult {
	const { theme = baseTheme, ...renderOptions } = options

	const Wrapper = ({ children }: { children: ReactNode }) => (
		<ThemeProvider theme={theme}>{children}</ThemeProvider>
	)

	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export { renderWithTheme as render }
