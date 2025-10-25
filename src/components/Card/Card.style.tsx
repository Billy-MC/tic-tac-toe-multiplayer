import styled from 'styled-components'
import { baseTitleStyle } from '../SharedStyle/SharedStyle.style'

const StyledCard = styled.div`
	background-color: ${props => props.theme.colors.bgPrimary};
	border-radius: ${props => props.theme.borderRadius.xl};
	box-shadow: ${props => props.theme.shadows.lg};
	padding: 1.5rem;
`

const CardTitle = styled.h2`
	${baseTitleStyle};
	margin-bottom: 1rem;
`

export { CardTitle, StyledCard }
