import React from 'react'
import { Button, Modal } from 'leek-uikit'
import { AutoColumn } from '../General/Column'
import ErrorMessage from '../General/ErrorMessage'
import { airdropApproveStore } from "../store/store"

type TransactionSubmittedContentProps = {
    onDismiss: () => void
}

const ApproveErrorMessageModal = ({ onDismiss }: TransactionSubmittedContentProps) => {
    const { airdropApproveError } = airdropApproveStore.getState()

    return (
        <Modal title="Error Message" onDismiss={onDismiss}>
            <ErrorMessage errorMessage={airdropApproveError} />
            <AutoColumn gap="8px" justify="center">
                <Button onClick={onDismiss} mt="20px">
                    Close
                </Button>
            </AutoColumn>
        </Modal>
    )
}

export default ApproveErrorMessageModal