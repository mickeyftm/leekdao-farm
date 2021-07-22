import { createStore } from 'redux'
import { reducer, loadingReducer } from './reducer'

export const store = createStore(reducer)
export const loadingStore = createStore(loadingReducer)