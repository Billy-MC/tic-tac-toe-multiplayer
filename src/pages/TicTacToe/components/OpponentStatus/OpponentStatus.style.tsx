import styled from 'styled-components'

import type { OpponentStatus as Status } from '@/types/ticTacToe'

const StatusContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 12px 20px;
	background: ${props => props.theme.colors.bgPrimary};
	border: 1px solid ${props => props.theme.colors.border};
	border-radius: 12px;
	margin-bottom: 20px;
`

const StatusDot = styled.div<{ $status: Status }>`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	flex-shrink: 0;
	background: ${props => {
		switch (props.$status) {
			case 'online':
				return props.theme.colors.success
			case 'offline':
				return props.theme.colors.danger
			default:
				return props.theme.colors.textSecondary
		}
	}};

	${props =>
		props.$status === 'online' &&
		`
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  `}
`

const StatusText = styled.span`
	font-size: 14px;
	font-weight: 500;
	color: ${props => props.theme.colors.textPrimary};
	line-height: 1;
`
export { StatusContainer, StatusDot, StatusText }
