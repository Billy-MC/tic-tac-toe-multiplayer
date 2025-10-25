import { FC, InputHTMLAttributes, useId } from 'react'

import { ErrorMessage, InputWrapper, Label, StyledInput } from './Input.style'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	id?: string
	label?: string
	error?: string
}

const Input: FC<InputProps> = ({ label, error, id, ...props }) => {
	const autoId = useId()
	const inputId = label ? (id ?? `input-${autoId}`) : id
	const errorId = inputId ? `${inputId}-error` : undefined

	return (
		<InputWrapper>
			{label && <Label htmlFor={inputId}>{label}</Label>}
			<StyledInput
				id={inputId}
				$hasError={!!error}
				aria-invalid={error ? 'true' : undefined}
				aria-describedby={error ? errorId : undefined}
				{...props}
			/>
			{error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
		</InputWrapper>
	)
}

export default Input
