import React from 'react'
import { Button, Modal } from 'leek-uikit'
import { AutoColumn } from '../General/Column'
import ErrorMessage from '../General/ErrorMessage'
import { vipAirdropApproveStore } from "../store/store"

type TransactionSubmittedContentProps = {
    onDismiss: () => void
}

const VipApproveErrorMessageModal = ({ onDismiss }: TransactionSubmittedContentProps) => {
    const { vipAirdropApproveError } = vipAirdropApproveStore.getState()

    return (
        <Modal title="Error Message" onDismiss={onDismiss}>
            <ErrorMessage errorMessage={vipAirdropApproveError} />
            <AutoColumn gap="8px" justify="center">
                <Button onClick={onDismiss} mt="20px">
                    Close
                </Button>
            </AutoColumn>
        </Modal>
    )
}

export default VipApproveErrorMessageModal