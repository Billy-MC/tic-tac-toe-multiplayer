import type { ErrorInfo, ReactNode } from 'react'

import { Component } from 'react'

import { logger } from '@/utils/logger'
import {
	ErrorContainer,
	ErrorCard,
	ErrorContent,
	ErrorIcon,
	ErrorTitle,
	ErrorMessage,
	ErrorDetails,
	DetailsToggle,
	DetailsSummary,
	DetailsContent,
	ButtonGroup,
	StyledButton,
	FooterNote,
} from './ErrorBoundary.style'

interface Props {
	children: ReactNode
	fallback?: ReactNode
	onReset?: () => void
}

interface State {
	hasError: boolean
	error: Error | null
	errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		}
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error, errorInfo: null }
	}

	override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		this.setState({ error, errorInfo })
		logger.error('Uncaught error:', error, errorInfo)
	}

	handleReset = (): void => {
		this.setState({ hasError: false, error: null, errorInfo: null })
		this.props.onReset?.()
	}

	override render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback
			}
			return (
				<ErrorContainer>
					<ErrorCard>
						<ErrorContent>
							<ErrorIcon>😔</ErrorIcon>
							<ErrorTitle>Oops! Something went wrong</ErrorTitle>
							<ErrorMessage>
								We're sorry for the inconvenience. The application encountered an
								unexpected error.
							</ErrorMessage>

							{import.meta.env.DEV && this.state.error && (
								<ErrorDetails>
									<DetailsToggle>
										<DetailsSummary>
											Error Details (Development Only)
										</DetailsSummary>
										<DetailsContent>
											<div>
												<strong>Error:</strong>
												<pre>{this.state.error.toString()}</pre>
											</div>
											{this.state.errorInfo && (
												<div>
													<strong>Component Stack:</strong>
													<pre>{this.state.errorInfo.componentStack}</pre>
												</div>
											)}
										</DetailsContent>
									</DetailsToggle>
								</ErrorDetails>
							)}

							<ButtonGroup>
								<StyledButton onClick={this.handleReset}>Try Again</StyledButton>
								<StyledButton
									onClick={() => window.location.reload()}
									$variant="secondary"
								>
									Reload Page
								</StyledButton>
							</ButtonGroup>

							<FooterNote>
								If the problem persists, please contact support or try again later.
							</FooterNote>
						</ErrorContent>
					</ErrorCard>
				</ErrorContainer>
			)
		}
		return this.props.children
	}
}

export default ErrorBoundary
