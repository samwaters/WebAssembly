import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum WASMStates {
	NOT_LOADED = "not_loaded",
	LOADING = "loading",
	LOADED = "loaded"
}

export interface WASMState {
	addition: WASMStates
	prime: WASMStates
}

const initialState: WASMState = {
	addition: WASMStates.NOT_LOADED,
	prime: WASMStates.NOT_LOADED
}

const wasmSlice = createSlice({
	initialState,
	name: 'wasm',
	reducers: {
		load: (state, action: PayloadAction<string>) => {
			state[action.payload] = WASMStates.LOADING
		},
		loaded: (state, action: PayloadAction<string>) => {
			state[action.payload] = WASMStates.LOADED
		},
	}
})

export const loadWASMAction = createAction<string>("wasm/load")
export const loadedWASMAction = createAction<string>("wasm/loaded")
export const { load, loaded } = wasmSlice.actions
export default wasmSlice.reducer
