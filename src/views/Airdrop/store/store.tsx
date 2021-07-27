import { createStore } from 'redux'
import { reducer, airdropApproveReducer, vipAirdropApproveReducer, claimAirdropReducer } from './reducer'

export const store = createStore(reducer)
export const airdropApproveStore = createStore(airdropApproveReducer)
export const vipAirdropApproveStore = createStore(vipAirdropApproveReducer)
export const claimAirdropStore = createStore(claimAirdropReducer)

