import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { Spinner, StyledButton } from './Button.style'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'danger'
	size?: 'sm' | 'md' | 'lg'
	isLoading?: boolean
	children: ReactNode
}

const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	size = 'md',
	children,
	isLoading = false,
	disabled,
	...props
}) => {
	return (
		<StyledButton
			$variant={variant}
			$size={size}
			$isLoading={isLoading}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading ? (
				<>
					<Spinner />
					<p>Loading...</p>
				</>
			) : (
				children
			)}
		</StyledButton>
	)
}

export default Button

export type { ButtonProps }
