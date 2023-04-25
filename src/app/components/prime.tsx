import * as React from "react"
import { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Card, CardActions, CardContent, Container, Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadedWASMAction, loadWASMAction, WASMStates } from "store/wasm.store";
import { getWASMState } from "selectors/wasm.selector";

export const Prime = () => {
  const dispatch = useDispatch()
  const wasmState = useSelector(getWASMState)
  const [isTiming, setIsTiming] = useState(false)
  const [num, setNum] = useState<number>(0)
  const [nativeOperations, setNativeOperations] = useState<number>(0)
  const [nativeResult, setNativeResult] = useState<number>(0)
  const [nativeTime, setNativeTime] = useState<number>(0)
  const [wasmOperations, setWASMOperations] = useState<number>(0)
  const [wasmResult, setWASMResult] = useState<number>(0)
  const [wasmTime, setWASMTime] = useState<number>(0)

  useEffect(() => {
    if(wasmState.addition === WASMStates.LOADED) return
    dispatch(loadWASMAction("prime"))
    WebAssembly.instantiateStreaming(
      fetch("wasm/prime.wasm")
    ).then(
      ({ instance }) => {
        dispatch(loadedWASMAction("prime"))
        if(!window.wasm) window.wasm = {}
        window.wasm.nativePrime = (num: number) => {
          const root = Math.sqrt(num)
          for(let i=2; i<root; i++) {
            if(num % i === 0) return 0
          }
          return 1
        }
        window.wasm.wasmPrime = instance.exports.isPrime
      }
    )
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newVal = parseInt(e.target.value)
    if(isNaN(newVal)) return
    setNum(newVal)
  }

  const performPrime = () => {
    const nativeStart = new Date().getTime()
    setNativeResult(window.wasm.nativePrime(num))
    const nativeEnd = new Date().getTime()
    const wasmStart = new Date().getTime()
    setWASMResult(window.wasm.wasmPrime(num))
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
      window.wasm.nativePrime(123456789)
      nativeOperations++
    }
    setNativeOperations(nativeOperations)
    const wasmStart = new Date().getTime()
    while(true) {
      if(new Date().getTime() - wasmStart > 5000) break
      window.wasm.wasmPrime(123456789)
      wasmOperations++
    }
    setWASMOperations(wasmOperations)
    setIsTiming(false)
  }

  return <Container>
    <Typography variant="h4">Prime</Typography>
    <Card sx={{ marginBottom: "10px" }} variant="outlined">
      <CardContent>
        <Typography variant="h6" component="div">Test Call</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Number" onChange={(e) => handleChange(e)} value={num} variant="filled" />
          </Grid>
        </Grid>
        <Box>
          <Typography variant="body1">Native result: {nativeResult} ({nativeTime} ms)</Typography>
          <Typography variant="body1">WASM result: {wasmResult} ({wasmTime} ms)</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button onClick={performPrime}>Run</Button>
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