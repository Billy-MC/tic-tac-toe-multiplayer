const isDevOrTest = ['development', 'test'].includes(import.meta.env.MODE)

export const logger = {
	info: (...args: unknown[]) => {
		if (isDevOrTest) console.info('[INFO]', ...args)
	},
	warn: (...args: unknown[]) => {
		console.warn('[WARN]', ...args)
	},
	error: (...args: unknown[]) => {
		console.error('[ERROR]', ...args)
	},
}
