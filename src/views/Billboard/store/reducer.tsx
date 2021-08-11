import cities from "config/constants/location"

const defaultState = {
    bidHash: '',
}

const billboardState = {
    cities,
    isMounted: false
}

export const GET_BID_BILLBOARD_HASH = 'GET_BID_BILLBOARD_HASH'
export const GET_BILLBOARD_DETAILS = 'GET_BILLBOARD_DETAILS'

export const reducer = (state = defaultState, action) => {
    if (action.type === GET_BID_BILLBOARD_HASH) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.bidHash = action.bidHash
        return newState
    }
    return state
}

export const billboardReducer = (state = billboardState, action) => {
    if (action.type === GET_BILLBOARD_DETAILS) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.cities = action.cities
        newState.isMounted = true;
        return newState
    }
    return state
}