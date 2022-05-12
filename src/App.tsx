import { Box, Button, Grid } from '@chakra-ui/react'
import { useState } from 'react'
import { useHandler } from 'react-handler-hooks'
import { ItemDetails } from './details/ItemDetails'
import { Difficulty } from './inputs/Difficulty/difficulty'
import { FileInput } from './inputs/file-input'
import { Time } from './inputs/Time/time'
import { theme } from './theme'
// import mondaySdk from 'monday-sdk-js'
// const monday = mondaySdk()

const App = () => {
	const [difficultyValue, setDifficultyValue] = useState(-1)
	const onDifficultyChanged = useHandler((index: number) => {
		setDifficultyValue(index)
	})
	return (
		<Box
			data-id='App'
			w='600px'
			h='650px'
			border={'solid'}
			pos='relative'
			backgroundColor={'#1f2136'}
		>
			<ItemDetails
				left='15px'
				top='15px'
				pos='absolute'
				dueDate='14.05.22 at 14:00'
				title='Assignment1'
			/>

			<FileInput left='15px' top='200px' pos='absolute' />
			<Grid
				bottom='15px'
				left='15px'
				pos='absolute'
				width='300px'
				height='40px'
				templateColumns='1fr 1fr'
				gap={4}
			>
				<Difficulty value={difficultyValue} onChangeHandler={onDifficultyChanged} />
				<Time value={difficultyValue} onChangeHandler={onDifficultyChanged} />
			</Grid>
			<Box
				height='40px'
				width='80px'
				bottom='15px'
				right='15px'
				pos='absolute'
				borderRadius='4px'
				color='black'
				fontWeight='500'
				fontSize='20px'
				lineHeight='40px'
				textAlign='center'
				backgroundColor={theme.defaultColor}
			>
				Send!
			</Box>
		</Box>
	)
}

export default App
