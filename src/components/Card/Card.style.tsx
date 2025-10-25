import styled from 'styled-components'
import { baseTitleStyle } from '../SharedStyled/mixin'
import { StyledCard } from '../SharedStyled/SharedStyled'

const CardTitle = styled.h2`
	${baseTitleStyle};
	margin-bottom: 1rem;
`

export { CardTitle, StyledCard }
