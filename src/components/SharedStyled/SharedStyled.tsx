import styled from 'styled-components'

const StyledCard = styled.div`
	background-color: ${props => props.theme.colors.bgPrimary};
	border-radius: ${props => props.theme.borderRadius.xl};
	box-shadow: ${props => props.theme.shadows.lg};
	padding: 1.5rem;
`

export { StyledCard }
