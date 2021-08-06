import { createStore } from 'redux'
import { reducer, billboardReducer, bidReducer } from './reducer'

export const store = createStore(reducer)
export const billboardStore = createStore(billboardReducer)
export const bidStore = createStore(bidReducer)

