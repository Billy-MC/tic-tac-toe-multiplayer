/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, vi, beforeEach, afterEach, MockInstance } from 'vitest'

describe('logger', () => {
	let infoSpy: MockInstance
	let warnSpy: MockInstance
	let errorSpy: MockInstance

	beforeEach(() => {
		infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})
		warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
		errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('logs info only in development mode', async () => {
		vi.resetModules()
		const { logger } = await import('../../src/utils/logger')

		logger.info('dev info')
		expect(infoSpy).toHaveBeenCalledWith('[INFO]', 'dev info')
	})

	it('does not log info in production mode', async () => {
		vi.resetModules()
		vi.stubEnv('MODE', 'production')
		const { logger } = await import('../../src/utils/logger')

		logger.info('prod info')
		expect(infoSpy).not.toHaveBeenCalled()
	})

	it('always logs warnings with correct prefix', async () => {
		vi.resetModules()
		const { logger } = await import('../../src/utils/logger')

		logger.warn('test warning', 123)
		expect(warnSpy).toHaveBeenCalledWith('[WARN]', 'test warning', 123)
	})

	it('always logs errors with correct prefix', async () => {
		vi.resetModules()
		const { logger } = await import('../../src/utils/logger')

		const err = new Error('boom')
		logger.error('failed', err)
		expect(errorSpy).toHaveBeenCalledWith('[ERROR]', 'failed', err)
	})
})
