import { FC, useActionState, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'
import Input from '@/components/Input'
import {
	ErrorMessage,
	Footer,
	Form,
	FormContainer,
	FullWidthButton,
	Header,
	Subtitle,
	Title,
	ToggleButton,
} from './AuthForm.style'

interface AuthFormProps {
	onSignIn: (email: string, password: string) => Promise<void>
	onSignUp: (email: string, password: string, displayName: string) => Promise<void>
	error: string | null
}

const SubmitButton: FC<{ children: React.ReactNode }> = ({ children }) => {
	const { pending } = useFormStatus()
	return (
		<FullWidthButton
			type="submit"
			size="lg"
			isLoading={pending}
			disabled={pending}
			aria-busy={pending}
		>
			{children}
		</FullWidthButton>
	)
}

const AuthForm: FC<AuthFormProps> = ({ onSignIn, onSignUp, error: externalError }) => {
	const [isSignUp, setIsSignUp] = useState(true)
	const [formKey, setFormKey] = useState(0)
	const formRef = useRef<HTMLFormElement>(null)

	const [state, formAction, isPending] = useActionState(
		async (_prev: { error: string | null }, formData: FormData) => {
			const email = String(formData.get('email') || '')
			const password = String(formData.get('password') || '')
			const displayName = String(formData.get('displayName') || '')
			const mode = String(formData.get('mode') || 'signin')

			if (!email || !password) return { error: 'Email and password are required.' }
			if (mode === 'signup' && !displayName)
				return { error: 'Display name is required for sign up.' }
			if (password.length < 8)
				return { error: 'Password must be at least 8 characters long.' }

			try {
				if (mode === 'signup') await onSignUp(email, password, displayName)
				else await onSignIn(email, password)
				return { error: null } //Success
			} catch (_error: unknown) {
				return { error: 'Sign in/up failed. Please try again.' }
			}
		},
		{ error: null }
	)

	const toggleMode = () => {
		setIsSignUp(!isSignUp)
		formRef.current?.reset()
		setFormKey(k => k + 1)
	}

	return (
		<FormContainer>
			<Header>
				<Title>Tic Tac Toe</Title>
				<Subtitle>
					{isSignUp ? 'Create an account to play' : 'Sign in to start playing'}
				</Subtitle>
			</Header>

			<Form key={formKey} ref={formRef} method="post" action={formAction}>
				{isSignUp && (
					<Input
						name="displayName"
						label="Display Name"
						type="text"
						placeholder="Enter your name"
						disabled={isPending}
						autoComplete="name"
						required
					/>
				)}

				<Input
					name="email"
					label="Email"
					type="email"
					placeholder="Enter your email"
					disabled={isPending}
					autoComplete="email"
					required
				/>

				<Input
					name="password"
					label="Password"
					type="password"
					placeholder="Enter your password"
					disabled={isPending}
					autoComplete={isSignUp ? 'new-password' : 'current-password'}
					required
				/>

				<input type="hidden" name="mode" value={isSignUp ? 'signup' : 'signin'} />

				{(state.error || externalError) && (
					<ErrorMessage>{state.error || externalError}</ErrorMessage>
				)}

				<SubmitButton>{isSignUp ? 'Sign Up' : 'Sign In'}</SubmitButton>
			</Form>

			<Footer>
				<ToggleButton type="button" onClick={toggleMode}>
					{isSignUp
						? 'Already have an account? Sign In'
						: "Don't have an account? Sign Up"}
				</ToggleButton>
			</Footer>
		</FormContainer>
	)
}

export default AuthForm
