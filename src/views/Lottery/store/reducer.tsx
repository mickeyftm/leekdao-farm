const defaultState = {
    luckyDrawTx: "",
    error: "",
    addressTx: "",
}
export const GET_LUCKY_DRAW_TRANSACTION_HASH = 'GET_LUCKY_DRAW_TRANSACTION_HASH'
export const GET_ADDRESS_TRANSACTION_HASH = "GET_ADDRESS_TRANSACTION_HASH"
export const RESET_TO_DEFAULT_STATE = "RESET_TO_DEFAULT_STATE"

export const reducer = (state = defaultState, action) => {
    if (action.type === GET_LUCKY_DRAW_TRANSACTION_HASH) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.luckyDrawTx = action.luckyDrawTx
        newState.addressTx = ""
        newState.error = ""
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
