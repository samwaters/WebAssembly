import * as React from "react"
import { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Card, CardActions, CardContent, Container, Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadedWASMAction, loadWASMAction, WASMStates } from "store/wasm.store";
import { getWASMState } from "selectors/wasm.selector";

export const Addition = () => {
	const dispatch = useDispatch()
	const wasmState = useSelector(getWASMState)
	const [isTiming, setIsTiming] = useState(false)
	const [num1, setNum1] = useState<number>(0)
	const [num2, setNum2] = useState<number>(0)
	const [nativeOperations, setNativeOperations] = useState<number>(0)
	const [nativeResult, setNativeResult] = useState<number>(0)
	const [nativeTime, setNativeTime] = useState<number>(0)
	const [wasmOperations, setWASMOperations] = useState<number>(0)
	const [wasmResult, setWASMResult] = useState<number>(0)
	const [wasmTime, setWASMTime] = useState<number>(0)

	useEffect(() => {
		if(wasmState.addition === WASMStates.LOADED) return
		dispatch(loadWASMAction("addition"))
		WebAssembly.instantiateStreaming(
			fetch("wasm/addition.wasm")
		).then(
			({ instance }) => {
				dispatch(loadedWASMAction("addition"))
				if(!window.wasm) window.wasm = {}
				window.wasm.nativeAddition = (num1: number, num2: number) => num1 + num2
				window.wasm.wasmAddition = instance.exports.addition
			}
		)
	}, [])

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, num: number) => {
		const newVal = parseInt(e.target.value)
		if(isNaN(newVal)) return
		num === 1 ? setNum1(newVal) : setNum2(newVal)
	}

	const performAddition = () => {
		const nativeStart = new Date().getTime()
		setNativeResult(window.wasm.nativeAddition(num1, num2))
		const nativeEnd = new Date().getTime()
		const wasmStart = new Date().getTime()
		setWASMResult(window.wasm.wasmAddition(num1, num2))
		const wasmEnd = new Date().getTime()
		setNativeTime(nativeEnd - nativeStart)
		setWASMTime(wasmEnd - wasmStart)
	}

	const performTiming = () => {
		setIsTiming(true)
		let nativeOperations = 0
		let wasmOperations = 0
		const nativeStart = new Date().getTime()
		while(true) {
			if(new Date().getTime() - nativeStart > 5000) break
			window.wasm.nativeAddition(1000000, 2000000)
			nativeOperations++
		}
		setNativeOperations(nativeOperations)
		const wasmStart = new Date().getTime()
		while(true) {
			if(new Date().getTime() - wasmStart > 5000) break
			window.wasm.nativeAddition(1000000, 2000000)
			wasmOperations++
		}
		setWASMOperations(wasmOperations)
		setIsTiming(false)
	}

	return <Container>
		<Typography variant="h4">Addition</Typography>
		<Card sx={{ marginBottom: "10px" }} variant="outlined">
			<CardContent>
				<Typography variant="h6" component="div">Test Call</Typography>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField fullWidth label="Number 1" onChange={(e) => handleChange(e, 1)} value={num1} variant="filled" />
					</Grid>
					<Grid item xs={6}>
						<TextField fullWidth label="Number 2" onChange={(e) => handleChange(e, 2)} value={num2} variant="filled" />
					</Grid>
				</Grid>
				<Box>
					<Typography variant="body1">Native result: {nativeResult} ({nativeTime} ms)</Typography>
					<Typography variant="body1">WASM result: {wasmResult} ({wasmTime} ms)</Typography>
				</Box>
			</CardContent>
			<CardActions>
				<Button onClick={performAddition}>Run</Button>
			</CardActions>
		</Card>
		<Card variant="outlined">
			<CardContent>
				<Typography variant="h6" component="div">Timed Operations</Typography>
				<Typography variant="body1">Press Start to check how many operations are done in 5 seconds</Typography>
				<Box>
					<Typography variant="body1">Native result: {isTiming ? "pending" : nativeOperations} operations</Typography>
					<Typography variant="body1">WASM result: {isTiming ? "pending" : wasmOperations} operations</Typography>
				</Box>
			</CardContent>
			<CardActions>
				<Button onClick={performTiming} disabled={isTiming}>Start</Button>
			</CardActions>
		</Card>
	</Container>
}