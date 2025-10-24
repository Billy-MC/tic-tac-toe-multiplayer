export const theme = {
	colors: {
		// Primary colors
		primary: '#2563eb',
		primaryHover: '#1d4ed8',
		primaryLight: '#eff6ff',
		primaryDark: '#1e40af',

		// Secondary colors
		secondary: '#4b5563',
		secondaryHover: '#374151',
		secondaryLight: '#f3f4f6',

		// Danger colors
		danger: '#dc2626',
		dangerHover: '#b91c1c',
		dangerLight: '#fef2f2',

		// Success colors
		success: '#16a34a',
		successLight: '#f0fdf4',

		// Warning colors
		warning: '#eab308',
		warningLight: '#fefce8',

		// Text colors
		textPrimary: '#1f2937',
		textSecondary: '#6b7280',
		textLight: '#9ca3af',

		// Background colors
		bgPrimary: '#ffffff',
		bgSecondary: '#f9fafb',
		bgGradientFrom: '#eff6ff',
		bgGradientTo: '#faf5ff',

		// Border colors
		border: '#d1d5db',
		borderLight: '#e5e7eb',
		borderDark: '#9ca3af',

		// Game colors
		playerX: '#2563eb',
		playerO: '#dc2626',

		// Status colors
		yellow: '#eab308',
		green: '#16a34a',
		red: '#dc2626',
		blue: '#2563eb',
	},

	shadows: {
		sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
		md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
		lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
		xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
	},

	borderRadius: {
		sm: '0.25rem',
		md: '0.5rem',
		lg: '0.75rem',
		xl: '1rem',
		full: '9999px',
	},

	spacing: {
		xs: '0.25rem',
		sm: '0.5rem',
		md: '1rem',
		lg: '1.5rem',
		xl: '2rem',
		'2xl': '3rem',
		'3xl': '4rem',
	},

	fontSize: {
		xs: '0.75rem',
		sm: '0.875rem',
		base: '1rem',
		lg: '1.125rem',
		xl: '1.25rem',
		'2xl': '1.5rem',
		'3xl': '1.875rem',
		'4xl': '2.25rem',
		'5xl': '3rem',
		'6xl': '3.75rem',
	},

	fontWeight: {
		normal: 400,
		medium: 500,
		semibold: 600,
		bold: 700,
	},

	transitions: {
		fast: '150ms ease-in-out',
		normal: '200ms ease-in-out',
		slow: '300ms ease-in-out',
	},

	breakpoints: {
		sm: '640px',
		md: '768px',
		lg: '1024px',
		xl: '1280px',
	},
} as const

export type Theme = typeof theme
