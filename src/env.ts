import { z } from 'zod'

const EnvSchema = z
	.object({
		VITE_FIREBASE_API_KEY: z.string().min(1, 'VITE_FIREBASE_API_KEY is required'),
		VITE_FIREBASE_AUTH_DOMAIN: z.string().min(1, 'VITE_FIREBASE_AUTH_DOMAIN is required'),
		VITE_FIREBASE_DATABASE_URL: z
			.string()
			.url('VITE_FIREBASE_DATABASE_URL must be a valid URL')
			.optional()
			.or(z.literal('')),
		VITE_FIREBASE_PROJECT_ID: z.string().min(1, 'VITE_FIREBASE_PROJECT_ID is required'),
		VITE_FIREBASE_STORAGE_BUCKET: z.string().min(1).optional(),
		VITE_FIREBASE_MESSAGING_SENDER_ID: z
			.string()
			.min(1, 'VITE_FIREBASE_MESSAGING_SENDER_ID is required'),
		VITE_FIREBASE_APP_ID: z.string().min(1, 'VITE_FIREBASE_APP_ID is required'),
		VITE_MEASUREMENT_ID: z.string().min(1, 'VITE_MEASUREMENT_ID is required'),

		MODE: z.string().optional(),
		DEV: z.boolean().optional(),
		PROD: z.boolean().optional(),
		BASE: z.string().optional(),
	})
	.strict()

const raw = {
	VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
	VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	VITE_FIREBASE_DATABASE_URL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
	VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
	VITE_MEASUREMENT_ID: import.meta.env.VITE_MEASUREMENT_ID,
	MODE: import.meta.env.MODE,
	DEV: import.meta.env.DEV,
	PROD: import.meta.env.PROD,
	BASE: import.meta.env.BASE,
}

const parsed = EnvSchema.safeParse(raw)

if (!parsed.success) {
	const details = JSON.stringify(parsed.error.format(), null, 2)
	throw new Error(
		import.meta.env.PROD
			? 'Environment variables are invalid. Please check your deployment configuration.'
			: `Invalid environment variables:\n${details}`
	)
}

export const ENV = parsed.data
