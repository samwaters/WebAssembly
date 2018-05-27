import * as React from 'react'
import {ChangeEvent} from 'react'

import {Button} from 'components/ui/button'
import {WASMLoader} from '../utils/wasmLoader'

interface PrimeState {
  jsPrime: boolean
  jsTime: number
  number: number
  wasmPrime: boolean
  wasmTime: number
}

interface Win extends Window {
  Module?: any
}

class Prime extends React.Component<{}, PrimeState> {
  public state = {
    jsPrime: false,
    jsTime: 0,
    number: 0,
    wasmPrime: false,
    wasmTime: 0,
  }
  private win: Win = window

  public componentDidMount() {
    new WASMLoader().loadWASM('prime')
  }

  public render() {
    return <div>
      <p>JS time: {this.state.jsTime} ms</p>
      <p>WASM time: {this.state.wasmTime} ms</p>
      <p>Prime: {this.state.jsPrime && this.state.wasmPrime ? 'Yes' : 'No'}</p>
      <input
        onChange={(evt: ChangeEvent<HTMLInputElement>) => this.handleChange(evt)}
        type='text'
        value={this.state.number}
      />
      <Button onClick={() => this.checkPrime()}>Check Primeness</Button>
    </div>
  }

  private checkPrimeJS() {
    const root = Math.sqrt(this.state.number)
    for(let i = 2; i < root; i++) {
      if(this.state.number % i === 0) {
        return false
      }
    }
    return true
  }

  private checkPrimeWASM() {
    return this.win.Module ? this.win.Module._isPrime(this.state.number) : false
  }

  private checkPrime() {
    const wasmStartTime = new Date().getTime()
    const wasmIsPrime = this.checkPrimeWASM()
    const wasmEndTime = new Date().getTime()
    const jsStartTime = new Date().getTime()
    const jsIsPrime = this.checkPrimeJS()
    const jsEndTime = new Date().getTime()
    this.setState({
      jsPrime: jsIsPrime,
      jsTime: jsEndTime - jsStartTime,
      wasmPrime: wasmIsPrime,
      wasmTime: wasmEndTime - wasmStartTime,
    })
  }

  private handleChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({number: parseInt(e.target.value, 10) || 0})
  }
}

export {Prime}
