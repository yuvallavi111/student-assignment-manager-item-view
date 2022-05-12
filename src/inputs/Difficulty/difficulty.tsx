import { Flex, FlexProps } from '@chakra-ui/react'
import { useState } from 'react'
import { theme } from '../../theme'
import { DifficultyBox } from './difficulty-box'

interface IDifficultyProps extends FlexProps {
	value: number
	onChangeHandler: (index: number) => void
}

export const Difficulty = ({ value, onChangeHandler, ...props }: IDifficultyProps) => {
	const [isHover, setIsHover] = useState(false)
	const [hoveredIndex, setHoveredIndex] = useState(0)
	return (
		<Flex {...props} data-id='Difficulty'>
			{theme.diffcultyColors.map((c, i) => {
				return (
					<DifficultyBox
						data-id={`difficulty-box-${i}`}
						key={`difficulty-box-${i}`}
						onHover={() => {
							setIsHover(true)
							setHoveredIndex(i)
						}}
						onUnHover={() => setIsHover(false)}
						color={
							isHover
								? i > hoveredIndex
									? theme.defaultColor
									: theme.diffcultyColors[hoveredIndex]
								: i > value
								? theme.defaultColor
								: theme.diffcultyColors[value]
						}
						onClick={() => onChangeHandler(i)}
					/>
				)
			})}
		</Flex>
	)
}
