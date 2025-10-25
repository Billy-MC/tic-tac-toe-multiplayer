import styled from 'styled-components'
import { baseTitleStyle } from '@/components/SharedStyled/mixin'
import { StyledCard } from '@/components/SharedStyled/SharedStyled'

const CardTitle = styled.h2`
	${baseTitleStyle};
	margin-bottom: 1rem;
`

export { CardTitle, StyledCard }
