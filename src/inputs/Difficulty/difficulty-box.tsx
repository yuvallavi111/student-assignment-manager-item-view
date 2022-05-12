import { Box } from '@chakra-ui/react'

interface IDifficultyBoxProps {
	color: string
	onHover: () => void
	onUnHover: () => void
	onClick: () => void
}

export const DifficultyBox = ({ color, onHover, onUnHover, onClick }: IDifficultyBoxProps) => {
	return (
		<Box
			w='25px'
			h='100%'
			mr='1px'
			cursor='pointer'
			backgroundColor={color}
			onMouseEnter={onHover}
			onMouseLeave={onUnHover}
			onClick={onClick}
		/>
	)
}
