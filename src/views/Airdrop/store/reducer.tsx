const defaultState = {
    formData: {},
}

const airdropApproveState = {
    airdropApproveTxHash: "",
    airdropApproveError: ""
}

const vipAirdropApproveState = {
    vipAirdropApproveTxHash: "",
    vipAirdropApproveError: ""
}

const airdropState = {
    claimAirdropTxHash: ""
}

export const POST_FORM_DATA = 'POST_FORM_DATA'
export const APPROVE_AIRDROP = "APPROVE_AIRDROP"
export const APPROVE_VIP_AIRDROP = "APPROVE_VIP_AIRDROP"
export const CLAIM_AIRDROP = "CLAIM_AIRDROP"
export const UPDATE_ERROR_MESSAGE = "UPDATE_ERROR_MESSAGE"
export const RESET_TO_DEFAULT_STATE = "RESET_TO_DEFAULT_STATE"

export const reducer = (state = defaultState, action) => {
    if (action.type === POST_FORM_DATA) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.formData = action.formData
        return newState
    }
    return state
}

export const airdropApproveReducer = (state = airdropApproveState, action) => {
    if (action.type === APPROVE_AIRDROP) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.airdropApproveTxHash = action.airdropApproveTxHash
        newState.airdropApproveError = ""
        return newState
    }

    if (action.type === UPDATE_ERROR_MESSAGE) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.airdropApproveTxHash = ""
        newState.airdropApproveError = action.airdropApproveError
        return newState
    }

    if (action.type === RESET_TO_DEFAULT_STATE) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.airdropApproveTxHash = ""
        newState.airdropApproveError = ""
        return newState
    }

    return state
}


export const vipAirdropApproveReducer = (state = vipAirdropApproveState, action) => {
    if (action.type === APPROVE_VIP_AIRDROP) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.vipAirdropApproveTxHash = action.vipAirdropApproveTxHash
        newState.vipAirdropApproveError = ""
        return newState
    }

    if (action.type === UPDATE_ERROR_MESSAGE) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.vipAirdropApproveTxHash = ""
        newState.vipAirdropApproveError = action.vipAirdropApproveError
        return newState
    }

    if (action.type === RESET_TO_DEFAULT_STATE) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.vipAirdropApproveTxHash = ""
        newState.vipAirdropApproveError = ""
        return newState
    }

    return state
}

export const claimAirdropReducer = (state = airdropState, action) => {
    if (action.type === CLAIM_AIRDROP) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.claimAirdropTxHash = action.claimAirdropTxHash
        return newState
    }

    if (action.type === RESET_TO_DEFAULT_STATE) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.claimAirdropTxHash = ""
        return newState
    }

    return state
}