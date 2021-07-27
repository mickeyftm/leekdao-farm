import React from 'react'
import { Button, Modal } from 'leek-uikit'
import { AutoColumn } from '../General/Column'
import TransactionMessage from '../General/TransactionMessage'
import { store } from "../../store/store"

type TransactionSubmittedContentProps = {
    onDismiss: () => void
}

const ApproveTransactionModal = ({ onDismiss }: TransactionSubmittedContentProps) => {
    const { addressTx } = store.getState();

    return (
        <Modal title="Transaction Submitted" onDismiss={onDismiss}>
            <TransactionMessage transactionHash={addressTx} />
            <AutoColumn gap="8px" justify="center">
                <Button onClick={onDismiss} mt="20px">
                    Close
                </Button>
            </AutoColumn>
        </Modal>
    )
}

export default ApproveTransactionModal