import { Grid, Input, GridProps, Box, InputProps } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { theme } from '../../theme'

interface ITimeProps extends GridProps {
	value: number
	onChangeHandler: (timeInMinutes: number) => void
}

export const Time = ({ value, onChangeHandler, ...props }: ITimeProps) => {
	const inputProps = useMemo(() => {
		return {
			w: '100%',
			h: '100%',
			type: 'number',
			backgroundColor: theme.defaultColor,
			color: '#606c6e',
			outline: '0 solid transparent',
			border: '0 solid transparent',
			fontSize: '30px',
			borderRadius: '4px',
			letterSpacing: '-0.4px',
			min: 0,
			textAlign: 'center',
		} as InputProps
	}, [])
	return (
		<Grid
			textAlign='center'
			fontSize='30px'
			height='40px'
			width='130px'
			templateColumns='1fr 4px 1fr'
			gap={6}
			{...props}
		>
			<Input {...inputProps} max={99}></Input>
			<Box color={theme.defaultColor} w='100%' textAlign='center'>
				:
			</Box>
			<Input {...inputProps} max={59}></Input>
		</Grid>
	)
}
