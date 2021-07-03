const defaultState = {
    hash: "Michael"
}

export const GET_TRANSACTION_HASH = "GET_TRANSACTION_HASH"

export const reducer = (state = defaultState, action) => {
    if (action.type === GET_TRANSACTION_HASH) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.hash = action.hash;
        return newState;
    }
    return state;
}