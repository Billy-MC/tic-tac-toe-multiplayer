import type { FC, ReactNode } from 'react'

import { CardTitle, StyledCard } from './Card.style'

const Card: FC<{ title?: string; children: ReactNode }> = ({ title, children }) => {
	return (
		<StyledCard>
			{title && <CardTitle>{title}</CardTitle>}
			{children}
		</StyledCard>
	)
}

export default Card
