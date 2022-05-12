import { Box, Grid } from '@chakra-ui/react'
import { useState } from 'react'
import { useHandler } from 'react-handler-hooks'
import { Difficulty } from './inputs/Difficulty/difficulty'
// import mondaySdk from 'monday-sdk-js'
// const monday = mondaySdk()

const App = () => {
	const [difficultyValue, setDifficultyValue] = useState(-1)
	const onDifficultyChanged = useHandler((index: number) => {
		setDifficultyValue(index)
	})
	return (
		<Grid w='600px' h='650px' border={'solid'} templateRows='450px 2'>
			<Difficulty value={difficultyValue} onChange={onDifficultyChanged} />
		</Grid>
	)
}

export default App
