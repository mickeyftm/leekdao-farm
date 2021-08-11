import { createStore } from 'redux'
import { reducer, billboardReducer } from './reducer'

export const store = createStore(reducer)
export const billboardStore = createStore(billboardReducer)

