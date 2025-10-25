import styled from 'styled-components'

const BoardGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 0.75rem;
	width: 100%;
	max-width: 28rem;
	margin: 0 auto;
`

export { BoardGrid }
