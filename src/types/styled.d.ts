import 'styled-components'
import type { Theme } from '@/styles/theme'

// Extend styled-components’ built-in DefaultTheme.
declare module 'styled-components' {
	export interface DefaultTheme extends Theme {}
}
