import styled, { keyframes } from 'styled-components'
const AppContainer = styled.div`
	min-height: 100vh;
	background: linear-gradient(
		to bottom right,
		${props => props.theme.colors.bgGradientFrom},
		${props => props.theme.colors.bgGradientTo}
	);
	padding: 1rem;
`

const Container = styled.div`
	max-width: 72rem;
	margin: 0 auto;
`

const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 2rem;
	background-color: ${props => props.theme.colors.bgPrimary};
	border-radius: ${props => props.theme.borderRadius.xl};
	box-shadow: ${props => props.theme.shadows.lg};
	padding: 1.5rem;
`

const Title = styled.h1`
	font-size: ${props => props.theme.fontSize['2xl']};
	font-weight: ${props => props.theme.fontWeight.bold};
	color: ${props => props.theme.colors.textPrimary};
`

const Subtitle = styled.p`
	color: ${props => props.theme.colors.textSecondary};
`

const Main = styled.main`
	display: flex;
	justify-content: center;
	align-items: flex-start;
`

const LoadingContainer = styled.div`
	min-height: 100vh;
	background: linear-gradient(
		to bottom right,
		${props => props.theme.colors.bgGradientFrom},
		${props => props.theme.colors.bgGradientTo}
	);
	display: flex;
	align-items: center;
	justify-content: center;
`

const LoadingContent = styled.div`
	text-align: center;
`

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
	animation: ${spin} 1s linear infinite;
	border-radius: ${props => props.theme.borderRadius.full};
	height: 4rem;
	width: 4rem;
	border-bottom: 4px solid ${props => props.theme.colors.primary};
	margin: 0 auto 1rem;
`

const LoadingText = styled.p`
	color: ${props => props.theme.colors.textSecondary};
	font-size: ${props => props.theme.fontSize.lg};
`

const AuthContainer = styled.div`
	min-height: 100vh;
	background: linear-gradient(
		to bottom right,
		${props => props.theme.colors.bgGradientFrom},
		${props => props.theme.colors.bgGradientTo}
	);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;
`

export {
	AppContainer,
	Container,
	Header,
	Title,
	Subtitle,
	Main,
	LoadingContainer,
	LoadingContent,
	Spinner,
	LoadingText,
	AuthContainer,
}
