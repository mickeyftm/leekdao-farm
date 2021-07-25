const defaultState = {
    formData: {},
}

export const GET_FORM_DATA = 'GET_FORM_DATA'

export const reducer = (state = defaultState, action) => {
    if (action.type === GET_FORM_DATA) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.formData = action.formData
        return newState
    }
    return state
}