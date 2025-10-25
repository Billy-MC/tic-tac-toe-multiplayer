import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'

import App from '@/App'
import { theme } from '@/styles/theme'
import { GlobalStyles } from '@/styles/GlobalStyles'
import { ErrorBoundary } from './components/ErrorBoundary/index'
const container = document.getElementById('root')
if (!container) {
	throw new Error('Root container "#root" not found')
}

createRoot(container).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<ErrorBoundary>
				<App />
			</ErrorBoundary>
		</ThemeProvider>
	</StrictMode>
)
