import cities from "config/constants/location"

const defaultState = {
    bidHash: '',
}

const billboardState = {
    cities
}

const formState = {
    show: false
}

export const GET_BID_BILLBOARD_HASH = 'GET_BID_BILLBOARD_HASH'
export const GET_BILLBOARD_DETAILS = 'GET_BILLBOARD_DETAILS'
export const SHOW_FORM = 'SHOW_FORM'
export const HIDE_FORM = 'HIDE_FORM'

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
        return newState
    }
    return state
}

export const bidReducer = (state = formState, action) => {
    if (action.type === SHOW_FORM) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.show = true
        return newState
    }

    if (action.type === HIDE_FORM) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.show = false
        return newState
    }

    return state
}