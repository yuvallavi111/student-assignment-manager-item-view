import { Box, Button, Grid } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { useHandler } from 'react-handler-hooks'
import { ItemDetails } from './details/ItemDetails'
import { Difficulty } from './inputs/Difficulty/difficulty'
import { FileInput } from './inputs/file-input'
import { ITime, Time } from './inputs/Time/time'
import { theme } from './theme'
import mondaySdk from 'monday-sdk-js'
import fetch from 'cross-fetch'

const monday = mondaySdk()
interface IItemDetails {
	name: string
	column_values: [{ title: string; text: string; id: string }]
}
const App = () => {
	const [itemId, setItemId] = useState(0)
	const [boardId, setBoardId] = useState(0)
	const [difficultyValue, setDifficultyValue] = useState(-1)
	const [timeValue, setTimeValue] = useState<ITime>({ hours: 0, minutes: 0 })
	const [itemDetails, setItemDetails] = useState<IItemDetails>()

	const mutateColumn = useHandler((columnId: string, value: string) => {
		const query = `mutation {change_simple_column_value (board_id: ${boardId}, item_id: ${itemId}, column_id: ${columnId}, value: ${value}) {id}}`

		fetch('https://api.monday.com/v2', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE2MDMwNDMxMSwidWlkIjoyOTk1NzUwOCwiaWFkIjoiMjAyMi0wNS0xMlQxOTo1MToxNS4wMTJaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTE4NzU5MjIsInJnbiI6InVzZTEifQ.kc5XsEklOx116dzWk_RajsxSgVObTxc3HQn9L4z4USw',
			},
			body: JSON.stringify({
				query,
				client_id: '80341bbdfd347ac503bb1f82a255e9bd',
				client_token:
					'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODM5MTk0OTgsImRhdCI6eyJjbGllbnRfaWQiOiI4MDM0MWJiZGZkMzQ3YWM1MDNiYjFmODJhMjU1ZTliZCIsInVzZXJfaWQiOjI5OTU3NTA4LCJhY2NvdW50X2lkIjoxMTg3NTkyMiwic2x1ZyI6Im1vbmRheS10bHYtaGFja2F0aG9uIiwiYXBwX2lkIjoxMDAyNjcxOSwiYXBwX3ZlcnNpb25faWQiOjEwMDM3NzU3LCJpbnN0YWxsX2lkIjotMiwiY2FuX3VwZGF0ZSI6dHJ1ZX19.kEIhVrATGBGVjy3vIIGV25lYeK1NgsthPS33mfYH7ZQ',
			}),
		})
	})

	const onDifficultyChanged = useHandler((index: number) => {
		setDifficultyValue(index)
		if (itemId) {
			monday.storage.instance.setItem(`difficulty-${itemId}`, index).then((res) => {
				console.log(res)
			})
		}
	})

	const onTimeChanged = useHandler((time: ITime) => {
		setTimeValue(time)
		if (itemId) {
			monday.storage.instance.setItem(`time-${itemId}`, JSON.stringify(time)).then((res) => {
				console.log(res)
			})
		}
	})

	const isDisabled = useMemo(() => {
		return timeValue.hours + timeValue.minutes === 0 || difficultyValue === -1
	}, [timeValue, difficultyValue])

	useEffect(() => {
		monday.listen('context', (res: any) => {
			setItemId(res.data.itemId)
			setBoardId(res.data.boardId)
			monday
				.api(
					`query ($boardIds: [Int], $itemIds: [Int]) { boards (ids: $boardIds) { name items (ids: $itemIds) { name column_values { title text id } } } }`,
					{ variables: { boardIds: [res.data.boardId], itemIds: [res.data.itemId] } }
				)
				.then((res: any) => {
					setItemDetails(res?.data?.boards?.[0].items?.[0])
				})
		})
	}, [])

	useEffect(() => {
		if (!itemId) {
			return
		}
		monday.storage.instance.getItem(`time-${itemId}`).then((res) => {
			console.log(JSON.parse(res.data.value))
			setTimeValue(JSON.parse(res.data.value) || { hours: 0, minutes: 0 })
		})
		monday.storage.instance.getItem(`difficulty-${itemId}`).then((res) => {
			setDifficultyValue(res.data.value || -1)
		})
	}, [itemId])

	return (
		<Box data-id='App' w='100%' h='100%' pos='relative' backgroundColor={'#00000000'}>
			<ItemDetails
				left='15px'
				top='15px'
				pos='relative'
				dueDate={
					itemDetails?.column_values.find((c) => c.title === 'Due Date')?.text || 'Loading...'
				}
				title={itemDetails?.name || 'Loading...'}
			/>

			<FileInput left='15px' top='130px' pos='relative' />
			{isDisabled && (
				<Box color={theme.defaultColor} pos='relative' top='180px' left='15px'>
					Please Set the time it took you to finish the assignment, and how difficult it was in
					order to submit.
				</Box>
			)}
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
				<Time value={timeValue} onChangeHandler={onTimeChanged} />
			</Grid>
			<Button
				cursor={isDisabled ? 'not-allowed' : 'pointer'}
				height='40px'
				width='80px'
				bottom='15px'
				right='15px'
				isDisabled={isDisabled}
				pos='absolute'
				borderRadius='4px'
				color={isDisabled ? theme.activeColor : 'black'}
				fontWeight='500'
				fontSize='20px'
				lineHeight='40px'
				textAlign='center'
				backgroundColor={isDisabled ? theme.disabledColor : theme.defaultColor}
				_active={{ bg: theme.activeColor }}
				border='none'
				onClick={() => {
					monday.execute('notice', {
						message: 'Submitted successfully',
						type: 'success',
						timeout: 2000,
					})
				}}
			>
				Submit!
			</Button>
		</Box>
	)
}

export default App
