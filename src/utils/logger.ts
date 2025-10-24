const isDev = import.meta.env.MODE === 'development'

export const logger = {
	info: (...args: unknown[]) => {
		if (isDev) console.info('[INFO]', ...args)
	},
	warn: (...args: unknown[]) => {
		console.warn('[WARN]', ...args)
	},
	error: (...args: unknown[]) => {
		console.error('[ERROR]', ...args)
	},
}
