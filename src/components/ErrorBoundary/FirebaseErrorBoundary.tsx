import type { FC, ReactNode } from 'react'

import ErrorBoundary from './ErrorBoundary'
import {
	ButtonContainer,
	ErrorCard,
	ErrorContainer,
	ErrorContent,
	ErrorList,
	ErrorListItem,
	ErrorMessage,
	ErrorTitle,
	StyledButton,
	TipBox,
} from './ErrorBoundary.style'

interface FirebaseErrorBoundaryProps {
	children: ReactNode
	onRetry?: () => void
}

const FirebaseErrorFallback: FC<{ onRetry?: () => void }> = ({ onRetry }) => {
	return (
		<ErrorContainer>
			<ErrorCard>
				<ErrorContent>
					<ErrorTitle>Connection Error</ErrorTitle>
					<ErrorMessage>
						Unable to connect to the game server, this might be due to:
					</ErrorMessage>

					<ErrorList>
						<ErrorListItem>Internet connection issues</ErrorListItem>
						<ErrorListItem>Firebase configuration errors</ErrorListItem>
						<ErrorListItem>Server maintenance</ErrorListItem>
					</ErrorList>

					<ButtonContainer>
						{onRetry && <StyledButton onClick={onRetry}>Retry Connection</StyledButton>}
						<StyledButton onClick={() => window.location.reload()}>
							Reload Page
						</StyledButton>
					</ButtonContainer>
					<TipBox>Check your internet connection and Firebase configuration</TipBox>
				</ErrorContent>
			</ErrorCard>
		</ErrorContainer>
	)
}

const FirebaseErrorBoundary: FC<FirebaseErrorBoundaryProps> = ({ children, onRetry }) => {
	return (
		<ErrorBoundary fallback={<FirebaseErrorFallback onRetry={onRetry} />} onReset={onRetry}>
			{children}
		</ErrorBoundary>
	)
}

export default FirebaseErrorBoundary
