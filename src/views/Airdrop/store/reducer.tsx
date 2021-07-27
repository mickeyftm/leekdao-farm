const defaultState = {
    formData: {},
}

export const POST_FORM_DATA = 'POST_FORM_DATA'

export const reducer = (state = defaultState, action) => {
    if (action.type === POST_FORM_DATA) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.formData = action.formData
        return newState
    }
    return state
}