import { Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { DifficultyBox } from './difficulty-box'
import { diffcultyColors } from './difficulty-colors'

interface IDifficultyProps {
	value: number
	onChange: (index: number) => void
}

export const Difficulty = ({ value, onChange }: IDifficultyProps) => {
	const [isHover, setIsHover] = useState(false)
	const [hoveredIndex, setHoveredIndex] = useState(0)
	return (
		<Flex>
			{diffcultyColors.difficulties.map((c, i) => {
				return (
					<DifficultyBox
						key={`difficulty-box-${i}`}
						onHover={() => {
							setIsHover(true)
							setHoveredIndex(i)
						}}
						onUnHover={() => setIsHover(false)}
						color={
							isHover
								? i > hoveredIndex
									? diffcultyColors.defaultColor
									: diffcultyColors.difficulties[hoveredIndex]
								: i > value
								? diffcultyColors.defaultColor
								: diffcultyColors.difficulties[hoveredIndex]
						}
						onClick={() => onChange(i)}
					/>
				)
			})}
		</Flex>
	)
}
