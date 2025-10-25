import { FC, InputHTMLAttributes } from 'react'

import { ErrorMessage, InputWrapper, Label, StyledInput } from './Input.style'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	id?: string
	label?: string
	error?: string
}

const Input: FC<InputProps> = ({ label, error, id, ...props }) => {
	return (
		<InputWrapper>
			{label && <Label htmlFor={id}>{label}</Label>}
			<StyledInput id={id} $hasError={!!error} {...props} />
			{error && <ErrorMessage>{error}</ErrorMessage>}
		</InputWrapper>
	)
}

export default Input
