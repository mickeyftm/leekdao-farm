const defaultState = {
    luckyDrawTx: "",
    error: "",
    addressTx: "",
}

const loadingState = {
    isLoading: false
}

export const GET_LUCKY_DRAW_TRANSACTION_HASH = 'GET_LUCKY_DRAW_TRANSACTION_HASH'
export const GET_ADDRESS_TRANSACTION_HASH = "GET_ADDRESS_TRANSACTION_HASH"
export const RESET_TO_DEFAULT_STATE = "RESET_TO_DEFAULT_STATE"
export const UPDATE_ERROR_MESSAGE = "UPDATE_ERROR_MESSAGE"
export const SET_LOADING_STATE_TRUE = "SET_LOADING_STATE_TRUE"
export const SET_LOADING_STATE_FALSE = "SET_LOADING_STATE_FALSE"

export const reducer = (state = defaultState, action) => {
    if (action.type === GET_LUCKY_DRAW_TRANSACTION_HASH) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.luckyDrawTx = action.luckyDrawTx
        newState.addressTx = ""
        newState.error = ""
        return newState
    }

    if (action.type === UPDATE_ERROR_MESSAGE) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.luckyDrawTx = ""
        newState.addressTx = ""
        newState.error = action.error
        return newState
    }

    if (action.type === GET_ADDRESS_TRANSACTION_HASH) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.luckyDrawTx = ""
        newState.addressTx = action.addressTx
        newState.error = action.error
        return newState
    }

    if (action.type === RESET_TO_DEFAULT_STATE) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.luckyDrawTx = ""
        newState.addressTx = ""
        newState.error = ""
        return newState
    }

    return state
}

export const loadingReducer = (state = loadingState, action) => {
    if (action.type === SET_LOADING_STATE_TRUE) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.isLoading = true
        return newState
    }

    if (action.type === SET_LOADING_STATE_FALSE) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.isLoading = false
        return newState
    }

    return state;
}

